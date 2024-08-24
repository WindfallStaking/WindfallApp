"use client";
import styles from "./index.module.css";
import { useContractState } from "@/config/query";

export default function Timer() {
	const { data, isLoading, isError } = useContractState(7700);
	if (isLoading || isError || data === undefined) {
		return (
			<div className={styles.timer}>
				<span>06</span>
				<span className={styles.blink}>:</span>
				<span>00</span>
			</div>
		);
	} else {

		// // let nextDrawTime = data.nextDrawTimestamp * 1000;
		let nextDrawTime = data.nextDrawTimestamp * 1000;
		const totalMillisecondsLeft = nextDrawTime - Date.now();
		if (totalMillisecondsLeft <= 0) {
			return (
				<div className={styles.timer}>
					<span>00</span>
					<span className={styles.blink}>:</span>
					<span>00</span>
				</div>
			);
		} else {

			const totalMinutesLeft = Math.floor(totalMillisecondsLeft / (60 * 1000));
			const totalHoursLeft = Math.floor(totalMinutesLeft / 60);

			// Calculate remaining minutes and seconds
			const minutesLeft = totalMinutesLeft % 60;

			// Format hours, minutes, and seconds
			const formattedHours = totalHoursLeft < 10 ? `0${totalHoursLeft}` : `${totalHoursLeft}`;
			const formattedMinutes = minutesLeft < 10 ? `0${minutesLeft}` : `${minutesLeft}`;

			return (
				<div className={styles.timer}>
					<span>{formattedHours}</span>
					<span className={styles.blink}>:</span>
					<span>{formattedMinutes}</span>
				</div>
			);
		}
	}
}

