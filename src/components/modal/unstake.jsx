"use client";
import React from 'react';
import styles from "./index.module.css";
import BaseModal from './baseModal';
import { useState } from 'react';
import { useUserDetails } from '@/config/query/queries';
import { useUnstakeMutation } from '@/config/query/mutations';
import { tokens, colors } from '@/config/const';
import { useAccount } from 'wagmi';
import { formatEther } from 'viem';
export default function UnstakeModal({ isOpen, onClose }) {
	const { address, chainId } = useAccount();
	const [amount, setAmount] = useState(0);
	const { data: userDetails } = useUserDetails(address, chainId);
	const { mutation } = useUnstakeMutation(onClose);
	if (!isOpen || chainId === undefined) return null;
	const availableUnstake = Number(formatEther(userDetails.availableUnstake)).toFixed(2)
	const pendingUnstake = Number(formatEther(userDetails.totalUnstake)).toFixed(2);
	return (
		<BaseModal isOpen={isOpen} onClose={onClose} >
			<h2 className={styles.title}>Finish Unstaking<span style={{ color: colors[chainId] }}> {tokens[chainId]}</span></h2>
			<div className={styles.unstake_title}>
				<div className={styles.available_unstake}>
					<h4> Available Unstake </h4>
					<h2> {availableUnstake}</h2>
				</div>
				<div className={styles.pending_unstake}>
					<h4> Pending Unstake </h4>
					<h2> {pendingUnstake}</h2>
				</div>
			</div>
			<div className={styles.gradient_border}>
				<button
					className={styles.change_button}
					onClick={() => {
						if (availableUnstake > 0) {
							mutation.mutate();
						}
					}
					}
					style={{ color: "#ffffff" }}
				>
					<span>UNSTAKE</span>
				</button>
			</div>
			<span className={styles.info}>
			</span>
		</BaseModal>
	);
}




