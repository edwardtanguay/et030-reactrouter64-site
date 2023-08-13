import { redirect } from "react-router-dom";
import { deleteContact } from "../contacts";
import { IParamProps } from "../interfaces";

export async function action({ params }: IParamProps) {
	throw new Error('went wrong');
	await deleteContact(params.contactId);
	return redirect('/');
}