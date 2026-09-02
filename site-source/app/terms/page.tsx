import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { legalPages } from "@/data/site";

export const metadata: Metadata = { title: legalPages.terms.title };
export default function Page() { return <LegalPage {...legalPages.terms} />; }
