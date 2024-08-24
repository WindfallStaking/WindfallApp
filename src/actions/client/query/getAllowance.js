"use client";
import { getAccount, readContract } from "@wagmi/core";
import { config } from "@/config/wagmi";
import { erc20Abi, formatUnits } from "viem";
import { getDepositAddress, getWindfallAddress } from "@/config/const";

export const getAllowance = async () => {
	const { address, chainId } = getAccount(config);
	if (address !== undefined && chainId !== undefined) {
		try {
			const response = await readContract(config, {
				abi: erc20Abi,
				address: getDepositAddress(chainId),
				functionName: 'allowance',
				args: [address, getWindfallAddress(chainId)],
			});
			return response;
		} catch {
			return 0;
		}
	}
	return undefined;

}
