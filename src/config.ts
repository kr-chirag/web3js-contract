import dotEnv from "dotenv";
dotEnv.config();

export const ACCOUNTS = [
    {
        address: Buffer.from(`${process.env.ACCOUNT1}`, "hex"),
        privateKey: `${process.env.PRIVATE_KEY1}`,
    },
    {
        address: Buffer.from(`${process.env.ACCOUNT2}`, "hex"),
        privateKey: `${process.env.PRIVATE_KEY2}`,
    },
];

export const RPC_INFURA_SEPOLIA = `${process.env.RPC_INFURA_SEPOLIA}`;
export const INFURA_KEY = `${process.env.INFURA_KEY}`;
