import { readContract } from "@wagmi/core";
import { serverConfig } from "@/config/wagmi";
import { erc20Abi, formatUnits } from "viem";
import { getDepositAddress } from "@/config/const";

export const getDepositBalance = async (address, chainId) => {
	if (address === undefined || chainId === undefined) {
		return null;
	}
	try {
		const response = await readContract(serverConfig, {
			abi: erc20Abi,
			address: getDepositAddress(chainId),
			functionName: 'balanceOf',
			args: [address],
		});
		const depositAmount = Number(formatUnits(response, 18));
		return depositAmount;
	} catch {
		return 0;
	}

}

// "use client";
// import { readContract } from "@wagmi/core";
// import { config } from "@/config/wagmi";
// import { erc20Abi, formatUnits } from "viem";
// import { getDepositAddress } from "@/config/const";
//
// export const getDepositBalance = async (address, chainId) => {
// 	if (address === undefined || chainId === undefined) {
// 		return undefined;
// 	}
// 	try {
// 		const response = await readContract(config, {
// 			abi: erc20Abi,
// 			address: getDepositAddress(chainId),
// 			functionName: 'balanceOf',
// 			args: [address],
// 		});
// 		const depositAmount = Number(formatUnits(response, 18));
// 		return depositAmount;
// 	} catch {
// 		return 0;
// 	}
//
//
// }
//
