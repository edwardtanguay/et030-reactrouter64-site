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
			await fillWithInitialContacts();
				window.location.href = "/";
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