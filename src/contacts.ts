import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";
import { IContact, IDataContact } from "./interfaces";
import rawEmployees from './originalData/rawEmployees.json';

export async function getContacts(query: string = '') {
	await fakeNetwork(`getContacts:${query}`);
	let contacts: IContact[] | null = await localforage.getItem("contacts");
	if (!contacts) contacts = [];
	if (query) {
		contacts = matchSorter(contacts, query, { keys: ["first", "last"] });
	}
	return contacts.sort(sortBy("last", "createdAt"));
}

export async function createSpecificContact(dataContact: IDataContact) {
	await fakeNetwork();
	const contact: IContact = {
		id: Math.random().toString(36).substring(2, 9),
		createdAt: Date.now(),
		...dataContact
	}
	let contacts = await getContacts();
	contacts.unshift(contact);
	await set(contacts);
	return contact;
}

export async function fillWithInitialContacts() {
	const _contacts = [];
	for (const rawEmployee of rawEmployees) {
		const _contact: IContact = {
			id: Math.random().toString(36).substring(2, 9),
			createdAt: Date.now(),
			first: rawEmployee.firstName,
			last: rawEmployee.lastName,
			avatar: `https://edwardtanguay.vercel.app/share/images/employees/employee_${rawEmployee.employeeID}.jpg`,
			twitter: 'https://twitter.com/' + Math.random().toString(36).substring(2, 10),
			notes: rawEmployee.notes,
			favorite: false
		}
		_contacts.unshift(_contact);
	}
	await set(_contacts);
}

export async function createContact() {
	await fakeNetwork();
	let id = Math.random().toString(36).substring(2, 9);
	let contact: IContact = { id, createdAt: Date.now(), first: '', last: '', avatar: '', twitter: '', notes: '', favorite: false };
	let contacts = await getContacts();
	contacts.unshift(contact);
	await set(contacts);
	return contact;
}

export async function getContact(id: string) {
	await fakeNetwork(`contact:${id}`);
	let contacts: IContact[] | null = await localforage.getItem("contacts");
	let contact = contacts?.find(contact => contact.id === id);
	return contact ?? null;
}

export async function updateContact(id: string, updatedContact: IContact) {
	await fakeNetwork();
	let contacts: IContact[] | null = await localforage.getItem("contacts");
	let contact = contacts?.find(contact => contact.id === id);
	if (!contact) throw new Error(`No contact found for ${id}`);
	Object.assign(contact, updatedContact);
	await set(contacts);
	return contact;
}

export async function updateContactFavorite(id: string, favorite: boolean) {
	await fakeNetwork();
	let contacts: IContact[] | null = await localforage.getItem("contacts");
	let contact = contacts?.find(contact => contact.id === id);
	if (!contact) throw new Error(`No contact found for ${id}`);
	const _contact = { ...contact };
	_contact.favorite = favorite;
	Object.assign(contact, _contact);
	await set(contacts);
	return contact;
}

export async function deleteContact(id: string) {
	const contacts: IContact[] | null = await localforage.getItem("contacts");
	const keepContacts = contacts?.filter(m => m.id !== id);
	if (keepContacts) {
		await set(keepContacts);
		return true;
	} else {
		return false;
	}
}

function set(contacts: IContact[] | null) {
	return localforage.setItem("contacts", contacts);
}

// fake a cache so we don't slow down stuff we've already seen
let fakeCache: any = {};

async function fakeNetwork(key: string = '') {
	if (!key) {
		fakeCache = {};
	}

	if (fakeCache[key]) {
		return;
	}

	fakeCache[key] = true;
	return new Promise(res => {
		setTimeout(res, Math.random() * 800);
	});
}
