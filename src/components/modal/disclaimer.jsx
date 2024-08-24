"use client";
import Link from 'next/link';
import React from 'react';
import styles from "./index.module.css";
import BaseModal from './baseModal';
import { useState } from 'react';
export default function DisclaimerModal({ isOpen, onClose, onAccept }) {
	const [checkedOne, setCheckedOne] = useState(false);
	const [checkedTwo, setCheckedTwo] = useState(false);
	if (!isOpen) return null;
	return (
		<BaseModal isOpen={isOpen} onClose={onClose} >
			<h2 className={styles.title}>Before We Begin...</h2>
			<div className={styles.terms}>
				<div
					className={styles.bubble}
					onClick={() => { setCheckedOne(!checkedOne) }}
					style={
						checkedOne
							? { backgroundColor: "#01e186", borderColor: "#009358" }
							: null
					}
				></div>
				<span className={styles.text}>
					I understand that selected tokens will be
					withdrawn from my wallet and will require a
					mandatory unstaking period before they’re able
					to be withdrawn.
				</span>
			</div>
			<div className={styles.terms}>
				<div
					className={styles.bubble}
					onClick={() => { setCheckedTwo(!checkedTwo) }}
					style={
						checkedTwo
							? { backgroundColor: "#01e186", borderColor: "#009358" }
							: null
					}
				></div>
				<span className={styles.text}>
					By clicking the button below, I acknowledge I have read and agree to Windfall’s{" "}
					<Link href={'https://app.gitbook.com/o/kJtfy5OqPfuA6aeBb99F/s/p4yUSk23AubmL5kX5Stz/additional-information/terms-of-service'}><span>Terms of Use</span></Link>, <Link href={'https://app.gitbook.com/o/kJtfy5OqPfuA6aeBb99F/s/p4yUSk23AubmL5kX5Stz/additional-information/disclaimer'}><span>Disclaimer</span></Link>,{" "} and <Link href={'https://app.gitbook.com/o/kJtfy5OqPfuA6aeBb99F/s/p4yUSk23AubmL5kX5Stz/additional-information/privacy-policy'}><span>Privacy Policy</span></Link>.
				</span>
			</div>

			<div className={styles.gradient_border}>
				<button
					className={styles.change_button}
					onClick={() => {
						if (checkedOne && checkedTwo) {
							onAccept()
						}
					}}
					style={{ color: "#ffffff" }}
				>
					<span>CONTINUE</span>
				</button>
			</div>
		</BaseModal >
	);
}


