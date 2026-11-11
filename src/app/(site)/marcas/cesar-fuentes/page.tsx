import type { Metadata } from "next";
import { BrandPlaceholderPage } from "@/components/brand/BrandPlaceholderPage";

export const metadata: Metadata = { title: "César Fuentes" };

export default function Page() {
  return <BrandPlaceholderPage slug="cesar-fuentes" />;
}
