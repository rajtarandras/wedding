import { NextApiHandler } from "next";
import { RecordVM } from "../../../models/record";
import { getXataClient } from "../../../xata";

const handler: NextApiHandler = async (req, res) => {
	const xata = getXataClient();
	const { id } = req.body;
	const data: RecordVM = JSON.parse(req.body);
	const feedback = await xata.db.participations.update({ id, ...data });
	res.status(200).json({
		feedback: feedback,
	});
};
export default handler;
