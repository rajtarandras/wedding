import Link from "next/link";
import Image from "next/image";

import styles from "./Header.module.css";

export const Header = () => {
	return (
		<>
			<nav className={styles.nav}>
				<Link href="/" className={styles.navitem}>
					<Image src="/ring.svg" alt="Főoldal" width={50} height={50} priority />
				</Link>
				<div className="flex">
					<Link href="/admin" className={styles.navitem}>
						<span>Admin</span>
					</Link>
					<Link href="/program" className={styles.navitem}>
						<span>Program</span>
					</Link>
					<Link href="/feedback" className={styles.navitem}>
						<span>Visszajelzés</span>
					</Link>
				</div>
			</nav>
		</>
	);
};

export default Header;
