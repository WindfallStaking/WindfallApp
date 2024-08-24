"use client";
import React from 'react';
import Image from 'next/image';
import styles from "./index.module.css";
import icons from '@/public/icons/icons';
import BaseModal from './baseModal';
import { useState } from 'react';
import { useUserDetails } from '@/config/query/queries';
import { useReduceStakeMutation } from '@/config/query/mutations';
import { tokens, colors } from '@/config/const';
import { useAccount } from 'wagmi';
import { formatEther } from 'viem';
export default function ReduceStakeModal({ isOpen, onClose }) {
	const { address, chainId } = useAccount();
	const [amount, setAmount] = useState(0);
	const { data: userDetails } = useUserDetails(address, chainId);
	const { mutateAsync } = useReduceStakeMutation(onClose);
	if (!isOpen || chainId === undefined) return null;
	const maxWithdraw = Number(formatEther(userDetails.value));
	return (
		<BaseModal isOpen={isOpen} onClose={onClose} >
			<h2 className={styles.title}>Start Unstaking<span style={{ color: colors[chainId] }}> {tokens[chainId]}</span></h2>
			<div className={styles.gradient_border}>
				<div className={styles.input_box}>
					<div
						className={styles.token_icon}>
						<Image src={icons['canto']} style={{ width: '29px', height: '28px' }} alt='Chain Id Icon' />
					</div>
					<input
						className={styles.input}
						type="number"
						onChange={(e) => {
							setAmount(e.target.value);
						}}
						value={amount}
					/>
					<button className={styles.max_button} onClick={() => { setAmount(maxWithdraw) }}>
						MAX
					</button>
				</div>
			</div>
			<div className={styles.gradient_border}>
				<button
					className={styles.change_button}
					onClick={() => {
						mutateAsync(amount.toString());
					}
					}
					style={{ color: "#ffffff" }}
				>
					<span>CONTINUE</span>
				</button>
			</div>
			<span className={styles.info}>
				Looking for a different pool? Change your wallet’s network.{" "}
			</span>
		</BaseModal>
	);
}



