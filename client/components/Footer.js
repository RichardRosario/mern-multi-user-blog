import React from "react";
import Image from "next/image";
import styles from "../styles/Home.module.css";

const Footer = () => {
	return (
		<footer className={styles.footer}>
			<div>
				<a
					href='https://rosario.solutions'
					target='_blank'
					rel='noopener noreferrer'
				>
					Built by{" "}
					<span className={styles.logo}>
						<Image src='/logo.jpg' alt='Rosario Logo' width={60} height={16} />.
					</span>
				</a>
				Powered by React-Nextjs.
			</div>
		</footer>
	);
};

export default Footer;
