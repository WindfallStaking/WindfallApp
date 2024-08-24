import { getContractState, getPastWinners } from "@/actions"
import { queryClient } from "../context"

export const prefetchState = async () => {
	queryClient.prefetchQuery({
		queryKey: ['staticState', 7700],
		queryFn: () => { getContractState(7700) },
	});
	queryClient.prefetchQuery({
		queryKey: ['pastWinners', 7700],
		queryFn: () => { getPastWinners(7700) },
	});
}
