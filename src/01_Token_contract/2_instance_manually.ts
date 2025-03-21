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

    // getting balance
    console.log(
        "balance:",
        await cstContract.methods.balanceOf(ACCOUNTS[0].address).call()
    );

    // encoding
    const encodedMethod = cstContract.methods
        .transfer(ACCOUNTS[1].address, 10e18)
        .encodeABI();
    console.log("encoded:", encodedMethod);

    // estimate gas price
    const eGas = await cstContract.methods
        .transfer(ACCOUNTS[1].address, 10e18)
        .estimateGas({
            from: ACCOUNTS[0].address,
        });
    console.log("estimated gas", eGas);

    const gasPrice = await web3.eth.getGasPrice();
    console.log("gas price", gasPrice);

    console.log(
        "transaction cost in ether:",
        web3.utils.fromWei(eGas * gasPrice, "ether")
    );

    const txObj = {
        from: ACCOUNTS[0].address,
        to: contractAdress,
        gasLimit: eGas,
        gasPrice: await web3.eth.getGasPrice(),
        data: encodedMethod,
    };

    const signedTx = await web3.eth.accounts.signTransaction(
        txObj,
        ACCOUNTS[0].privateKey
    );

    const result = await web3.eth.sendSignedTransaction(
        signedTx.rawTransaction
    );
    console.log(result);
}

main().catch((e: any) => {
    console.log(e);
});
