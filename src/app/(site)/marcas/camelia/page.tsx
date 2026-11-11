import type { Metadata } from "next";
import { BrandPage } from "@/components/brand/BrandPage";
import { QuerethaTimeline } from "@/components/modules/info/QuerethaTimeline";

export const metadata: Metadata = { title: "Camelia" };

export default function Page() {
  return (
    <BrandPage slug="camelia">
      <QuerethaTimeline />
    </BrandPage>
  );
}
