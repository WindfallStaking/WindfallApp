import styles from "./index.module.css";
import Canto from './chain/canto';
export default function Recent() {
	return (
		<div className={styles.container}>
			<div className={styles.main}>
				<div className={styles.title}>
					Recent Windfalls <div className={styles.title_underline}></div>
				</div>

				<table className={styles.display}>
					<thead className={styles.table_head}>
						<tr>
							<th>WINDFALL</th>
							<th>USER</th>
							<th>AMOUNT</th>
						</tr>
					</thead>
					<tbody className={styles.table_body}>
						<Canto />
					</tbody>
				</table>
			</div>
		</div>
	);

}


