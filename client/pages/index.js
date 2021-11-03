import Head from "next/head";

import Link from "next/link";
import Layout from "../components/Layout";
import styles from "../styles/Home.module.css";

export default function Home() {
	return (
		<div className={styles.container}>
			<Head>
				<title>rsBlog</title>
				<meta name='viewport' content='width=device-width, initial-scale=1.0' />
			</Head>
			<Layout>
				<h1>Hello world, this is NEXT</h1>
				<Link href='/signup'>
					<a>Signup</a>
				</Link>
			</Layout>
		</div>
	);
}
