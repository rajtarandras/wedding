import { NextApiHandler } from "next";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { database } from "../../firebaseConfig";
import { setCookie } from "cookies-next";

const handler: NextApiHandler = async (req, res) => {
	const dbInstance = collection(database, "participations");

	const { id } = req.body;

	if (id) {
		const collectionById = doc(database, "participations", id);
		await updateDoc(collectionById, {
			email: req.body.email,
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			infants: req.body.infants,
			children: req.body.children,
			adults: req.body.adults,
			lactose_intolerance: req.body.lactose_intolerance,
			gluten_intolerance: req.body.gluten_intolerance,
			participant_names: req.body.participant_names,
			other_intolerance: req.body.other_intolerance,
		});

		res.status(200).json(req.body);
	} else {
		const resp = await addDoc(dbInstance, {
			email: req.body.email,
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			infants: req.body.infants,
			children: req.body.children,
			adults: req.body.adults,
			lactose_intolerance: req.body.lactose_intolerance,
			gluten_intolerance: req.body.gluten_intolerance,
			participant_names: req.body.participant_names,
			other_intolerance: req.body.other_intolerance,
		});

		setCookie("part_id", resp.id);

		res.status(200).json(req.body);
	}
};

export default handler;
