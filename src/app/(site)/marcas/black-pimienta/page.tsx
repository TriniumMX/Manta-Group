import type { Metadata } from "next";
import { BrandPage } from "@/components/brand/BrandPage";
import { CoursesSection } from "@/components/modules/courses/CoursesSection";

export const metadata: Metadata = { title: "Black Pimienta" };

export default function Page() {
  return (
    <BrandPage slug="black-pimienta">
      <CoursesSection />
    </BrandPage>
  );
}
