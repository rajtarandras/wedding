import { NextApiHandler } from "next";
import { getXataClient } from "../../../xata";

const handler: NextApiHandler = async (req, res) => {
	const xata = getXataClient();
	const feedbacks = await xata.db.participations.getMany();

	res.status(200).json({
		feedbacks: feedbacks,
	});
};
export default handler;
