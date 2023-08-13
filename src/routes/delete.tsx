import { redirect } from "react-router-dom";
import { deleteContact } from "../contacts";
import { IParamProps } from "../interfaces";

export async function action({ params }: IParamProps) {
	await deleteContact(params.contactId);
	return redirect('/');
}