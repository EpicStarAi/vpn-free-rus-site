import type { Metadata } from "next";
import { ServicePage } from "@/components/ServicePage";
import { corporateServices } from "@/data/corporate";

const service = corporateServices.find((item) => item.slug === "sales")!;
export const metadata: Metadata = { title: service.title, description: service.seoDescription };
export default function Page() { return <ServicePage service={service} />; }
