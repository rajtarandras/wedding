import styles from "../styles/Home.module.css";
import React, { useMemo, useState, useEffect } from "react";
import Layout from "../components/Layout";
import Header from "../components/Header";
import { useRouter } from "next/navigation";

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

export default function Home() {
	const parsedDeadline = useMemo(() => Date.parse(new Date(2023, 6, 3).toString()), []);
	const [time, setTime] = useState<number>(parsedDeadline - Date.now());

	useEffect(() => {
		const interval = setInterval(() => setTime(parsedDeadline - Date.now()), 1000);

		return () => clearInterval(interval);
	}, [parsedDeadline]);

	return (
		<Layout pageTitle="Viki & Andris - Főoldal">
			<Header />
			<main className={styles.main}>
				<div>
					<h1 className="text-5xl italic flex justify-center mt-10 text-gray-700">Viktória és András</h1>
					<div className={styles.timer}>
						{Object.entries({
							Nap: time / DAY,
							Óra: (time / HOUR) % 24,
							Perc: (time / MINUTE) % 60,
							Másodperc: (time / SECOND) % 60,
						}).map(([label, value]) => (
							<div key={label} className={styles.col4}>
								<div className={styles.box}>
									<p>{`${Math.floor(value)}`.padStart(2, "0")}</p>
									<span className={styles.text}>{label}</span>
								</div>
							</div>
						))}
					</div>
				</div>
			</main>
		</Layout>
	);
}
