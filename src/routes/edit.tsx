import { Form, useLoaderData, redirect, useNavigate } from "react-router-dom";
import HqContact from "../types";
import { updateContact } from "../contacts";

export async function action({ request, params }: { request: any, params: any }) {
    const formData = await request.formData();
    //通过设置input标签的name属性即可获取其值
    const firstName = formData.get("first");
    const lastName = formData.get("last");
    console.log('firstName:', firstName)
    console.log('lastName:', lastName)


    const updates = Object.fromEntries(formData) as Array<HqContact>;
    await updateContact(params.contactId, updates);
    return redirect(`/contacts/${params.contactId}`);
}

export default function EditContact() {
    const { contact } = useLoaderData() as { contact: HqContact };
    const navigate = useNavigate();

    return (
        <Form method="post" id="contact-form">
            <p>
                <span>Name</span>
                <input
                    placeholder="First"
                    aria-label="First name"
                    type="text"
                    name="first"
                    defaultValue={contact?.first}
                />
                <input
                    placeholder="Last"
                    aria-label="Last name"
                    type="text"
                    name="last"
                    defaultValue={contact?.last}
                />
            </p>
            <label>
                <span>Twitter</span>
                <input
                    type="text"
                    name="twitter"
                    placeholder="@jack"
                    defaultValue={contact?.twitter}
                />
            </label>
            <label>
                <span>Avatar URL</span>
                <input
                    placeholder="https://example.com/avatar.jpg"
                    aria-label="Avatar URL"
                    type="text"
                    name="avatar"
                    defaultValue={contact?.avatar}
                />
            </label>
            <label>
                <span>Notes</span>
                <textarea
                    name="notes"
                    defaultValue={contact?.notes}
                    rows={6}
                />
            </label>
            <p>
                <button type="submit">Save</button>
                <button type="button" onClick={() => {
                    navigate(-1);
                }}>Cancel</button>
            </p>
        </Form>
    );
}