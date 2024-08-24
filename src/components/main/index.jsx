import styles from "./index.module.css";
import icons from "@/public/icons/icons";
import images from "@/public/img/img";
import Image from "next/image";
import CountdownTimer from "./timer";
import Listing from "./listing";
import DepositButton from "./depositButton";
export default function Main() {

	return (
		<div className={styles.main}>
			<div className={styles.background_twirl}>
				<Image src={images.twirl} alt="twirl" fill />
			</div>
			<div className={styles.box}>
				<div className={styles.top}>
					<span>
						<div className={styles.timer_icon}>
							<Image src={icons.timer} alt="timer icon" fill />
						</div>
						Time until next draw
					</span>
					<CountdownTimer />
				</div>
				<table className={styles.display}>
					<thead className={styles.table_head}>
						<tr>
							<th>Token</th>
							<th>Deposits</th>
							<th>Daily</th>
							<th className={styles.last_column}>Jackpot</th>
						</tr>
					</thead>
					<tbody className={styles.table_body}>
						<Listing chainId={7700} />
					</tbody>
				</table>

				<DepositButton />

				{/* Background colored ball icons */}
				<div className={styles.ball1}>
					<Image src={images.ball1} alt="ball" />
				</div>
				<div className={styles.ball2}>
					<Image src={images.ball2} alt="ball" />
				</div>
				<div className={styles.ball3}>
					<Image src={images.ball3} alt="ball" />
				</div>
				<div className={styles.ball4}>
					<Image src={images.ball4} alt="ball" />
				</div>
				<div className={styles.ball5}>
					<Image src={images.ball5} alt="ball" />
				</div>
				<div className={styles.ball6}>
					<Image src={images.ball6} alt="ball" />
				</div>
			</div>
		</div>
	);
}
