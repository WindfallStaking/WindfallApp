"use client";
import React from 'react';
import Image from 'next/image';
import styles from "./index.module.css";
import icons from '@/public/icons/icons';
import BaseModal from './baseModal';
import { useState } from 'react';
import { useDepositBalance } from '@/config/query/queries';
import { useIncreaseStakeMutation } from '@/config/query/mutations';
import { tokens, colors } from '@/config/const';
import { useAccount } from 'wagmi';
export default function IncreaseStakeModal({ isOpen, onClose }) {
	const { address, chainId } = useAccount();
	const [amount, setAmount] = useState(0);
	const { data: maxDeposit } = useDepositBalance(address, chainId);
	const mutation = useIncreaseStakeMutation(onClose);
	if (!isOpen || chainId === undefined) return null;
	return (
		<BaseModal isOpen={isOpen} onClose={onClose} >
			<h2 className={styles.title}>Deposit<span style={{ color: colors[chainId] }}> {tokens[chainId]}</span></h2>
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
					<button className={styles.max_button} onClick={() => { setAmount(maxDeposit) }}>
						MAX
					</button>
				</div>
			</div>
			<div className={styles.gradient_border}>
				<button
					className={styles.change_button}
					onClick={() => {
						mutation.mutateAsync(amount.toString());
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

