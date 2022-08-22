export const currency = (amount = 0) =>
  `$${(+amount).toFixed(2).replace(/(\d)(?=(\d{3})+\b)/g, "$1,")}`;

export const pluralize = (text = "", count = 1, suffix = "s") =>
  `${text}${count === 1 ? "" : suffix}`;
