import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import { useMemo, useState, useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

export default function Home() {
  const parsedDeadline = useMemo(
    () => Date.parse(new Date(2023, 6, 3).toString()),
    []
  );
  const [time, setTime] = useState<number>(parsedDeadline - Date.now());

  useEffect(() => {
    const interval = setInterval(
      () => setTime(parsedDeadline - Date.now()),
      1000
    );

    return () => clearInterval(interval);
  }, [parsedDeadline]);

  return (
    <>
      <Head>
        <title>Viki & Andris</title>

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />

        <meta
          name="description"
          content="Official website for Viki and Andris wedding"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={styles.main}>
        <div>
          <h1 className="text-3xl italic mb-0 flex justify-center">
            Viktória és András
          </h1>
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
    </>
  );
}
