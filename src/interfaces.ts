export interface IContact {
	id: string;
	createdAt: number;
	first: string;
	last: string;
	avatar: string;
	twitter: string;
	notes: string;
	favorite: boolean;
}

export interface IContactLoaderData {
	contact: IContact | null;
}

export interface IContactsLoaderData {
	contacts: IContact[];
}

export interface IFavoriteProps {
	contact: IContact;
}

export interface IParamProps {
	params: any;
}

export interface IActionProps {
	params: any;
	request: any;
}

export interface IAction {
	Response: any;
}