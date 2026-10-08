import { AvailabilitySection } from "@/components/availability-section";
import { AmenitiesSection } from "@/components/amenities-section";
import { BedroomsSection } from "@/components/bedrooms-section";
import { EstateSection } from "@/components/estate-section";
import { ExperiencesSection } from "@/components/experiences-section";
import { FacilitiesSection } from "@/components/facilities-section";
import { FaqSection } from "@/components/faq-section";
import { GallerySection } from "@/components/gallery-section";
import { Hero } from "@/components/hero";
import { LivingSection } from "@/components/living-section";
import { LocationSection } from "@/components/location-section";
import { PhotoGallerySection } from "@/components/photo-gallery-section";
import { PoliciesSection } from "@/components/policies-section";
import { PropertyDetailsSection } from "@/components/property-details-section";
import { MobileAccordion } from "@/components/primitives/mobile-accordion";
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
        <MobileAccordion title="La Residencia">
          <ResidenceSection />
        </MobileAccordion>
        <MobileAccordion title="Servicios e infraestructura">
          <FacilitiesSection />
        </MobileAccordion>
        <MobileAccordion title="Todas las comodidades">
          <AmenitiesSection />
        </MobileAccordion>
        <MobileAccordion title="En resumen">
          <PropertyDetailsSection />
        </MobileAccordion>
        <MobileAccordion title="Habitaciones">
          <BedroomsSection />
        </MobileAccordion>
        <MobileAccordion title="El Salón">
          <LivingSection />
        </MobileAccordion>
        <MobileAccordion title="El Entorno">
          <SettingSection />
        </MobileAccordion>
        <MobileAccordion title="Al aire libre">
          <ExperiencesSection />
        </MobileAccordion>
        <MobileAccordion title="La casa y su costa">
          <GallerySection />
        </MobileAccordion>
        <MobileAccordion title="Galería de fotos">
          <PhotoGallerySection />
        </MobileAccordion>
        <MobileAccordion title="Ubicación">
          <LocationSection />
        </MobileAccordion>
        <MobileAccordion title="Preguntas frecuentes">
          <FaqSection />
        </MobileAccordion>
        <MobileAccordion title="Políticas y reglas">
          <PoliciesSection />
        </MobileAccordion>
        <MobileAccordion title="Disponibilidad">
          <AvailabilitySection />
        </MobileAccordion>
        <MobileAccordion title="Reserva directa">
          <ReserveSection />
        </MobileAccordion>
      </main>
      <SiteFooter />
    </>
  );
}
