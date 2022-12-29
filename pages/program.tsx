import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useMemo, useState, useEffect } from "react";
import Layout from "../components/Layout";
import Header from "../components/Header";

export default function Program() {
	return (
		<Layout pageTitle="Viki & Andris - Program">
			<Header />
			<main className={styles.main}>
				<div>Program</div>
			</main>
		</Layout>
	);
}
