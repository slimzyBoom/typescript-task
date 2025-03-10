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

type FilterCriteria<T extends Person> = Partial<Omit<T, "type">>;

function filterPersons<T extends Person>(
  persons: Person[],
  personType: T["type"],
  criteria: FilterCriteria<T>,
): T[] {
  return persons.filter(
    (person): person is T =>
      person.type === personType &&
      Object.entries(criteria).every(([key, value]) => 
        (person as any)[key] === value
      )
  ) as T[];
}

// Example usage:
const persons: Person[] = [
  { type: "user", name: "Alice", age: 25 },
  { type: "admin", name: "Bob", role: "superadmin" },
  { type: "user", name: "Charlie", age: 30 },
];

const users = filterPersons(persons, "user", { age: 25 }); // User[]
const admins = filterPersons(persons, "admin", { role: "superadmin" }); // Admin[]

console.log("Users:", users);
console.log("Admins:", admins);