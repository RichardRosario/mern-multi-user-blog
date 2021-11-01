import { Html, Head, Main, NextScript } from "next/document";

const MyDocument = () => {
	return (
		<Html lang='en'>
			<Head>
				<title>rsBlog</title>
				<meta name='description' content='Generated by create next app' />
				<link rel='icon' href='/favicon.ico' />
				<meta name='viewport' content='width=device-width, initial-scale=1.0' />
				<link
					rel='stylesheet'
					href='https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/css/bootstrap.min.css'
				/>
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
};

export default MyDocument;
