import type { Metadata } from "next";
import { BrandPlaceholderPage } from "@/components/brand/BrandPlaceholderPage";

export const metadata: Metadata = { title: "Black Pimienta" };

export default function Page() {
  return <BrandPlaceholderPage slug="black-pimienta" />;
}
