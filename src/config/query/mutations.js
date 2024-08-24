"use client";
import { useMutation } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import { IncreaseStake, ReduceStake, Unstake } from "@/actions";
import { parseEther } from "viem";
import { queryClient } from "../context";

export function useIncreaseStakeMutation(onClose) {
	const { address, chainId } = useAccount();
	return useMutation({
		mutationKey: ['increaseStake', address, chainId],
		mutationFn: async (amount) => {
			await IncreaseStake(parseEther(amount))
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['staticState', chainId]
			})
			queryClient.invalidateQueries({
				queryKey: ['userDetails', address, chainId]
			})
			if (typeof onClose === 'function') {
				onClose();
			}
		}
	});

}

export function useReduceStakeMutation(onClose) {
	const { address, chainId } = useAccount();
	return useMutation({
		mutationKey: ['reduceStake', address, chainId],
		mutationFn: async (amount) => {
			await ReduceStake(parseEther(amount))
		},
		onSuccess: async () => {
			queryClient.invalidateQueries({
				queryKey: ['staticState', chainId]
			})
			queryClient.invalidateQueries({
				queryKey: ['userDetails', address, chainId]
			})
			if (typeof onClose === 'function') {
				onClose();
			}
		}
	});

}

export function useUnstakeMutation(onClose) {
	const { address, chainId } = useAccount();
	return useMutation({
		mutationKey: ['unstake', address, chainId],
		mutationFn: async () => { await Unstake() },
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['userDetails', address, chainId]
			})
			if (typeof onClose === 'function') {
				onClose();
			}
		}
	});

}

