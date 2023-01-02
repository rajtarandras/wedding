import styles from "../styles/Home.module.css";
import Layout from "../components/Layout";
import Header from "../components/Header";
import { ChangeEvent, useEffect, useState } from "react";
import { getCookie, setCookie } from "cookies-next";
import { RecordVM } from "../models/record";
import { useFluentValidator, Validation } from "../validation/FluentValidator";
import { toSafeNumber } from "../utils/utils";
import { useRouter } from "next/router";

type FieldName =
	| "first_name"
	| "last_name"
	| "email"
	| "adults"
	| "children"
	| "infants"
	| "gluten_intolerance"
	| "lactose_intolerance"
	| "participant_names"
	| "other_intolerance";

const DEFAULT_VM: RecordVM = {
	adults: undefined,
	children: undefined,
	email: undefined,
	first_name: undefined,
	gluten_intolerance: false,
	infants: undefined,
	lactose_intolerance: false,
	last_name: undefined,
	participant_names: undefined,
	other_intolerance: undefined,
};

export default function Feedback() {
	const part_id = getCookie("part_id");

	const save = async () => {
		if (part_id) {
			const response = await fetch("/api/feedback/update", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					...record,
					id: part_id,
				}),
			});

			const data = await response.json();
			setRecord({ ...data.feedback } as RecordVM);
		} else {
			const serialized = JSON.stringify({
				...record,
			});

			const response = await fetch("/api/feedback/create", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: serialized,
			});

			const data = await response.json();
			setRecord({ ...data.feedback } as RecordVM);
			setCookie("part_id", data.feedback.id, {
				maxAge: 2147483647,
				secure: true,
			});
		}

		setSuccess(true);
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

	const [record, setRecord] = useState<RecordVM>(DEFAULT_VM);
	const [success, setSuccess] = useState(false);
	const router = useRouter();

	const validator = useFluentValidator<FieldName, RecordVM>(
		[
			Validation.ruleFor("email", (vm: RecordVM) => vm?.email)
				.isRequired("*Kérlek töltsd ki ezt a mezőt.")
				.isEmail(),
			Validation.ruleFor("first_name", (vm: RecordVM) => vm?.first_name).isRequired(
				"*Kérlek töltsd ki ezt a mezőt."
			),
			Validation.ruleFor("last_name", (vm: RecordVM) => vm?.last_name).isRequired(
				"*Kérlek töltsd ki ezt a mezőt."
			),
			Validation.ruleFor("infants", (vm: RecordVM) => vm?.infants).isRequired("*Kérlek töltsd ki ezt a mezőt."),
			Validation.ruleFor("children", (vm: RecordVM) => vm?.children).isRequired("*Kérlek töltsd ki ezt a mezőt."),
			Validation.ruleFor("adults", (vm: RecordVM) => vm?.adults)
				.isRequired("*Kérlek töltsd ki ezt a mezőt.")
				.min(1),
			Validation.ruleFor("participant_names", (vm: RecordVM) => vm?.participant_names).isRequired(
				"*Kérlek töltsd ki ezt a mezőt."
			),
		],
		() => save()
	);

	useEffect(() => {
		init();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		validator.validate(record);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [record]);

	return (
		<Layout pageTitle="Viki & Andris - Visszajelzés">
			<Header />
			<main className={styles.main}>
				<div>
					{success ? (
						<>
							<div className="text-2xl mb-3">Köszönjük, hogy kitöltötted a kérdőívet!</div>
							<div className="text-xl mb-3">Sok szeretettel várunk esküvőnkre.</div>
							<button
								className="flex-shrink-0 bg-green-primary hover:bg-teal-700 border-green-primary hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
								type="button"
								onClick={() => router.push("/")}
							>
								Vissza a főoldalra
							</button>
						</>
					) : (
						<>
							<div className="text-2xl">
								Kérjük töltse ki az alábbi kérdőívet az esküvővel kapcsolatban.
							</div>
							<div className="w-full max-w-lg">
								<div className="flex flex-wrap -mx-3 mb-6 mt-8">
									<div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
										<label
											className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
											htmlFor="first_name"
										>
											Vezetéknév*
										</label>
										<input
											className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${
												validator.getMessage("first_name") !== undefined ? "border-red-500" : ""
											} rounded py-3 px-4 mb-2 leading-tight focus:outline-none focus:bg-white`}
											id="first_name"
											type="text"
											placeholder="Vezetéknév"
											value={record?.first_name}
											onChange={(e: ChangeEvent<HTMLInputElement>) => {
												validator.showMessageFor("first_name");
												setRecord({
													...record,
													first_name: e.target.value,
												});
											}}
										/>
										{validator.getMessage("first_name") !== undefined ? (
											<p className="text-red-500 text-xs italic mb-2">
												{validator.getMessage("first_name")}
											</p>
										) : (
											""
										)}
									</div>
									<div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
										<label
											className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
											htmlFor="last_name"
										>
											Keresztnév*
										</label>
										<input
											className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${
												validator.getMessage("last_name") !== undefined ? "border-red-500" : ""
											} rounded py-3 px-4 mb-2 leading-tight focus:outline-none focus:bg-white`}
											id="last_name"
											type="text"
											placeholder="Keresztnév"
											value={record?.last_name}
											onChange={(e: ChangeEvent<HTMLInputElement>) => {
												validator.showMessageFor("last_name");
												setRecord({
													...record,
													last_name: e.target.value,
												});
											}}
										/>
										{validator.getMessage("last_name") !== undefined ? (
											<p className="text-red-500 text-xs italic mb-2">
												{validator.getMessage("last_name")}
											</p>
										) : (
											""
										)}
									</div>
									<div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
										<label
											className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
											htmlFor="email"
										>
											Email*
										</label>
										<input
											className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${
												validator.getMessage("email") !== undefined ? "border-red-500" : ""
											} rounded py-3 px-4 mb-2 leading-tight focus:outline-none focus:bg-white`}
											id="email"
											placeholder="email@email.hu"
											value={record?.email}
											onChange={(e: ChangeEvent<HTMLInputElement>) => {
												validator.showMessageFor("email");
												setRecord({
													...record,
													email: e.target.value,
												});
											}}
										/>
										{validator.getMessage("email") !== undefined ? (
											<p className="text-red-500 text-xs italic mb-2">
												{validator.getMessage("email")}
											</p>
										) : (
											""
										)}
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
											className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${
												validator.getMessage("adults") !== undefined ? "border-red-500" : ""
											} rounded py-3 px-4 mb-2 leading-tight focus:outline-none focus:bg-white`}
											id="adults"
											type="number"
											min={1}
											value={record?.adults}
											onChange={(e: ChangeEvent<HTMLInputElement>) => {
												validator.showMessageFor("adults");
												setRecord({
													...record,
													adults: toSafeNumber(e.target.value),
												});
											}}
										/>
										{validator.getMessage("adults") !== undefined ? (
											<p className="text-red-500 text-xs italic mb-2">
												{validator.getMessage("adults")}
											</p>
										) : (
											""
										)}
									</div>
									<div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
										<label
											className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
											htmlFor="children"
										>
											Gyerekek (5-12)
										</label>
										<input
											className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${
												validator.getMessage("children") !== undefined ? "border-red-500" : ""
											} rounded py-3 px-4 mb-2 leading-tight focus:outline-none focus:bg-white`}
											id="children"
											type="number"
											min={0}
											value={record?.children}
											onChange={(e: ChangeEvent<HTMLInputElement>) => {
												validator.showMessageFor("children");
												setRecord({
													...record,
													children: toSafeNumber(e.target.value),
												});
											}}
										/>
										{validator.getMessage("children") !== undefined ? (
											<p className="text-red-500 text-xs italic mb-2">
												{validator.getMessage("children")}
											</p>
										) : (
											""
										)}
									</div>
									<div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
										<label
											className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
											htmlFor="infants"
										>
											Gyerekek (0-5)
										</label>
										<input
											className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${
												validator.getMessage("infants") !== undefined ? "border-red-500" : ""
											} rounded py-3 px-4 mb-2 leading-tight focus:outline-none focus:bg-white`}
											id="infants"
											type="number"
											min={0}
											value={record?.infants}
											onChange={(e: ChangeEvent<HTMLInputElement>) => {
												validator.showMessageFor("infants");
												setRecord({
													...record,
													infants: toSafeNumber(e.target.value),
												});
											}}
										/>
										{validator.getMessage("infants") !== undefined ? (
											<p className="text-red-500 text-xs italic mb-2">
												{validator.getMessage("infants")}
											</p>
										) : (
											""
										)}
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
											className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${
												validator.getMessage("participant_names") !== undefined
													? "border-red-500"
													: ""
											} rounded py-3 px-4 mb-2 leading-tight focus:outline-none focus:bg-white`}
											id="participant_names"
											placeholder="Kérjük adja meg az összes résztvevő teljes nevét vesszővel elválasztva"
											value={record?.participant_names}
											onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
												validator.showMessageFor("participant_names");
												setRecord({
													...record,
													participant_names: e.target.value,
												});
											}}
										/>
										{validator.getMessage("participant_names") !== undefined ? (
											<p className="text-red-500 text-xs italic mb-2">
												{validator.getMessage("participant_names")}
											</p>
										) : (
											""
										)}
									</div>
								</div>
								<div className="text-lg mb-6">Allergiákkal kapcsolatos információk</div>
								<div className="md:flex md:items-center mb-6">
									<div>
										<label className="block text-gray-500 font-bold">
											<input
												className="mr-2 leading-tight"
												type="checkbox"
												id="gluten_intolerance"
												checked={record?.gluten_intolerance}
												onChange={(e: ChangeEvent<HTMLInputElement>) => {
													setRecord({
														...record,
														gluten_intolerance: e.target.checked,
													});
												}}
											/>
											<span className="uppercase tracking-wide text-gray-700 text-xs font-bold">
												Van a vendégek között glutén érzékeny?
											</span>
										</label>
									</div>
								</div>
								<div className="md:flex md:items-center mb-6">
									<div>
										<label className="block text-gray-500 font-bold">
											<input
												className="mr-2 leading-tight"
												type="checkbox"
												id="lactose_intolerance"
												checked={record?.lactose_intolerance}
												onChange={(e: ChangeEvent<HTMLInputElement>) => {
													setRecord({
														...record,
														lactose_intolerance: e.target.checked,
													});
												}}
											/>
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
											onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
												setRecord({
													...record,
													other_intolerance: e.target.value,
												});
											}}
										/>
									</div>
								</div>
								<button
									className="flex-shrink-0 bg-green-primary hover:bg-teal-700 border-green-primary hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
									onClick={() => {
										validator.validateAndDispatch(record);
									}}
								>
									Küldés
								</button>
							</div>{" "}
						</>
					)}
				</div>
			</main>
		</Layout>
	);
}
