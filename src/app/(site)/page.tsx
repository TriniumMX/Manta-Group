import { BrandUniverse } from "@/components/home/BrandUniverse";
import { ContactInvite } from "@/components/home/ContactInvite";
import { Essence } from "@/components/home/Essence";
import { ExperiencesGrid } from "@/components/home/ExperiencesGrid";
import { Hero } from "@/components/home/Hero";

export default function HomePage() {
  return (
    <>
      <Hero />
      <BrandUniverse />
      <ExperiencesGrid />
      <Essence />
      <ContactInvite />
    </>
  );
}
