import { pathnames } from "@/lib/navigation";

type MenuType =
  | {
      name: string;
      icon: string;
      isUrl: true;
      url: keyof typeof pathnames;
    }
  | {
      name: string;
      icon: string;
      isUrl: false;
      url?: never; // The url property is not allowed when isUrl is false
    };

export const menus: MenuType[] = [
  {
    name: "home",
    icon: "home",
    isUrl: true,
    url: "/",
  },
  {
    name: "account",
    icon: "user",
    isUrl: true,
    url: "/account",
  },
  {
    name: "transactions",
    icon: "cash",
    isUrl: true,
    url: "/transactions",
  },
  {
    name: "products",
    icon: "box-seam",
    isUrl: true,
    url: "/products",
  },
  {
    name: "reports",
    icon: "report",
    isUrl: true,
    url: "/reports",
  },
];
