import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

// Replicated from the site's SVG for the Gong logo
const GongLogo = () => (
  <svg
    width="86"
    height="24"
    viewBox="0 0 86 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className="text-black"
    aria-label="Gong logo"
  >
    <path d="M74.88 23.36a9.23 9.23 0 0 1-5.63-1.78l-.3-.2.32-.2L81.04 12l-11.77-9.18-.32-.2.3.2a9.24 9.24 0 0 1 11.26 13.04 9.17 9.17 0 0 1-5.63 7.3z"></path>
    <path d="M63.63 21.06a9.24 9.24 0 0 1-9.2-7.29 9.24 9.24 0 0 1 7.3-9.2 9.23 9.23 0 0 1 9.2 7.29 9.23 9.23 0 0 1-7.3 9.2zM27 23.36a9.23 9.23 0 0 1-5.63-1.78l-.3-.2.32-.2L33.16 12 21.39 2.82l-.32-.2.3.2A9.24 9.24 0 0 1 32.63.8a9.23 9.23 0 0 1 5.63 15.22 9.17 9.17 0 0 1-11.26 7.34z"></path>
    <path d="M15.75 21.06a9.24 9.24 0 0 1-9.2-7.29A9.24 9.24 0 0 1 13.84 4.57a9.23 9.23 0 0 1 9.2 7.29 9.23 9.23 0 0 1-7.3 9.2zM45.33 21.05a9.23 9.23 0 0 1-9.2-7.28 9.23 9.23 0 0 1 7.29-9.2 9.23 9.23 0 0 1 9.2 7.29 9.24 9.24 0 0 1-7.3 9.2zM85.49 11.43a.5.5 0 0 0-.49.5v.14a.5.5 0 0 0 .5.5h.13a.5.5 0 0 0 .49-.5v-.14a.5.5 0 0 0-.5-.5h-.13z"></path>
  </svg>
);

const ReadCaseStudyLink = () => (
  <div className="text-base font-semibold text-primary flex items-center gap-2 group-hover:underline">
    Read case study
    <ArrowRight className="w-4 h-4 transition-transform duration-200 ease-in-out group-hover:translate-x-1" />
  </div>
);

const CaseStudiesSection = () => {
  return (
    <section className="border-b border-border bg-background">
      <div className="container px-4 sm:px-8 py-16 md:py-24">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-5xl font-bold tracking-tight text-foreground">
            Real AI TipLink Case Studies
          </h2>
          <p className="mt-4 text-xl text-text-secondary">
            See how frictionless, transparent, and intelligent tipping changes the game across service industries.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Restaurant Chain */}
          <div className="group h-full">
            <div className="h-full flex flex-col rounded-lg border border-border bg-card p-8 transition-shadow duration-300 group-hover:shadow-lg">
              <p className="text-xs font-bold uppercase tracking-[0.1em] text-text-secondary">
                Restaurant Chain
              </p>
              <div className="h-6 my-6 flex items-center justify-center">
                <span role="img" aria-label="plate" className="text-3xl">🍽️</span>
              </div>
              <p className="flex-grow text-lg text-foreground">
                AI TipLink deployed at 18 locations. Result: tip conversion up 24%, end-of-shift reconciliation time down 90%, staff satisfaction +30%. Employees see split, tips auditable by all!
              </p>
              <div className="mt-auto pt-6 text-base font-semibold text-primary">Proof: On-chain audits. <span className="ml-2">→</span></div>
            </div>
          </div>
          {/* Ride-Share */}
          <div className="group h-full">
            <div className="h-full flex flex-col rounded-lg border border-border bg-card p-8 transition-shadow duration-300 group-hover:shadow-lg">
              <p className="text-xs font-bold uppercase tracking-[0.1em] text-text-secondary">Ride-share Platform</p>
              <div className="h-6 my-6 flex items-center justify-center"><span role="img" aria-label="car" className="text-3xl">🚗</span></div>
              <p className="flex-grow text-lg text-foreground">Instant QR and link tipping at ride completion. AI recommendations boost average tip. Drivers receive real-time payout with proof and timeline.</p>
              <div className="mt-auto pt-6 text-base font-semibold text-primary">Feature: Worker payout dashboard. <span className="ml-2">→</span></div>
            </div>
          </div>
          {/* Creator Economy */}
          <div className="group h-full">
            <div className="h-full flex flex-col rounded-lg border border-border bg-card p-8 transition-shadow duration-300 group-hover:shadow-lg">
              <p className="text-xs font-bold uppercase tracking-[0.1em] text-text-secondary">Streaming & Creator</p>
              <div className="h-6 my-6 flex items-center justify-center"><span role="img" aria-label="video">🎥</span></div>
              <p className="flex-grow text-lg text-foreground">With AI TipLink links in chat and overlays, creators saw a 42% uptick in micro-tips. Fans see how much goes to the performer with every transaction.</p>
              <div className="mt-auto pt-6 text-base font-semibold text-primary">Value: Transparent receipts. <span className="ml-2">→</span></div>
            </div>
          </div>
          {/* Boutique Hotel Group */}
          <div className="group h-full">
            <div className="h-full flex flex-col rounded-lg border border-border bg-card p-8 transition-shadow duration-300 group-hover:shadow-lg">
              <p className="text-xs font-bold uppercase tracking-[0.1em] text-text-secondary">Boutique Hotel Group</p>
              <div className="h-6 my-6 flex items-center justify-center"><span role="img" aria-label="hotel">🏨</span></div>
              <p className="flex-grow text-lg text-foreground">Pilots at 3 hotels saw guests leave tips in 2 taps. Hotel managers exported automated, tax-ready reporting, and workers tracked exact distribution/split by shift.</p>
              <div className="mt-auto pt-6 text-base font-semibold text-primary">Feature: Compliance reporting. <span className="ml-2">→</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;
