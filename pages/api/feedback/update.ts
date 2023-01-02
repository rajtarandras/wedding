import { NextApiHandler } from "next";
import { getXataClient } from "../../../xata";

const handler: NextApiHandler = async (req, res) => {
	const xata = getXataClient();
	const {
		id,
		email,
		first_name,
		last_name,
		infants,
		children,
		adults,
		lactose_intolerance,
		gluten_intolerance,
		participant_names,
		other_intolerance,
	} = req.body;

	const feedback = await xata.db.participations.update(id, {
		email: email,
		first_name: first_name,
		last_name: last_name,
		infants: infants,
		children: children,
		adults: adults,
		lactose_intolerance: lactose_intolerance,
		gluten_intolerance: gluten_intolerance,
		participant_names: participant_names,
		other_intolerance: other_intolerance,
	});

	res.status(200).json({
		feedback: feedback,
	});
};
export default handler;
