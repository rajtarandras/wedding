import { NextApiHandler } from "next";
import { RecordVM } from "../../../models/record";
import { getXataClient } from "../../../xata";

const handler: NextApiHandler = async (req, res) => {
	const xata = getXataClient();
	debugger;
	const data: RecordVM = JSON.parse(req.body);
	const feedback = await xata.db.participations.create({
		...data,
	});

	res.status(201).json({
		feedback: feedback,
	});
};
export default handler;
