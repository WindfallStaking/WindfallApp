
import Image from "next/image";
import styles from "./index.module.css";
import icons from "@/public/icons/icons";
import RainbowConnect from "./connectButton";
export default function Header() {

	return (
		<div className={styles.main}>
			<div className={styles.nav}>
				<div className={styles.logo}>
					W
					<span>
						<div className={styles.flower}>
							<Image src={icons.flower} alt="logo" fill />
						</div>
						I
					</span>
					NDFALL
				</div>
				<RainbowConnect />
			</div>
		</div>

	);

}
