import type { Metadata } from "next";
import { BrandPage } from "@/components/brand/BrandPage";

export const metadata: Metadata = { title: "Agatha" };

export default function Page() {
  return <BrandPage slug="agatha" />;
}
