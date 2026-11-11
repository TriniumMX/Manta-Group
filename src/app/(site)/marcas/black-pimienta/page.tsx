import type { Metadata } from "next";
import { BrandPage } from "@/components/brand/BrandPage";

export const metadata: Metadata = { title: "Black Pimienta" };

export default function Page() {
  return <BrandPage slug="black-pimienta" />;
}
