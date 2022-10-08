export const formatDateString = (date: string) => {
  const newDate = new Date(date);

  return newDate.toLocaleDateString("en-GB", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
