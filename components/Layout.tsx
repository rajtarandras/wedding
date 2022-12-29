import Head from "next/head";

const Layout = (props: any) => {
	return (
		<div>
			<Head>
				<title>{props.pageTitle}</title>
				<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
				<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
				<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
				<link rel="manifest" href="/site.webmanifest" />
				<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
				<meta name="msapplication-TileColor" content="#da532c" />
				<meta name="theme-color" content="#ffffff" />

				<meta name="description" content="Official website for Viki and Andris wedding" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>
			<div>{props.children}</div>
		</div>
	);
};

export default Layout;
