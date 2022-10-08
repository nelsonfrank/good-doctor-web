import { defineAbility } from "@casl/ability";
import { Ability, MongoQuery } from "@casl/ability";

// types
export type Actions = "manage" | "create" | "read" | "update" | "delete";

export type Subjects =
  | "Expense"
  | "all"
  | "Receipt"
  | "Deposit"
  | "Leases"
  | "Company"
  | "Bank"
  | "Category";

export type Conditions = MongoQuery;

export type AppAbility = Ability<[Actions, Subjects]>;

export interface IUserType {
  _id: string;
  role: string;
}
// Constants
const ROLES = {
  Admin: "administrator",
  Accountant: "accountant",
  RegionalManager: "Regional Manager",
  PropertyManager: "Property Manager",
};

export const MODEL_NAMES = { NOTE: "Note", USER: "User" };

export default function defineAbilitiesFor(user: any | null) {
  return defineAbility<AppAbility>((can) => {
    if (user) {
      if (user.role === ROLES.Admin || user.role === ROLES.Accountant) {
        can("manage", "all");
        can("create", "Company");
      }

      if (
        user.role === ROLES.RegionalManager ||
        user.role === ROLES.PropertyManager
      ) {
        can("create", "Expense");
        can("create", "Receipt");
        can("create", "Deposit");
        can("read", "Leases");
      }
    }
  });
}

export function updateAbility(ability: any, user: any) {
  const rules = defineAbilitiesFor(user);
  ability.update(rules);
}