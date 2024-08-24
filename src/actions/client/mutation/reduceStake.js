"use client";
import { getAccount, readContract, writeContract, getTransactionReceipt, simulateContract } from "@wagmi/core";
import { config } from "@/config/wagmi";
import { getWindfallAddress } from "@/config/const";
import Error from "next/error";
import { WINDFALL_ABI } from "@/config/abi";

export async function ReduceStake(amount) {
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
	if (response[1] < amount) {
		throw new Error("Amount exceeds staked amount");
	}
	try {
		const { request } = await simulateContract(config, {
			abi: WINDFALL_ABI,
			address: windfallAddress,
			chainId: chainId,
			functionName: 'reduceStake',
			args: [amount],
			account: address,
		});
		const hash = await writeContract(config, request);
		const receipt = await getTransactionReceipt(config, { hash });
		return receipt;
	} catch (err) {
		return err;
	}
}

