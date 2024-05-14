import { format } from "date-fns";

export const getFormattedDate = date => {
  const inputDate = new Date(date);
  const formattedDate = format(inputDate, "MMMM dd, yyyy");

  return formattedDate;
};
