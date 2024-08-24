"use client";
import styles from "./index.module.css";
import { useState } from "react";
import { useAccount } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import IncreaseStakeModal from "../modal/increaseStake";
import DisclaimerModal from "../modal/disclaimer";
export default function DepositButton() {
	const { isConnected } = useAccount();
	const { openConnectModal } = useConnectModal();
	const [increaseStakeModal, setIncreaseStakeModal] = useState(false);
	const [disclaimerModal, setDisclaimerModal] = useState(false);
	if (isConnected) {
		return (
			<>
				<button className={styles.button} onClick={() => { setDisclaimerModal(true) }}>
					DEPOSIT
				</button>
				{disclaimerModal && <DisclaimerModal
					isOpen={disclaimerModal}
					onClose={() => { setDisclaimerModal(false) }}
					onAccept={() => {
						setDisclaimerModal(false);
						setIncreaseStakeModal(true);
					}
					} />}
				{increaseStakeModal && <IncreaseStakeModal
					isOpen={increaseStakeModal}
					onClose={() => { setIncreaseStakeModal(false) }}
				/>}
			</>
		);
	} else {
		return (<button className={styles.button} onClick={openConnectModal} >
			CONNECT WALLET
		</button >
		);
	}
}
