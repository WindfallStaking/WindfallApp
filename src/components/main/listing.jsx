"use client";
import { formatEther } from 'viem';
import styles from './index.module.css';
import { useContractState } from '@/config/query/queries';
import { colors, tokens } from '@/config/const';
export default function Listing({ chainId }) {

	const { data, isLoading, isError } = useContractState(chainId);
	if (isLoading) {
		return (
			<tr className={styles.listing} style={{ color: colors[chainId] }}>
				<td>{tokens[chainId]}</td>
				<td>Loading...</td>
				<td>Loading... </td>
				<td className={styles.last_column}>Loading...</td>
			</tr>
		);
	}
	if (isError || data === undefined) {
		return (

			<tr className={styles.listing} style={{ color: colors[chainId] }}>
				<td>{tokens[chainId]}</td>
				<td>Error</td>
				<td>Error </td>
				<td className={styles.last_column}>Error</td>
			</tr>
		);

	} else {
		const totalDeposits = Number(formatEther(data.totalStaked));
		const drawReward = totalDeposits * 0.9 * 0.25 / 365;
		return (
			<tr className={styles.listing} style={{ color: colors[chainId] }}>
				<td>{tokens[chainId]}</td>
				<td>{totalDeposits.toFixed(0)}</td>
				<td>{drawReward.toFixed(2)} </td>
				<td className={styles.last_column}>{Number(formatEther(data.rewardJackpot)).toFixed(4)}</td>
			</tr>
		);
	}
}

