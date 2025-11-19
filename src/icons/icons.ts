export type IconsId =
  | "web"
  | "targeted-search"
  | "search"
  | "mail"
  | "forward"
  | "flash";

export type IconsKey =
  | "Web"
  | "TargetedSearch"
  | "Search"
  | "Mail"
  | "Forward"
  | "Flash";

export enum Icons {
  Web = "web",
  TargetedSearch = "targeted-search",
  Search = "search",
  Mail = "mail",
  Forward = "forward",
  Flash = "flash",
}

export const ICONS_CODEPOINTS: { [key in Icons]: string } = {
  [Icons.Web]: "61697",
  [Icons.TargetedSearch]: "61698",
  [Icons.Search]: "61699",
  [Icons.Mail]: "61700",
  [Icons.Forward]: "61701",
  [Icons.Flash]: "61702",
};
