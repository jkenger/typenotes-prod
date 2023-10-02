export function formatDate(date: string | Date = "1997-01-01") {
  return new Intl.DateTimeFormat("en-US").format(new Date(date));
}
