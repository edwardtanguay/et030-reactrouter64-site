import { Form, NavLink, Outlet, redirect, useLoaderData, useNavigate, useNavigation, useSubmit } from "react-router-dom";
import { createContact, getContacts } from '../contacts';
import { IContactsLoaderData, IRequestProps } from "../interfaces";
import { useEffect } from "react";

export async function loader({ request }: IRequestProps): Promise<IContactsLoaderData> {
	const url = new URL(request.url);
	const q = url.searchParams.get('q');
	if (q) {
		const contacts = await getContacts(q);
		return { contacts, q };
	} else {
		const contacts = await getContacts();
		return { contacts, q };
	}
}

export async function action() {
	const contact = await createContact();
	return redirect(`/contacts/${contact.id}/edit`);
}

export default function Root() {
	let { contacts, q } = useLoaderData() as IContactsLoaderData;
	if (q === null) {
		q = '';
	}
	const navigation = useNavigation();
	const navigate = useNavigate();
	const submit = useSubmit();

	useEffect(() => {
		const _elem = document.querySelector<HTMLInputElement>('q');
		if (_elem) {
			const elem = _elem;
			elem.value = q !== null ? q : '';
		}
	}, [q]);

	return (
		<>
			<div id="sidebar">
				<h1 onClick={() => navigate('/')}>React Router Contacts</h1>
				<div>
					<Form id="search-form" role="search">
						<input
							id="q"
							aria-label="Search contacts"
							placeholder="Search"
							type="search"
							name="q"
							defaultValue={q}
							onChange={(e) => {
								submit(e.currentTarget.form);
							}}
						/>
						<div
							id="search-spinner"
							aria-hidden
							hidden={true}
						/>
						<div
							className="sr-only"
							aria-live="polite"
						></div>
					</Form>
					<Form method="post">
						<button type="submit">New</button>
					</Form>
				</div>
				<nav>
					{contacts.length ? (
						<ul>
							{contacts.map((contact) => (
								<li key={contact.id}>
									<NavLink
										to={`contacts/${contact.id}`}
										className={({ isActive, isPending }) =>
											isActive ? 'active' : isPending ? 'pending' : ''}
									>
										{contact.first || contact.last ? (
											<>
												{contact.first} {contact.last}
											</>
										) : (
											<i>No Name</i>
										)}{" "}
										{contact.favorite && <span>★</span>}
									</NavLink>
								</li>
							))}
						</ul>
					) : (
						<p>
							<i>No contacts</i>
						</p>
					)}
				</nav>
			</div>
			<div id="detail"
				className={
					navigation.state === 'loading' ? 'loading' : ''
				}
			>
				<Outlet />
			</div>
		</>
	);
}