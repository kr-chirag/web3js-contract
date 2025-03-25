import Web3 from "web3";
import { ACCOUNTS, RPC_INFURA_SEPOLIA } from "../config";

let encodedMethod: string;
let encodedParam: string;
let encodedParams: string;
let encodedData: string;

const web3 = new Web3(RPC_INFURA_SEPOLIA);

// adding accounts to wallet
const account1 = web3.eth.accounts.privateKeyToAccount(ACCOUNTS[0].privateKey);
web3.eth.wallet?.add(account1);

const FUNCTION_ABI = {
    name: "transfer",
    type: "function",
    inputs: [
        {
            type: "address",
            name: "to",
        },
        {
            type: "uint256",
            name: "value",
        },
    ],
};

async function encode() {
    // encoding function signature using abi
    encodedMethod = web3.eth.abi.encodeFunctionSignature(FUNCTION_ABI);
    console.log("encoded method signature:", encodedMethod);

    // encoding function signature
    encodedMethod = web3.eth.abi.encodeFunctionSignature(
        "transfer(address,uint256)"
    );
    // console.log("encoded method signature:", encodedMethod);

    encodedParam = web3.eth.abi.encodeParameter("uint256", 1000);
    console.log("encoded param:", encodedParam);

    encodedParams = web3.eth.abi.encodeParameters(
        ["address", "uint256"],
        ["0x6ee7b2cFdDcA903A049Cc445E8ac1388E58f5220", "10000000000000000"]
    );
    console.log("encoded params:", encodedParams);

    encodedData = encodedMethod + encodedParams.slice(2);
    console.log("encoded data:", encodedData);

    encodedData = web3.eth.abi.encodeFunctionCall(FUNCTION_ABI, [
        "0x6ee7b2cFdDcA903A049Cc445E8ac1388E58f5220",
        "10000000000000000",
    ]);
    // console.log("encoded data2:", encodedData2);
}

async function decode() {
    let decodedParam = web3.eth.abi.decodeParameter("uint256", encodedParam);
    console.log("decodedParam:", decodedParam);

    let decodedParams = web3.eth.abi.decodeParameters(
        ["address", "uint256"],
        encodedParams
    );
    console.log("decodedParams:", decodedParams);
}

async function main() {
    await encode();
    await decode();
}

main().catch((e: any) => {
    console.log(e);
});
