import { Form, useLoaderData } from "react-router-dom";
import { IContact, IContactLoaderData, IFavoriteProps, IParamProps } from "../interfaces";
import { getContact } from "../contacts";

export async function loader({ params }: IParamProps): Promise<IContactLoaderData> {
	const contact = await getContact(params.contactId);
	return { contact };
}

export default function Contact() {
	const { contact } = useLoaderData() as IContactLoaderData;

	return (
		<div id="contact">
			{contact && (
				<>
					<div>
						<img
							key={contact.avatar}
							src={contact.avatar}
						/>
					</div>

					<div>
						<h1>
							{contact.first || contact.last ? (
								<>
									{contact.first} {contact.last}
								</>
							) : (
								<i>No Name</i>
							)}{" "}
							<Favorite contact={contact} />
						</h1>

						{contact.twitter && (
							<p>
								<a
									target="_blank"
									href={`https://twitter.com/${contact.twitter}`}
								>
									{contact.twitter}
								</a>
							</p>
						)}

						{contact.notes && <p>{contact.notes}</p>}

						<div>
							<Form action="edit">
								<button type="submit">Edit</button>
							</Form>
							<Form
								method="post"
								action="destroy"
								onSubmit={(event) => {
									if (
										!confirm(
											"Please confirm you want to delete this record."
										)
									) {
										event.preventDefault();
									}
								}}
							>
								<button type="submit">Delete</button>
							</Form>
						</div>
					</div>
				</>
			)}
		</div>
	);

}

function Favorite({ contact }: IFavoriteProps) {
	// yes, this is a `let` for later
	let favorite = contact.favorite;
	return (
		<Form method="post">
			<button
				name="favorite"
				value={favorite ? "false" : "true"}
				aria-label={
					favorite
						? "Remove from favorites"
						: "Add to favorites"
				}
			>
				{favorite ? "★" : "☆"}
			</button>
		</Form>
	);
}