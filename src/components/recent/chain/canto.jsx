"use client";
import Image from 'next/image';
import { formatEther } from 'viem';
import { colors, months, jackpotColors, jackpotNames } from '@/config/const';
import styles from '../index.module.css';
import { usePastWinners } from '@/config/query';
import icons from '@/public/icons/icons';
export default function Canto() {
	// Use the useQuery hook to fetch data

	const { data, isLoading, isError } = usePastWinners(7700);
	// Show loading indicator while data is being fetched
	if (isLoading || data === undefined) return <span>Loading...</span>;
	// Check if there's an error
	if (isError || data === null) return <span>Error</span>;
	const pastWinners = data[0];
	const pastWinnersAddresses = data[1];
	// Map through the winners array to render table rows
	return (
		<>
			{
				pastWinners.map((value, index) => {
					let jackpotType = value.jackpotPercent == 0 ? 0 : value.jackpotPercent <= 500 ? 1 : value.jackpotPercent < 5000 ? 2 : 3;
					let currentDate = new Date();
					currentDate.setTime(value.timestamp * 1000);
					let winningAddress = String(pastWinnersAddresses[index]).slice(0, 10);
					return (
						<tr
							key={index}
							style={{ color: jackpotColors[jackpotType] }}
						>
							<td>
								<Image src={icons['note']} width={29} height={28} alt="Chain Id Icon" />
							</td>
							<td className={styles.title_mobile}>
								<span style={{ color: jackpotColors[jackpotType] }}>{jackpotNames[jackpotType]}</span>
								<p className={styles.date_mobile} style={{ color: "#ffffff" }}>{months[currentDate.getMonth()]} {currentDate.getDay()}, {currentDate.getFullYear()}</p>
							</td>
							<td>
								<span>{winningAddress}...</span>
							</td>
							<td>
								{Number(formatEther(value.winningAmount)).toFixed(6)} <span style={{ color: colors[7700] }}>Canto</span>
							</td>
						</tr>
					);
				})
			}
		</>
	);
}
