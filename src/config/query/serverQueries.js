// import { useQuery } from "@tanstack/react-query";
// import { getContractState, getDepositBalance, getUserDetails } from "@/actions";
// import { isSupportedChainId } from "../const";
//
// export function contractState(chainId) {
// 	const supportedChainId = isSupportedChainId(chainId) ? chainId : 7700;
// 		return useQuery({
// 			queryKey: ['staticState', supportedChainId],
// 			queryFn: getContractState(chainId),
// 		});
// }
//
// export function userDetails(chainId, address) {
// 	if (chainId === undefined || address === undefined) {
// 		return { data: null };
// 	}
// 	return useQuery({
// 		queryKey: ['userDetails', chainId, address],
// 		queryFn: getUserDetails,
// 	});
//  
// export function depositBalance(chainId, address) {
// 	if (chainId === undefined || address === undefined) {
// 		return { data: null };
// 	}
// 	return useQuery({
// 		queryKey: ['depositBalance', chainId, address],
// 		queryFn: getDepositBalance,
// 	});
//
// }
//
