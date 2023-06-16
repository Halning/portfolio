// 1

const ggg = { min: 1, max: 2 };
function parasha(source: typeof ggg) {
  return source.max;
} // take inferred type of ggg: { min: 1, max: 2 }

// 2

type status = "active" | "pending" | "complete"; // It will not goes to bundle
// instead of

enum Status {
  Active = "active",
  Pending = "pending",
  Complete = "complete"
}

// 3

function getValue<T, U extends keyof T>(source: T, property: U) {
  return source[property];
}

getValue(ggg, "min");


// 4 index types

interface Address {
  id: number;
  state: string;
}
interface Contact {
  id: number;
  address: Address;
}

type Awesome = Contact["address"]["state"];

interface ContactEvent {
  contactId: Awesome; // tie "id" type to contactId or "state" from address
}


// 5 map types

interface Parasha2<Tprop> {
  id: number,
  login: string;
  handle: (val: Tprop) => void;
}

interface Parasha {
  id: string,
  name: string;
  code: number;
}

type Parasha1 = {
  [Tprop in keyof Parasha]?: Parasha2<Parasha[Tprop]>;
}

const parashaGGG: Parasha1 = {
  code: {
    id: 1,
    login: 'US',
    handle: (val: number) => {} // code from Parasha and val is number
  }
}
