export const getFormattedDateString = function (
  date: Date = new Date()
): string {
  return (
    `${date.getFullYear()}_` +
    `${String(date.getMonth() + 1).padStart(2, "0")}_` +
    `${String(date.getDate()).padStart(2, "0")}_` +
    `${String(date.getHours()).padStart(2, "0")}_` +
    `${String(date.getMinutes()).padStart(2, "0")}_` +
    `${String(date.getSeconds()).padStart(2, "0")}`
  );
};
