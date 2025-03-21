import Web3 from "web3";
import { ACCOUNTS, RPC_INFURA_SEPOLIA } from "../config";

async function main() {
    const contractAdress = "0x985102151bFa4b49FcEb489A09893b019d699d22";
    const web3 = new Web3(RPC_INFURA_SEPOLIA);

    // adding accounts to wallet
    const account1 = web3.eth.accounts.privateKeyToAccount(
        ACCOUNTS[0].privateKey
    );
    web3.eth.wallet?.add(account1);

    // encoding function
    const encodedMethod = web3.eth.abi.encodeFunctionSignature(
        "transfer(address,uint256)"
    );
    console.log("encoded:", encodedMethod);

    // encoding params
    const encodedParams = web3.eth.abi.encodeParameters(
        ["address", "uint256"],
        [ACCOUNTS[1].address, 10e18]
    );
    console.log(encodedParams);

    // encoded data
    const encodedData = encodedMethod + encodedParams.slice(2);

    const txObj = {
        from: ACCOUNTS[0].address,
        to: contractAdress,
        gasPrice: await web3.eth.getGasPrice(),
        data: encodedData,
    };

    const result = await web3.eth.sendTransaction(txObj);
    console.log(result);
}

main().catch((e: any) => {
    console.log(e);
});
