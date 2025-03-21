import dotEnv from "dotenv";
dotEnv.config();

export const ACCOUNTS = [
    {
        address: `${process.env.ACCOUNT1}`,
        privateKey: Buffer.from(`${process.env.PRIVATE_KEY1}`, "hex"),
    },
    {
        address: `${process.env.ACCOUNT2}`,
        privateKey: Buffer.from(`${process.env.PRIVATE_KEY2}`, "hex"),
    },
];

export const RPC_INFURA_SEPOLIA = `${process.env.RPC_INFURA_SEPOLIA}`;
export const INFURA_KEY = `${process.env.INFURA_KEY}`;
