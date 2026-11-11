import type { Metadata } from "next";
import { BrandPage } from "@/components/brand/BrandPage";

export const metadata: Metadata = { title: "César Fuentes" };

export default function Page() {
  return <BrandPage slug="cesar-fuentes" />;
}
