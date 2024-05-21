import {
    Form,
    Outlet, useLoaderData, redirect, NavLink,
    useNavigation,
    useSubmit
} from "react-router-dom";
import { getContacts, createContact } from "../contacts";

import HqContact from "../types";
import { useEffect } from "react";

export async function loader({ request }: { request: any }) {
    const url = new URL(request.url);
    const q = url.searchParams.get("q");
    const contacts = await getContacts(q);
    return { contacts, q };
}
export async function action() {
    const contact = await createContact();
    // return { contact };
    return redirect(`/contacts/${contact.id}/edit`);

}
export default function Root() {
    //获取loader中请求的数据
    let { contacts, q } = useLoaderData() as { contacts: Array<HqContact>, q: any };
    const navigation = useNavigation();
    const submit = useSubmit();
    const searching =
        navigation.location &&
        new URLSearchParams(navigation.location.search).has(
            "q"
        );

    useEffect(() => {

        let iq = window.document.getElementById('q') as HTMLInputElement
        if (iq != null) {
            iq.value = q
        }

    }, [q]);


    return (
        <>
            <div id="sidebar">
                <h1>React Router Contacts Demo</h1>
                <div>
                    <form id="search-form" role="search">
                        <input
                            id="q"
                            className={searching ? "loading" : ""}
                            aria-label="Search contacts"
                            placeholder="Search"
                            type="search"
                            name="q"
                            defaultValue={q}
                            onChange={(event) => {
                                const isFirstSearch = q == null;
                                submit(event.currentTarget.form, {
                                    replace: !isFirstSearch,
                                })
                            }}
                        />
                        <div
                            id="search-spinner"
                            aria-hidden
                            hidden={!searching}
                        />
                        <div
                            className="sr-only"
                            aria-live="polite"
                        ></div>
                    </form>
                    {/* 这里submit 回触发 配置的 action */}
                    <Form method="post">
                        <button type="submit">New</button>
                    </Form>
                </div>
                <nav>
                    {contacts.length ? (
                        <ul>
                            {contacts.map((contact: HqContact) => (
                                <li key={contact.id}>
                                    <NavLink
                                        to={`contacts/${contact.id}`}
                                        className={({ isActive, isPending }) =>
                                            isActive
                                                ? "active"
                                                : isPending
                                                    ? "pending"
                                                    : ""
                                        }

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
                    navigation.state === "loading" ? "loading" : ""
                }
            >
                <Outlet></Outlet>
            </div>
        </>
    );
}