import styles from "../styles/Home.module.css";
import Layout from "../components/Layout";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import { RecordVM } from "../models/record";

export default function Feedback() {
	const part_id = getCookie("part_id");

	const handleSubmit = async (e: any) => {
		const model: RecordVM = {
			first_name: (document.getElementById("first_name") as any).value,
			last_name: (document.getElementById("last_name") as any).value,
			email: (document.getElementById("email") as any).value,
			adults: (document.getElementById("adults") as any).value as number,
			children: (document.getElementById("children") as any).value as number,
			infants: (document.getElementById("infants") as any).value as number,
			gluten_intolerance: (document.getElementById("gluten_intolerance") as any).checked,
			lactose_intolerance: (document.getElementById("lactose_intolerance") as any).checked,
			participant_names: (document.getElementById("participant_names") as any).value,
			other_intolerance: (document.getElementById("other_intolerance") as any).value,
		};

		if (part_id) {
			const response = await fetch("/api/feedback/update", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					...model,
					id: part_id,
				}),
			});

			const data = await response.json();
			setRecord({ ...data.feedback } as RecordVM);
		} else {
			const response = await fetch("/api/feedback/create", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					adults: model.adults,
					first_name: model.first_name,
					email: model.email,
					children: model.children,
					infants: model.infants,
					gluten_intolerance: model.gluten_intolerance,
					lactose_intolerance: model.lactose_intolerance,
					participant_names: model.participant_names,
					other_intolerance: model.other_intolerance,
				}),
			});

			const data = await response.json();
			setRecord({ ...data.feedback } as RecordVM);
		}
	};

	const init = async () => {
		if (part_id) {
			const feedback = await fetch("/api/feedback/get", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					id: part_id,
				}),
			});

			const data = await feedback.json();

			setRecord({ ...data.feedback } as RecordVM);
		}
	};

	useEffect(() => {
		init();
	}, []);

	const [record, setRecord] = useState<RecordVM | undefined>(undefined);

	return (
		<Layout pageTitle="Viki & Andris - Visszajelzés">
			<Header />
			<main className={styles.main}>
				<div>
					<div className="text-2xl">Kérjük töltse ki az alábbi kérdőívet az esküvővel kapcsolatban.</div>
					<form className="w-full max-w-lg" id="participation_form" onSubmit={handleSubmit}>
						<div className="flex flex-wrap -mx-3 mb-6 mt-8">
							<div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
								<label
									className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
									htmlFor="first_name"
								>
									Vezetéknév
								</label>
								<input
									className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
									id="first_name"
									type="text"
									placeholder="Vezetéknév"
									value={record?.first_name}
									required
								/>
							</div>
							<div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
								<label
									className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
									htmlFor="last_name"
								>
									Keresztnév
								</label>
								<input
									className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
									id="last_name"
									type="text"
									placeholder="Keresztnév"
									value={record?.last_name}
									required
								/>
							</div>
							<div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
								<label
									className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
									htmlFor="email"
								>
									Email
								</label>
								<input
									className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
									id="email"
									type="email"
									placeholder="email@email.hu"
									required
									value={record?.email}
								/>
							</div>
						</div>
						<div className="text-lg">Vendégekkel kapcsolatos információk</div>
						<div className="flex flex-wrap -mx-3 mb-6 mt-8">
							<div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
								<label
									className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
									htmlFor="adults"
								>
									Felnőttek száma
								</label>
								<input
									className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
									id="adults"
									type="number"
									min={1}
									required
									value={record?.adults}
								/>
							</div>
							<div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
								<label
									className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
									htmlFor="children"
								>
									Gyerekek (5-12)
								</label>
								<input
									className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
									id="children"
									type="number"
									min={0}
									required
									value={record?.children}
								/>
							</div>
							<div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
								<label
									className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
									htmlFor="infants"
								>
									Gyerekek (0-5)
								</label>
								<input
									className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
									id="infants"
									type="number"
									min={0}
									required
									value={record?.infants}
								/>
							</div>
						</div>
						<div className="flex flex-wrap -mx-3 mb-6 mt-8">
							<div className="w-full px-3 mb-6 md:mb-0">
								<label
									className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
									htmlFor="participant_names"
								>
									Összes résztvevő teljes neve
								</label>
								<textarea
									className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
									id="participant_names"
									placeholder="Kérjük adja meg az összes résztvevő teljes nevét vesszővel elválasztva"
									required
									value={record?.participant_names}
								/>
							</div>
						</div>
						<div className="text-lg mb-6">Allergiákkal kapcsolatos információk</div>
						<div className="md:flex md:items-center mb-6">
							<div>
								<label className="block text-gray-500 font-bold">
									<input className="mr-2 leading-tight" type="checkbox" id="gluten_intolerance" />
									<span className="uppercase tracking-wide text-gray-700 text-xs font-bold">
										Van a vendégek között glutén érzékeny?
									</span>
								</label>
							</div>
						</div>
						<div className="md:flex md:items-center mb-6">
							<div>
								<label className="block text-gray-500 font-bold">
									<input className="mr-2 leading-tight" type="checkbox" id="lactose_intolerance" />
									<span className="uppercase tracking-wide text-gray-700 text-xs font-bold">
										Van a vendégek között laktóz érzékeny?
									</span>
								</label>
							</div>
						</div>
						<div className="flex flex-wrap -mx-3 mb-6 mt-8">
							<div className="w-full px-3 mb-6 md:mb-0">
								<label
									className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
									htmlFor="other_intolerance"
								>
									Egyéb érzékenység, allergia
								</label>
								<textarea
									className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
									id="other_intolerance"
									placeholder="Kérjük adja meg az az egyéb érzékenységeket"
									value={record?.other_intolerance}
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
