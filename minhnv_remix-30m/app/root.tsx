import {
    Form,
    json,
    // Link,
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    useLoaderData,
    redirect,
    NavLink,
    useNavigation,
    useSubmit,
    useFetcher,
} from "@remix-run/react";
import appStylesHref from "./app.css?url";
import { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import { getContacts, createEmptyContact } from "./data";
import { useEffect, useState } from "react";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: appStylesHref }];

export const loader = async ({ request }: LoaderFunctionArgs) => {
    const url = new URL(request.url);
    const q = url.searchParams.get("q");

    const contacts = await getContacts(q);
    return json({ contacts, q });
};

export const action = async () => {
    const contact = await createEmptyContact();
    // return json({ contact });
    return redirect(`/contacts/${contact.id}/edit`);
};

export default function App() {
    const fetcher = useFetcher();
    const navigation = useNavigation();
    const { contacts, q } = useLoaderData<typeof loader>();
    const [query, setQuery] = useState(q || "");
    const submit = useSubmit();

    const searching = navigation.location && new URLSearchParams(navigation.location.search).has("q");

    useEffect(() => {
        setQuery(q || "");
    }, [q]);

    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <Meta />
                <Links />
            </head>
            <body>
                <div id="sidebar">
                    <h1>Remix Contacts</h1>
                    <div>
                        <fetcher.Form id="search-form" role="search" onChange={(event) => submit(event.currentTarget)}>
                            <input
                                className={searching ? "loading" : ""}
                                value={query}
                                onChange={(event) => {
                                    const isFirstSearch = q === null;
                                    submit(event.currentTarget, {
                                        replace: !isFirstSearch,
                                    });
                                    setQuery(event.currentTarget.value);
                                }}
                                defaultValue={q || ""}
                                id="q"
                                aria-label="Search contacts"
                                placeholder="Search"
                                type="search"
                                name="q"
                            />
                            <div id="search-spinner" aria-hidden hidden={!searching} />
                        </fetcher.Form>
                        <Form method="post">
                            <button type="submit">New</button>
                        </Form>
                    </div>
                    <nav>
                        {contacts.length ? (
                            <ul>
                                {contacts.map((contact) => (
                                    <li key={contact.id}>
                                        <NavLink to={`contacts/${contact.id}`}>
                                            {contact.first || contact.last ? (
                                                <>
                                                    {contact.first} {contact.last}
                                                </>
                                            ) : (
                                                <i>No Name</i>
                                            )}{" "}
                                            {contact.favorite ? <span>★</span> : null}
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

                <div className={navigation.state === "loading" && !searching ? "loading" : ""} id="detail">
                    <Outlet />
                </div>

                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    );
}
