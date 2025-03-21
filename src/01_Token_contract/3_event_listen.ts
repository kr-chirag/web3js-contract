import Web3 from "web3";
import CSTokenABI from "./CSTOkenABI.json";
import { ACCOUNTS, RPC_INFURA_SEPOLIA } from "../config";

const contractAdress = "0x985102151bFa4b49FcEb489A09893b019d699d22";
const web3 = new Web3(RPC_INFURA_SEPOLIA);

const cstContract = new web3.eth.Contract(CSTokenABI as any, contractAdress);
const wallet = web3.eth.wallet;

// adding accounts to wallet
const account1 = web3.eth.accounts.privateKeyToAccount(ACCOUNTS[0].privateKey);
wallet?.add(account1);

// transfer tokens & listen to events
cstContract.methods
    .transfer(ACCOUNTS[1].address, 10e18)
    .send({
        from: ACCOUNTS[0].address,
    })
    .on("sending", (tx) => {
        console.log("sending", tx);
    })
    .on("sent", (tx) => {
        console.log("sent", tx);
    })
    .on("receipt", (receipt) => {
        console.log("receipt", receipt);
    })
    .on("confirmation", (res) => {
        console.log("confirmation", res);
    })
    .on("transactionHash", (hash) => {
        console.log("transactionHash", hash);
    })
    .on("error", console.log);
