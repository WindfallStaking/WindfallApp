import { readContract } from "@wagmi/core";
import { WINDFALL_ABI } from "@/config/abi";
import { serverConfig } from "@/config/wagmi";
import { formatUnits } from "viem";
import { getWindfallAddress } from "@/config/const";

export const getUserDetails = async (address, chainId) => {
	if (address !== undefined && chainId !== undefined) {
		try {
			const response = await readContract(serverConfig, {
				abi: WINDFALL_ABI,
				address: getWindfallAddress(chainId),
				chainId: chainId,
				functionName: 'getUserDetails',
				args: [address],
			});
			const userId = Number(formatUnits(response[0], 0));
			const value = response[1];
			const availableUnstake = response[2];
			const totalUnstake = response[3];

			return { userId, value, availableUnstake, totalUnstake };
		} catch {
			return { userId: 0, value: 0, availableUnstake: 0, totalUnstake: 0 };
		}
	}
	return undefined;

	///@return details UserId, Account Value, Available Unstake, Total Unstake
}
// "use client";
// import { getAccount, readContract } from "@wagmi/core";
// import { WINDFALL_ABI } from "@/config/abi";
// import { config } from "@/config/wagmi";
// import { formatUnits } from "viem";
// import { getWindfallAddress } from "@/config/const";
//
// export const getUserDetails = async () => {
// 	const { address, chainId } = getAccount(config);
// 	if (address !== undefined && chainId !== undefined) {
// 		try {
// 			const response = await readContract(config, {
// 				abi: WINDFALL_ABI,
// 				address: getWindfallAddress(chainId),
// 				chainId: chainId,
// 				functionName: 'getUserDetails',
// 				args: [address],
// 			});
// 			const userId = Number(formatUnits(response[0], 0));
// 			const value = response[1];
// 			const availableUnstake = response[2];
// 			const totalUnstake = response[3];
//
// 			return { userId, value, availableUnstake, totalUnstake };
// 		} catch {
// 			return { userId: 0, value: 0, availableUnstake: 0, totalUnstake: 0 };
// 		}
// 	}
// 	return undefined;
//
// 	///@return details UserId, Account Value, Available Unstake, Total Unstake
// }
