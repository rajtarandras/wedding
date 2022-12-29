import styles from "../styles/Home.module.css";
import Layout from "../components/Layout";
import Header from "../components/Header";

export default function Feedback() {
	const handleSubmit = (e: any): void => {
		console.log(e.target);
	};
	return (
		<Layout pageTitle="Viki & Andris - Visszajelzés">
			<Header />
			<main className={styles.main}>
				<div>
					<div className="text-xl">Kérjük töltse ki az alábbi kérdőívet az esküvővel kapcsolatban.</div>
					<form className="w-full max-w-lg">
						<div className="flex flex-wrap -mx-3 mb-6 mt-8">
							<div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
								<label
									className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
									htmlFor="grid-first-name"
								>
									Vezetéknév
								</label>
								<input
									className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
									id="grid-first-name"
									type="text"
									placeholder="Vezetéknév"
									required
								/>
							</div>
							<div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
								<label
									className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
									htmlFor="grid-last-name"
								>
									Keresztnév
								</label>
								<input
									className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
									id="grid-last-name"
									type="text"
									placeholder="Keresztnév"
									required
								/>
							</div>
							<div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
								<label
									className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
									htmlFor="grid-email"
								>
									Email
								</label>
								<input
									className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
									id="grid-email"
									type="email"
									placeholder="email@email.hu"
									required
								/>
							</div>
						</div>
						<button
							className="flex-shrink-0 bg-green-primary hover:bg-teal-700 border-green-primary hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
							type="submit"
						>
							Küldés
						</button>
					</form>
				</div>
			</main>
		</Layout>
	);
}
