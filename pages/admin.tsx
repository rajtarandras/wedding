import styles from "../styles/Home.module.css";
import Layout from "../components/Layout";
import Header from "../components/Header";
import Loader from "../components/Loader";
import { useEffect, useState } from "react";
import { RecordVM } from "../models/record";

const FULL_PRICE = 16990;
const CHILD_PRICE = 8500;

export default function Feedback() {
	const init = async () => {
		const response = await fetch("/api/feedback/search", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
		});

		const sigle = (
			await (
				await fetch("/api/feedback/get", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						id: "rec_cenbupbkpktmbjhl7lo0",
					}),
				})
			).json()
		).feedback;

		const data = await response.json();

		const all: RecordVM[] = data.feedbacks.map((feedback: any) => {
			return { ...feedback } as RecordVM;
		});
		setRecords(all);

		const adults = all.reduce((accumulator, current) => {
			return accumulator + current.adults;
		}, 0);

		const children = all.reduce((accumulator, current) => {
			return accumulator + current.children;
		}, 0);

		const infants = all.reduce((accumulator, current) => {
			return accumulator + current.infants;
		}, 0);

		setTotalAdults(adults);
		setTotalChildren(children);
		setTotalInfants(infants);
	};

	const [records, setRecords] = useState<RecordVM[] | undefined>(undefined);
	const [totalAdults, setTotalAdults] = useState<number>(0);
	const [totalChildren, setTotalChildren] = useState<number>(0);
	const [totalInfants, setTotalInfants] = useState<number>(0);
	const [selectedRecord, setSelectedRecord] = useState<RecordVM | undefined>(undefined);

	useEffect(() => {
		init();
	}, []);

	return (
		<Layout pageTitle="Viki & Andris - Visszajelzések">
			<Header />
			<main className={styles.main}>
				{records === undefined ? (
					<Loader />
				) : (
					<>
						<div>
							<div className="flex items-start space-x-2 mb-4">
								<div className="text-xl uppercase">Összes résztvevő:</div>
								<div className="text-xl font-bold">{totalAdults + totalChildren + totalInfants}</div>
							</div>

							<div className="flex items-start space-x-2 mb-4">
								<div className="text-xl uppercase">Teljes ár:</div>
								<div className="text-xl font-bold">
									{totalAdults * FULL_PRICE + totalChildren * CHILD_PRICE} Ft
								</div>
							</div>

							<div className="flex items-start space-x-2 mb-1">
								<div className="uppercase italic">Felnőttek száma:</div>
								<div className="font-bold">{totalAdults}</div>
							</div>
							<div className="flex items-start space-x-2 mb-1">
								<div className="uppercase italic">Gyerekek száma (5-12):</div>
								<div className="font-bold">{totalChildren}</div>
							</div>
							<div className="flex items-start space-x-2 mb-3">
								<div className="uppercase italic">Gyerekek száma (0-5):</div>
								<div className="font-bold">{totalInfants}</div>
							</div>

							<div className="mt-4">
								<table className="min-w-full">
									<thead className="bg-white border-b">
										<tr>
											<th
												scope="col"
												className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
											>
												Vezetéknév
											</th>
											<th
												scope="col"
												className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
											>
												Keresztnév
											</th>
											<th
												scope="col"
												className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
											>
												Email
											</th>
											<th
												scope="col"
												className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
											>
												Résztvevők
											</th>
											<th
												scope="col"
												className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
											></th>
										</tr>
									</thead>
									<tbody>
										{records.map((r, i) => (
											<tr key={i} className="bg-gray-100 border-b">
												<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
													{r.first_name}
												</td>
												<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
													{r.last_name}
												</td>
												<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
													{r.email}
												</td>
												<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
													{r.adults + r.children + r.infants}
												</td>
												<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
													<button
														className="block w-full md:w-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
														type="button"
														data-modal-toggle="medium-modal"
														onClick={() => setSelectedRecord(r)}
													>
														Részletek
													</button>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>

						<div
							id="medium-modal"
							className={`${
								selectedRecord ? "" : "hidden"
							} fixed top-0 left-1/3 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto h-modal md:h-full`}
						>
							<div className="relative w-full h-full max-w-lg md:h-auto">
								<div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
									<div className="flex items-center justify-between p-5 border-b rounded-t dark:border-gray-600">
										<h3 className="text-xl font-medium text-gray-900 dark:text-white">
											Vendég információ
										</h3>
										<button
											type="button"
											className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
											data-modal-toggle="medium-modal"
											onClick={() => setSelectedRecord(undefined)}
										>
											<svg
												aria-hidden="true"
												className="w-5 h-5"
												fill="currentColor"
												viewBox="0 0 20 20"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"></path>
											</svg>
											<span className="sr-only">Close modal</span>
										</button>
									</div>
									<div className="p-6 space-y-3">
										<div>Résztvevők:</div>
										<ul>
											{selectedRecord?.participant_names.split(",").map((n, i) => (
												<li key={i} className="ml-4 list-disc">
													{n}
												</li>
											))}
										</ul>

										<div className="mt-2 flex space-x-2">
											<div>Laktózérzékenység:</div>
											<div className="font-bold">
												{selectedRecord?.lactose_intolerance ? "Igen" : "Nem"}
											</div>
										</div>

										<div className="mt-2 flex space-x-2">
											<div>Gluténérzékenység:</div>
											<div className="font-bold">
												{selectedRecord?.gluten_intolerance ? "Igen" : "Nem"}
											</div>
										</div>

										{selectedRecord?.other_intolerance ? (
											<div className="flex space-x-2">
												<div>Egyéb érzékenység/allergia:</div>
												<p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
													{selectedRecord.other_intolerance}
												</p>
											</div>
										) : (
											""
										)}
									</div>
								</div>
							</div>
						</div>
					</>
				)}
			</main>
		</Layout>
	);
}
