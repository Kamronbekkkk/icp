import { Home, User, Search, ShoppingCart, Mail, Wrench } from "lucide-react";
import { LucideProps } from "lucide-react";
import { ComponentType } from "react";

export type IconComponent = ComponentType<LucideProps>;

export const iconMap: Record<string, IconComponent> = {
  home: Home,
  user: User,
  search: Search,
  cart: ShoppingCart,
  mail: Mail,

  // default icon agar topilmasa
  default: Wrench,
};
