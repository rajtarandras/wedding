import { NextApiHandler } from "next";
import { getXataClient } from "../../../xata";

const handler: NextApiHandler = async (req, res) => {
	const xata = getXataClient();
	const { id } = req.body;
	const feedback = await xata.db.participations.filter({ id }).getFirst();

	return res.status(200).json({
		feedback: feedback,
	});
};
export default handler;
