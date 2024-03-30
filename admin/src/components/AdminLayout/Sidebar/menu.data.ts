import {
  FolderTreeIcon,
  ShieldCheck,
  TreesIcon,
  UsersRound,
  WarehouseIcon,
} from "lucide-react";
import { IMenuItem } from "./menu.interface";
import { ADMIN_PAGES } from "@/config/pages-url.config";

export const MENU: IMenuItem[] = [
  {
    icon: WarehouseIcon,
    name: "Склады",
    link: ADMIN_PAGES.STOCKS,
  },
  {
    icon: FolderTreeIcon,
    name: "Категории",
    link: ADMIN_PAGES.CATEGORY,
  },
  {
    icon: TreesIcon,
    name: "Товары",
    link: ADMIN_PAGES.PRODUCT,
  },
  {
    icon: UsersRound,
    name: "Клиенты",
    link: ADMIN_PAGES.TIMER,
  },
  {
    icon: ShieldCheck,
    name: "Администраторы",
    link: ADMIN_PAGES.TIME_BLOCKING,
  },
];
