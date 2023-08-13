import { fillWithInitialContacts, getContacts } from "../contacts";
import { IContactsLoaderData } from "../interfaces";

export async function loader(): Promise<IContactsLoaderData> {
	const contacts = await getContacts();
	return { contacts };
}

export default function Index() {

	(async () => {
		const { contacts } = await loader();
		if (contacts.length === 0) {
			// const _contact:IDataContact = { first: 'fff', last: 'lll', avatar: 'aaa', twitter: '', notes: '', favorite: false };
			// const contact = await createSpecificContact(_contact);
			await fillWithInitialContacts();
			alert(`initial contacts created, please refresh browser`);
		}
	})();

	return (
		<p id="zero-state">
			This is a demo for React Router.
			<br />
			Check out{" "}
			<a href="https://reactrouter.com">
				the docs at reactrouter.com
			</a>
			.
		</p>
	);
}