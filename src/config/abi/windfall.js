export const WINDFALL_ABI = [

	{
		"type": "function",
		"name": "getPastWinners",
		"inputs": [
			{
				"name": "numWinners",
				"type": "uint256",
				"internalType": "uint256"
			}
		],
		"outputs": [
			{
				"name": "",
				"type": "tuple[]",
				"internalType": "struct Winner[]",
				"components": [
					{
						"name": "winningToken",
						"type": "uint64",
						"internalType": "uint64"
					},
					{
						"name": "winningAmount",
						"type": "uint128",
						"internalType": "uint128"
					},
					{
						"name": "jackpotPercent",
						"type": "uint32",
						"internalType": "uint32"
					},
					{
						"name": "timestamp",
						"type": "uint32",
						"internalType": "uint32"
					}
				]
			},
			{
				"name": "",
				"type": "address[]",
				"internalType": "address[]"
			}
		],
		"stateMutability": "view"
	},
	{
		"type": "function",
		"name": "getState",
		"inputs": [],
		"outputs": [
			{
				"name": "",
				"type": "uint256[]",
				"internalType": "uint256[]"
			}
		],
		"stateMutability": "view"
	},

	{
		"type": "function",
		"name": "getUserDetails",
		"inputs": [
			{
				"name": "user",
				"type": "address",
				"internalType": "address"
			}
		],
		"outputs": [
			{
				"name": "",
				"type": "uint256",
				"internalType": "uint256"
			},
			{
				"name": "",
				"type": "uint256",
				"internalType": "uint256"
			},
			{
				"name": "",
				"type": "uint256",
				"internalType": "uint256"
			},
			{
				"name": "",
				"type": "uint256",
				"internalType": "uint256"
			}
		],
		"stateMutability": "view"
	},
	{
		"type": "function",
		"name": "increaseStake",
		"inputs": [
			{
				"name": "amount",
				"type": "uint256",
				"internalType": "uint256"
			}
		],
		"outputs": [],
		"stateMutability": "nonpayable"
	},
	{
		"type": "function",
		"name": "reduceStake",
		"inputs": [
			{
				"name": "amount",
				"type": "uint256",
				"internalType": "uint256"
			}
		],
		"outputs": [],
		"stateMutability": "nonpayable"
	},
	{
		"type": "function",
		"name": "unstake",
		"inputs": [],
		"outputs": [],
		"stateMutability": "nonpayable"
	}];

