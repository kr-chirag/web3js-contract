import Web3 from "web3";
import CSTokenABI from "./CSTOkenABI.json";
import { ACCOUNTS, RPC_INFURA_SEPOLIA } from "../config";

async function main() {
    const contractAdress = "0x985102151bFa4b49FcEb489A09893b019d699d22";
    const web3 = new Web3(RPC_INFURA_SEPOLIA);

    const cstContract = new web3.eth.Contract(
        CSTokenABI as any,
        contractAdress
    );
    const wallet = web3.eth.wallet;

    // adding accounts to wallet
    const account1 = web3.eth.accounts.privateKeyToAccount(
        ACCOUNTS[0].privateKey
    );
    const account2 = web3.eth.accounts.privateKeyToAccount(
        ACCOUNTS[1].privateKey
    );
    wallet?.add(account1);
    wallet?.add(account2);

    // getting name & balance
    console.log("name:", await cstContract.methods.name().call());
    console.log(
        "balance:",
        await cstContract.methods.balanceOf(ACCOUNTS[0].address).call()
    );

    // encoding & decoding ABI
    const encodedMethod = cstContract.methods
        .transfer(ACCOUNTS[1].address, 10e18)
        .encodeABI();
    console.log("encoded:", encodedMethod);
    console.log("dencoded:", cstContract.decodeMethodData(encodedMethod));

    // estimate gas price
    const eGas = await cstContract.methods
        .transfer(ACCOUNTS[1].address, 10e18)
        .estimateGas({
            from: ACCOUNTS[0].address,
        });
    console.log("estimated gas", eGas);

    // transfer tokens
    const result = await cstContract.methods
        .transfer(ACCOUNTS[1].address, 10e18)
        .send({
            from: ACCOUNTS[0].address,
        });
    console.log(result);

    // approve method
    const aprRes = await cstContract.methods
        .approve(ACCOUNTS[1].address, 100e18)
        .send({
            from: ACCOUNTS[0].address,
        });
    console.log(aprRes);

    // transfer from
    const trfRes = await cstContract.methods
        .transferFrom(
            ACCOUNTS[0].address,
            "0x58a70795F6dfdB1c87db819C7D2d2Ca4D8798e56",
            10e18
        )
        .send({ from: ACCOUNTS[1].address });
    console.log(trfRes);
}

main().catch((e: any) => {
    console.log(e);
});
