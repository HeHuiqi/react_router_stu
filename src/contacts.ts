import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";
import HqContact from "./types";

//设置数据库的名称
localforage.config({ name: "hqdb" })
export async function getContacts(query: string | null) {
    await fakeNetwork(`getContacts:${query}`);
    let contacts = await localforage.getItem("contacts") as Array<HqContact>;
    if (!contacts) contacts = [] || undefined;
    if (query) {
        contacts = matchSorter(contacts, query, { keys: ["first", "last"] }) || undefined;
    }
    return contacts.sort(sortBy("last", "createdAt"));
}

export async function createContact() {
    await fakeNetwork('');
    let id = Math.random().toString(36).substring(2, 9);
    let contact: HqContact = {
        id,
        // first: "H",
        // last: "HQ",
        // avatar: "https://so1.360tres.com/t019b2963514701d697.jpg",
        // twitter: "HQ handle",
        // notes: "Some notes",
        // favorite: true,
        createdAt: Date.now()
    };
    let contacts = await getContacts('');
    contacts.unshift(contact);
    await set(contacts);
    return contact;
}

export async function getContact(id?: string) {
    await fakeNetwork(`contact:${id}`);
    let contacts = await localforage.getItem("contacts") as Array<HqContact>;
    let contact = contacts.find(contact => contact.id === id);
    return contact ?? null;
}

export async function updateContact(id: string, updates: any) {
    await fakeNetwork('');
    let contacts = await localforage.getItem("contacts") as Array<HqContact>;
    let contact = contacts.find(contact => contact.id === id);
    if (!contact) throw new Error(`No contact found for ${id}`);
    Object.assign(contact, updates);
    await set(contacts);
    return contact;
}

export async function deleteContact(id: string) {
    let contacts = await localforage.getItem("contacts") as Array<HqContact>;
    let index = contacts.findIndex(contact => contact.id === id);
    if (index > -1) {
        contacts.splice(index, 1);
        await set(contacts);
        return true;
    }
    return false;
}

function set(contacts: Array<HqContact>) {
    return localforage.setItem("contacts", contacts);
}

// fake a cache so we don't slow down stuff we've already seen
let fakeCache = new Map<string, Boolean>();

async function fakeNetwork(key: string) {
    if (!key) {
        fakeCache = new Map<string, Boolean>();
    }

    if (fakeCache.get(key)) {
        return;
    }
    fakeCache.set(key, true);
    return new Promise(res => {
        setTimeout(res, Math.random() * 200);
    });
}