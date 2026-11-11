import type { Metadata } from "next";
import { BrandPage } from "@/components/brand/BrandPage";

export const metadata: Metadata = { title: "La Trufa" };

export default function Page() {
  return <BrandPage slug="la-trufa" />;
}
