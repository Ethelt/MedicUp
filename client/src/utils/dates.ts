import { format } from "date-fns";
import { pl } from "date-fns/locale";

export const formatVisitDateRange = (start: Date, end: Date) => {
  return (
    format(start, "EEEE, d MMMM, HH:mm", { locale: pl }) +
    " - " +
    format(end, "HH:mm", { locale: pl })
  );
};
