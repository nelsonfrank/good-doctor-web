export const formatDateString = (date: string) => {
  const newDate = new Date(date);

  return newDate.toLocaleDateString("en-GB", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export function excludePrismaFields<IUser, Key extends keyof IUser>(
  user: IUser,
  ...keys: Key[]
): Omit<IUser, Key> {
  // eslint-disable-next-line prefer-const
  for (let key of keys) {
    delete user[key];
  }
  return user;
}
