"use client";
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { http } from 'wagmi';
import { canto } from 'wagmi/chains';
export const config = getDefaultConfig({
	appName: 'Windfall Staking',
	projectId: "9e6653dc03bf35b516a95c313de42ca0",
	chains: [canto],
	ssr: true,
	transports: {
		[canto.id]: http('https://canto-rpc.ansybl.io'),
	},
})



