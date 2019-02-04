export const transformDate = (date) => {
  let options = {year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit"};
  options.timeZone = "UTC";
  return (new Date(date)).toLocaleString(navigator.language, options);
};
