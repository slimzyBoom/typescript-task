type User = {
  type: "user";
  name: string;
  age: number;
};

type Admin = {
  type: "admin";
  name: string;
  role: string;
};

type Person = User | Admin;

type FilterCriteria<T> = Partial<Omit<T, "type">>;

function filterPersons<T extends "user" | "admin">(
  persons: Person[],
  personType: T,
  criteria: FilterCriteria<T extends "user" ? User : Admin>,
): T extends "user" ? User[] : Admin[] {
  return persons.filter(
    (person): person is T extends "user" ? User : Admin =>
      person.type === personType &&
      Object.entries(criteria).every(
        ([key, value]) => (person as any)[key] === value,
      ),
  ) as any;
}

// Example usage:
const persons: Person[] = [
  { type: "user", name: "Alice", age: 25 },
  { type: "admin", name: "Bob", role: "superadmin" },
  { type: "user", name: "Charlie", age: 30 },
];

const users = filterPersons(persons, "user", { age: 25 }); // Should return User[]
const admins = filterPersons(persons, "admin", { role: "superadmin" }); // Should return Admin[]
console.log(`Users: ${JSON.stringify(users, null, 2)}`)
console.log(`Admins: ${JSON.stringify(admins, null, 2)}`)
