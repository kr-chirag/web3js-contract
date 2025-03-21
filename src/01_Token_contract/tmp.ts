import Web3 from "web3";
import { RPC_INFURA_SEPOLIA } from "../config";

const web3 = new Web3(RPC_INFURA_SEPOLIA);

const signature = web3.eth.abi.encodeFunctionSignature({
    name: "myMethod",
    type: "function",
    inputs: [
        {
            type: "uint256",
            name: "myNumber",
        },
        {
            type: "string",
            name: "myString",
        },
    ],
});

console.log(signature);
