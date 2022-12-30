export interface RecordVM {
	email: string;
	first_name: string;
	last_name: string;
	infants: number;
	children: number;
	adults: number;
	lactose_intolerance: boolean;
	gluten_intolerance: boolean;
	participant_names: string;
	other_intolerance?: string;
}
