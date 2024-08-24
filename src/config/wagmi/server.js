import { http, createConfig } from "@wagmi/core";
import { canto } from "@wagmi/core/chains";

export const serverConfig = createConfig({
	ssr: true,
	chains: [canto],
	transports: {
		[canto.id]: http('https://canto-rpc.ansybl.io'),
	},
});


