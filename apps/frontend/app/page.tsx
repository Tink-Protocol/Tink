'use client'

import AnnouncementBanner from "./components/landing/announcement-banner";
import HeroSection from "./components/landing/hero";
import ClientLogosSection from "./components/landing/client-logos";
import PerformanceMetricsSection from "./components/landing/performance-metrics";
import CaseStudiesSection from "./components/landing/case-studies";
import DeveloperExperienceSection from "./components/landing/developer-experience";
import SearchFeaturesSection from "./components/landing/search";
import IntegrationsCarouselSection from "./components/landing/integration-carousel";
import EnterpriseSecuritySection from "./components/landing/enterprise-security";
import FinalCtaSection from "./components/landing/final-cta";
import Footer from "./components/landing/footer";
export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <AnnouncementBanner />
      <HeroSection />
      <ClientLogosSection />
      <PerformanceMetricsSection />
      <CaseStudiesSection />
      <DeveloperExperienceSection />
      <SearchFeaturesSection />
      <IntegrationsCarouselSection />
      <EnterpriseSecuritySection />
      <FinalCtaSection />
      <Footer />
    </main>
  );
}