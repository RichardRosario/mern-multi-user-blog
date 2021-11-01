import Link from "next/link";
import Layout from "../components/Layout";
import styles from "../styles/Home.module.css";

import fs from "fs/promises";
import path from "path";

export default function Home({ products }) {
	return (
		<div className={styles.container}>
			<Layout>
				<h1>Hello world, this is NEXT</h1>
				<Link href='/signup'>
					<a>Signup</a>
				</Link>
			</Layout>
		</div>
	);
}
