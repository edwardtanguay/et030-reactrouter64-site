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
		<>
			<p id="zero-state">React Router Contacts</p>
			<section className="introMessage">
				<p>The data for this site is stored in the Indexed DB database in your browser.</p>
				<p>If there are no contacts present when this page loads, the database will be filled with nine initial contacts.</p>
				<p>This site is a demonstration of React Router 6.4 with its new syntax and features such as dataloading.</p>
				<p>If you want to create this site yourself, check out:</p>
				<ul>
					<li>the <a href="https://reactrouter.com/en/main/start/tutorial">original tutorial</a> at reactrouter.com (JavaScript)</li>
					<li>Edward's foray <a href="https://tanguay-eu.vercel.app/forays/276">Implement new data-loading features of React Router 6.4 in a test site</a> (TypeScript)</li>
				</ul>
			</section>
		</>
	);
}