import type { Metadata } from "next";
import { BrandPlaceholderPage } from "@/components/brand/BrandPlaceholderPage";

export const metadata: Metadata = { title: "La Trufa" };

export default function Page() {
  return <BrandPlaceholderPage slug="la-trufa" />;
}
