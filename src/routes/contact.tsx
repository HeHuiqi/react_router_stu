import {
    Form, useLoaderData,
    useFetcher,

} from "react-router-dom";
import { getContact, updateContact } from "../contacts";
import HqContact from "../types";

export async function loader({ params }: { params: any }) {
    // console.log("params:", params)
    const contact = await getContact(params.contactId);
    if (!contact) {
        throw new Response("", {
            status: 404,
            statusText: "Not Found",
        });
    }
    return { contact };
}

export async function action({ request, params }: { request: any, params: any }) {
    let formData = await request.formData();
    return updateContact(params.contactId, {
        favorite: formData.get("favorite") === "true",
    });
}
export default function Contact() {
    const { contact } = useLoaderData() as any;
    // const contact: HqContact = {
    //     first: "Your",
    //     last: "Name",
    //     avatar: "https://so1.360tres.com/t019b2963514701d697.jpg",
    //     twitter: "your_handle",
    //     notes: "Some notes",
    //     favorite: true,
    //     id: ""
    // };

    return (
        <div id="contact">
            <div>
                <img
                    key={contact?.avatar}
                    src={contact?.avatar}
                    alt="avatar"
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

                {contact?.twitter && (
                    <p>
                        <a
                            target="_blank"
                            rel="noreferrer"
                            href={`https://twitter.com/${contact?.twitter}`}
                        >
                            {contact.twitter}
                        </a>
                    </p>
                )}

                {contact?.notes && <p>{contact.notes}</p>}

                <div>
                    <Form action="edit">
                        <button type="submit">Edit</button>
                    </Form>
                    <Form
                        method="post"
                        action="destroy"
                        onSubmit={(event) => {
                            if (!window.confirm("确定删除这个记录吗？")) {
                                event.preventDefault();
                            }
                        }}
                    >
                        <button type="submit">Delete</button>
                    </Form>
                </div>
            </div>
        </div >
    );
}

function Favorite({ contact }: { contact: HqContact }) {
    const fetcher = useFetcher();

    let favorite = contact.favorite;
    if (fetcher.formData) {
        favorite = fetcher.formData.get("favorite") === "true";
    }
    return (
        <fetcher.Form method="post">
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
        </fetcher.Form>
    );
}