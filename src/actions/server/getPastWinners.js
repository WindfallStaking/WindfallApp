import { readContract } from "@wagmi/core";
import { WINDFALL_ABI } from "@/config/abi";
import { serverConfig } from "@/config/wagmi";
import { getWindfallAddress } from "@/config/const";
export const getPastWinners = async (chainId) => {
	const windfallAddress = getWindfallAddress(chainId);
	try {
		const response = await readContract(serverConfig, {
			abi: WINDFALL_ABI,
			address: windfallAddress,
			chainId: chainId,
			functionName: 'getPastWinners',
			args: [BigInt(7)],
		});
		return response;
	} catch {
		return null;
	}
}
