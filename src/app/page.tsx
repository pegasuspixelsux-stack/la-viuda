import { AvailabilitySection } from "@/components/availability-section";
import { BedroomsSection } from "@/components/bedrooms-section";
import { EstateSection } from "@/components/estate-section";
import { ExperiencesSection } from "@/components/experiences-section";
import { FacilitiesSection } from "@/components/facilities-section";
import { FaqSection } from "@/components/faq-section";
import { GallerySection } from "@/components/gallery-section";
import { Hero } from "@/components/hero";
import { LivingSection } from "@/components/living-section";
import { LocationSection } from "@/components/location-section";
import { PropertyDetailsSection } from "@/components/property-details-section";
import { ReserveSection } from "@/components/reserve-section";
import { ResidenceSection } from "@/components/residence-section";
import { SettingSection } from "@/components/setting-section";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";

export default function Home() {
  return (
    <>
      <SiteNav />
      <main>
        <Hero />
        <EstateSection />
        <ResidenceSection />
        <FacilitiesSection />
        <PropertyDetailsSection />
        <BedroomsSection />
        <LivingSection />
        <SettingSection />
        <ExperiencesSection />
        <GallerySection />
        <LocationSection />
        <FaqSection />
        <AvailabilitySection />
        <ReserveSection />
      </main>
      <SiteFooter />
    </>
  );
}
