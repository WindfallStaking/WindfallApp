"use client";
import { useQuery } from "@tanstack/react-query";
import { getContractState, getDepositBalance, getUserDetails, getPastWinners } from "@/actions";
import { isSupportedChainId } from "../const";

export function useContractState(chainId) {
	const supportedChainId = isSupportedChainId(chainId) ? chainId : 7700;
	return useQuery({
		queryKey: ['staticState', supportedChainId],
		queryFn: () => getContractState(supportedChainId),
	});
}
export function usePastWinners(chainId) {
	const supportedChainId = isSupportedChainId(chainId) ? chainId : 7700;
	return useQuery({
		queryKey: ['pastWinners', supportedChainId],
		queryFn: () => getPastWinners(supportedChainId),
	});
}

export function useUserDetails(address, chainId) {
	return useQuery({
		queryKey: ['userDetails', address, chainId],
		queryFn: () => getUserDetails(address, chainId),
		enabled: !!address
	});
}
export function useDepositBalance(address, chainId) {
	return useQuery({
		queryKey: ['depositBalance', address, chainId],
		queryFn: () => getDepositBalance(address, chainId),
		enabled: !!address
	});

}
