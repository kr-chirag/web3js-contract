import Web3 from "web3";
import { RPC_INFURA_SEPOLIA } from "../config";

async function main() {
    const web3 = new Web3(RPC_INFURA_SEPOLIA);
    let txHash =
        "0x1475136c5d8433c46167daf63620b1dcbf3726d83d10151ebde10cbd98e013a6";
    // "0x67e4f9eea0eafa6c774eea0ba95c54e8c294d4a097654c92c482d07207afc877";

    let txReceipt = await web3.eth.getTransactionReceipt(txHash);
    // console.log(txReceipt);
    console.log("data:", txReceipt.logs[0].data);
    console.log("topics:", txReceipt.logs[0].topics);
}

main().catch((e: any) => {
    console.log(e);
});
