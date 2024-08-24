"use client";
import { readContract } from "@wagmi/core";
import { WINDFALL_ABI } from "@/config/abi";
import { config } from "@/config/wagmi";
import { formatUnits } from "viem";
import { getWindfallAddress } from "@/config/const";

export const contractStateFallback = async (chainId) => {
	try {
		const response = await readContract(config, {
			abi: WINDFALL_ABI,
			address: getWindfallAddress(chainId),
			chainId: chainId,
			functionName: 'getState',
		});

		const totalStaked = response[0];
		const rewardJackpot = response[1];
		const nextDrawTimestamp = Number(formatUnits(response[2], 0));
		const minimumStake = response[3];
		return { totalStaked, rewardJackpot, nextDrawTimestamp, minimumStake };
	} catch (err) {
		console.log("Fallback Failed", err);
		return { totalStaked: 0, rewardJackpot: 0, nextDrawTimestamp: 0, minimumStake: 0 };
	}

}

