"use client";
import { getAccount, readContract, writeContract, getTransactionReceipt, simulateContract } from "@wagmi/core";
import { config } from "@/config/wagmi";
import { getWindfallAddress } from "@/config/const";
import Error from "next/error";
import { WINDFALL_ABI } from "@/config/abi";

export async function Unstake() {
	const { address, chainId } = getAccount(config);
	const windfallAddress = getWindfallAddress(chainId);
	const response = await readContract(config, {
		abi: WINDFALL_ABI,
		address: windfallAddress,
		chainId: chainId,
		functionName: 'getUserDetails',
		args: [address],
	});

	if (address === undefined || chainId === undefined) {
		throw new Error("Undefined Address of ChainId");
	}
	if (response[1] == BigInt(0)) {
		throw new Error("No tokens to unstake");
	}
	try {
		const hash = await writeContract(config, {
			abi: WINDFALL_ABI,
			address: windfallAddress,
			chainId: 7700,
			functionName: 'unstake',
			account: address,
		});
		const receipt = await getTransactionReceipt(config, { hash });
		return receipt;
	} catch (err) {
		return err;
	}
}


