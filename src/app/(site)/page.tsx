import { Intro } from "@/components/experience/Intro";
import { BrandSpecs } from "@/components/home/BrandSpecs";
import { BrandStack } from "@/components/home/BrandStack";
import { Closing } from "@/components/home/Closing";
import { ExperienceBento } from "@/components/home/ExperienceBento";
import { GalleryRail } from "@/components/home/GalleryRail";
import { HeroScene } from "@/components/home/HeroScene";
import { Manifesto } from "@/components/home/Manifesto";

export default function HomePage() {
  return (
    <>
      <Intro />
      <HeroScene />
      <Manifesto />
      <BrandStack />
      <ExperienceBento />
      <GalleryRail />
      <BrandSpecs />
      <Closing />
    </>
  );
}
