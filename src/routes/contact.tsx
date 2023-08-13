import { Form, useFetcher, useLoaderData } from "react-router-dom";
import { IActionProps, IContactLoaderData, IFavoriteProps, IParamProps } from "../interfaces";
import { getContact, updateContactFavorite } from "../contacts";

export async function action({ request, params } : IActionProps) {
  let formData = await request.formData();
  return updateContactFavorite(params.contactId, formData.get("favorite") === "true");
}

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
								action="delete"
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
	const fetcher = useFetcher();
	let favorite = contact.favorite;
	if (fetcher.formData) {
		favorite = fetcher.formData.get("favorite") === 'true';
	}

	return (
		<fetcher.Form method="post">
			<button
				name="favorite"
				className="favoriteButton"
				value={favorite ? "false" : "true"}
				aria-label={
					favorite
						? "Remove from favorites"
						: "Add to favorites"
				}
			>
				{favorite ? "★" : "☆"}
			</button>
		</fetcher.Form>
	);
}