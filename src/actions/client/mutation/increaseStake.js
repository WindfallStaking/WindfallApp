"use client";
import { getAccount, readContract, writeContract, getTransactionReceipt, simulateContract } from "@wagmi/core";
import { config } from "@/config/wagmi";
import { erc20Abi } from "viem";
import { getDepositAddress, getWindfallAddress } from "@/config/const";
import Error from "next/error";
import { WINDFALL_ABI } from "@/config/abi";

export async function IncreaseStake(amount) {
	const { address, chainId } = getAccount(config);
	const windfallAddress = getWindfallAddress(chainId);
	const depositAddress = getDepositAddress(chainId);
	await checkIncreaseAllowance(amount, address, chainId, depositAddress, windfallAddress);
	if (address === undefined || chainId === undefined) {
		throw new Error("Undefined Address of ChainId");
	}
	try {
		const { request } = await simulateContract(config, {
			abi: WINDFALL_ABI,
			address: windfallAddress,
			chainId: 7700,
			functionName: 'increaseStake',
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

async function checkIncreaseAllowance(amount, address, chainId, depositAddress, windfallAddress) {
	const allowance = await readContract(config, {
		abi: erc20Abi,
		address: depositAddress,
		functionName: 'allowance',
		args: [address, windfallAddress],
	});

	if (address === undefined || chainId === undefined) {
		throw new Error("Undefined Address or ChainId");
	}
	const requestAmount = amount > allowance ? amount - allowance : 0;
	if (requestAmount != 0) {
		try {
			const response = await simulateContract(config, {
				abi: erc20Abi,
				address: depositAddress,
				chainId: 7700,
				functionName: 'approve',
				args: [windfallAddress, requestAmount],
				account: address,
			});
			const hash = await writeContract(config, response.request);
			const receipt = await getTransactionReceipt(config, hash);
			return;
		} catch (err) {
			return err;
		}
	}
	return;
}











//
//
// export const increaseStake = async (amount: bigint) => {
// 	const { address, chainId } = getAccount(config);
// 	if (address === undefined || chainId === undefined) {
// 		throw new UndefinedAddressOrChainIdError("Undefined Address or ChainId");
// 	}
// 	try {
// 		const hash = await writeContract(config, {
// 			abi: WINDFALL_ABI,
// 			address: getWindfallAddress(),
// 			chainId: chainId as 7700,
// 			functionName: 'increaseStake',
// 			args: [amount],
// 			account: address,
// 		});
// 		const receipt = await getTransactionReceipt(config, { hash });
// 		return receipt;
// 	} catch (err) {
// 		return err;
// 	}
//
// }
//
// export const reduceStake = async (amount: bigint) => {
// 	const { address, chainId } = getAccount(config);
// 	const { data } = useQuery({
// 		queryKey: ['userDetails', address],
// 		queryFn: getUserDetails,
// 	});
//
// 	if (data === undefined) {
// 		return;
// 	}
//
// 	if (data['value'] > amount) {
// 		try {
// 			const hash = await writeContract(config, {
// 				abi: WINDFALL_ABI,
// 				address: getWindfallAddress(),
// 				chainId: 7700,
// 				functionName: 'reduceStake',
// 				args: [amount],
// 				account: address,
// 			});
// 		} catch {
// 			return;
// 		}
// 	}
// }
//
// export const unstake = async () => {
// 	const { address, chainId } = getAccount(config);
// 	const { data } = useQuery({
// 		queryKey: ['userDetails', address],
// 		queryFn: getUserDetails,
// 	});
//
// 	if (data === undefined) {
// 		return;
// 	}
//
// 	if (data.availablePending > BigInt(0)) {
// 		try {
// 			const hash = await writeContract(config, {
// 				abi: WINDFALL_ABI,
// 				address: getWindfallAddress(),
// 				chainId: 7700,
// 				functionName: 'unstake',
// 				account: address,
// 			});
// 		} catch {
// 			return;
// 		}
// 	}
// }
//
