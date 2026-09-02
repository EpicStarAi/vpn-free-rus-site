import type { Metadata } from "next";
import { EditorialHome } from "@/components/EditorialHome";

export const metadata: Metadata = {
  title: "Наташа Фри RUS",
  description:
    "Редакционный кабинет Наташи Фри RUS: новости, первоисточники, авторская аналитика и спокойные разборы.",
};

export default function NatashaPage() {
  return <EditorialHome />;
}
