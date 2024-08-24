import React from 'react';
import styles from "./index.module.css";
import { animated, useSpring } from '@react-spring/web';
export default function BaseModal({ isOpen, onClose, children }) {

	const popUpEffect = useSpring({
		opacity: isOpen ? 1 : 0,
		config: { duration: 300 },
	});

	if (!isOpen) return null;
	return (
		<div
			className={styles.container}
			onClick={onClose}
			style={
				{ backdropFilter: "blur(2px)", backgroundColor: "rgba(0,0,0,0.5)" }
			}
		>
			<animated.div
				className={styles.main}
				onClick={(e) => e.stopPropagation()}
				style={popUpEffect}
			>
				{children}
			</animated.div>
		</div>
	);
};

