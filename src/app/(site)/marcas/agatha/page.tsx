import type { Metadata } from "next";
import { BrandPlaceholderPage } from "@/components/brand/BrandPlaceholderPage";

export const metadata: Metadata = { title: "Agatha" };

export default function Page() {
  return <BrandPlaceholderPage slug="agatha" />;
}
