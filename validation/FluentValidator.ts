import { useEffect, useState } from "react";

export type RuleType =
	| "required"
	| "number"
	| "length"
	| "date_after"
	| "date_same_or_after"
	| "date_before"
	| "date_same_or_before"
	| "condition"
	| "max"
	| "min"
	| "email"
	| "in"
	| "not_in"
	| "regex"
	| "not_regex"
	| "not_empty";

interface Rule {
	type: RuleType;
	message: string;
	validate: (value: any) => boolean;
}

type Messages<FN extends string> = { [key in FN]: string };
type MessageResult<FN extends string> = { field: FN; message: string }[];

interface AbstractValidation<FN extends string, VM> {
	validate: (model: VM) => MessageResult<FN>;
}

export class Validation<FN extends string, VM> {
	private field!: FN;
	private selector!: (model: VM) => unknown;
	private rules: Rule[] = [];
	private validator!: Validation<string, unknown>[];
	private condition: (model: VM) => boolean = (_) => true;

	private constructor() {
		// empty
	}

	public static ruleFor = <FN2 extends string, VM2>(field: FN2, selector: (model: VM2) => unknown) => {
		const v = new Validation<FN2, VM2>();
		v.field = field;
		v.selector = selector;
		return v;
	};

	public isRequired = (message?: string) => {
		const rule: Rule = {
			message: message ?? "Kötelező",
			type: "required",
			validate: (value) => value?.toString()?.length > 0,
		};
		this.rules.push(rule);

		return this;
	};

	public max = (max: number, message?: string) => {
		const rule: Rule = {
			message: message ?? `Maximum ${max}`,
			type: "max",
			validate: (value) => {
				if (value?.toString()?.length === 0) {
					return true;
				}

				if (typeof value === "number") {
					return value <= max;
				} else if (Array.isArray(value)) {
					return value.length <= max;
				} else {
					return value?.toString().length <= max;
				}
			},
		};
		this.rules.push(rule);

		return this;
	};

	public min = (min: number, message?: string) => {
		const rule: Rule = {
			message: message ?? `Minimum ${min}`,
			type: "min",
			validate: (value) => {
				if (value?.toString()?.length === 0) {
					return true;
				}

				if (typeof value === "number") {
					return value >= min;
				} else if (Array.isArray(value)) {
					return value.length >= min;
				} else {
					return value?.toString().length >= min;
				}
			},
		};
		this.rules.push(rule);

		return this;
	};

	public notEmpty = (message?: string) => {
		const rule: Rule = {
			message: message ?? "Kötelező",
			type: "not_empty",
			validate: (value) => {
				if (Array.isArray(value)) {
					return value.length > 0;
				} else {
					return value?.toString().length > 0;
				}
			},
		};
		this.rules.push(rule);

		return this;
	};

	public isEmail = (message?: string) => {
		const rule: Rule = {
			message: message ?? "Kérlek adj meg egy valós email címet.",
			type: "email",
			validate: (value) =>
				value.toString().match(/^[A-Z0-9.!#$%&'*+-/=?^_`{|}~]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i) !== null,
		};
		this.rules.push(rule);

		return this;
	};

	public fullfilsValidations = <FN2 extends string, VM2>(validator: Validation<FN2, VM2>[]) => {
		this.validator = validator as Validation<string, unknown>[];

		return this;
	};

	public fullfils = (condition: (val: any) => boolean, message: string) => {
		const rule: Rule = {
			message,
			type: "condition",
			validate: condition,
		};
		this.rules.push(rule);

		return this;
	};

	public when = (condition: (model: VM) => boolean) => {
		this.condition = condition;

		return this;
	};

	public validate = (model: VM): MessageResult<FN> => {
		if (this.condition(model)) {
			const value = this.selector(model);

			for (const rule of this.rules) {
				if (!rule.validate(value)) {
					return [{ field: this.field, message: rule.message }];
				}
			}

			const results: MessageResult<FN> = [];
			if (this.validator) {
				for (const validation of this.validator) {
					const arrValue = value as unknown[];
					let i = 0;
					for (const value2 of arrValue) {
						const results2 = validation.validate(value2) as {
							field: FN;
							message: string;
						}[];
						if (results2.length > 0) {
							for (const res of results2) {
								const field = `${this.field}.${i}.${res.field}`;
								results.push({ field: field as FN, message: res.message });
							}
						}
						i++;
					}
				}
			}

			return results;
		}

		return [];
	};
}

export const useFluentValidator = <FN extends string, VM>(
	validations: AbstractValidation<FN, VM>[],
	dispatcher?: () => void
) => {
	const isValid = () => {
		return Object.keys(messages).length === 0;
	};

	const [messages, setMessages] = useState({} as Messages<string>);
	const [visibleFields, setVisibleFields] = useState([] as FN[]);
	const [allFieldsVisible, setAllFieldsVisible] = useState(false);
	const [dispatchIfValid, setDispatchIfValid] = useState<boolean>(false);

	useEffect(() => {
		if (dispatchIfValid) {
			setDispatchIfValid(false);
			if (isValid() && dispatcher) {
				dispatcher();
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [messages]);

	const validate = (model: VM): boolean => {
		const newMessages = {} as Messages<string>;
		for (const validation of validations) {
			for (const res of validation.validate(model)) {
				newMessages[res.field] = res.message;
			}
		}
		setMessages(newMessages);

		return Object.keys(newMessages).length === 0;
	};

	const validateAndDispatch = (model: VM): void => {
		setDispatchIfValid(true);
		setAllFieldsVisible(true);
		validate(model);
	};

	const getMessage = (field: FN) => {
		if (allFieldsVisible || visibleFields.includes(field)) {
			return messages[field];
		}

		return undefined;
	};

	const showMessageFor = (field: FN) => {
		if (!visibleFields.includes(field)) {
			setVisibleFields(visibleFields.concat(field));
		}
	};

	const clear = () => {
		setVisibleFields([]);
		setAllFieldsVisible(false);
	};

	return {
		getMessage,
		messages,
		validate,
		validateAndDispatch,
		showMessageFor,
		clear,
	};
};
