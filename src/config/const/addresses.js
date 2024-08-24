const WINDFALL_INSTANCES = {
    7700: {
        windfall: process.env.NEXT_PUBLIC_NOTE_WINDFALL_ADDRESS,
        depositToken: process.env.NEXT_PUBLIC_NOTE_ADDRESS,
    },
    81457: {
        windfall: process.env.NEXT_PUBLIC_USDB_WINDFALL_ADDRESS,
        depositToken: process.env.NEXT_PUBLIC_USDB_ADDRESS,
    },
};

export function getWindfallAddress(chainId) {
    if (isSupportedChainId(chainId)) {
        return WINDFALL_INSTANCES[chainId].windfall;
    } else {
        return WINDFALL_INSTANCES[7700].windfall;
    }
}

export function getDepositAddress(chainId) {
    if (isSupportedChainId(chainId)) {
        return WINDFALL_INSTANCES[chainId].depositToken;
    } else {
        return WINDFALL_INSTANCES[7700].depositToken;
    }
}

export function isSupportedChainId(chainId) {
    if (chainId == 7700 || chainId == 81457) {
        return true;
    }
    return false;
}
