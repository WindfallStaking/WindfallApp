import { readContract } from "@wagmi/core";
import { WINDFALL_ABI } from "@/config/abi";
import { serverConfig } from "@/config/wagmi";
import { formatUnits } from "viem";
import { getWindfallAddress } from "@/config/const";
import { contractStateFallback } from "../client/query/contractStateFallback";

export const getContractState = async (chainId) => {
	try {
		const response = await readContract(serverConfig, {
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
		console.log("Contract State Error: ", err);
		console.log("Chain ID: ", chainId);
		return contractStateFallback(chainId);
	}

}
