import React from 'react';
import Link from 'next/link';

const HeroIllustration = () => (
  <div className="relative flex w-full items-center justify-center">
    <svg
      width="100%"
      height="auto"
      viewBox="0 0 496 434"
      className="h-auto max-h-[330px] w-full max-w-[413px]"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Pinecone Serverless Architecture Diagram</title>
      <rect width="496" height="434" fill="white"></rect>
      <path
        d="M34.875,2.325 L34.875,41.925 L1,41.925 L1,80.525 L34.875,80.525 L34.875,120.125 L139.5,120.125 L139.5,80.525 L104.625,80.525 L104.625,31.025 L139.5,31.025 L139.5,1.39698e-05 L34.875,0 L34.875,2.325 Z M34.875,152.099 L34.875,191.699 L1,191.699 L1,230.299 L34.875,230.299 L34.875,269.899 L139.5,269.899 L139.5,230.299 L104.625,230.299 L104.625,180.799 L139.5,180.799 L139.5,150 L34.875,150 L34.875,152.099 Z M34.875,302 L34.875,341.6 L1,341.6 L1,380.2 L34.875,380.2 L34.875,419.8 L267.375,419.8 L267.375,380.2 L232.5,380.2 L232.5,330.7 L267.375,330.7 L267.375,300 L34.875,300 L34.875,302 Z"
        fill="#F7F7F7"
      ></path>
      <foreignObject x="34.875" y="46.5" width="232.5" height="34.875">
        <div xmlns="http://www.w3.org/1999/xhtml" className="flex h-full items-center justify-center font-mono text-[10px] uppercase tracking-widest text-[#8b8b8b]">
          Blob Storage
        </div>
      </foreignObject>
      <foreignObject x="34.875" y="196.375" width="104.625" height="34.875">
        <div xmlns="http://www.w3.org/1999/xhtml" className="flex h-full items-center justify-center font-mono text-[10px] uppercase tracking-widest text-[#8b8b8b]">
          Memory, SSD, Index Cache
        </div>
      </foreignObject>
      <foreignObject x="34.875" y="117" width="104.625" height="34.875">
        <div xmlns="http://www.w3.org/1999/xhtml" className="flex h-full items-center justify-center font-mono text-[10px] uppercase tracking-widest text-[#8b8b8b]">
          CPUs
        </div>
      </foreignObject>
      <foreignObject x="150" y="235.625" width="250" height="34.875">
        <div xmlns="http://www.w3.org/1999/xhtml" className="flex h-full items-center justify-center font-mono text-[10px] uppercase tracking-widest text-black">
          Index Builders
        </div>
      </foreignObject>
      <foreignObject x="150" y="341.625" width="250" height="34.875">
        <div xmlns="http://www.w3.org/1999/xhtml" className="flex h-full items-center justify-center font-mono text-[10px] uppercase tracking-widest text-black">
          Query Workers
        </div>
      </foreignObject>
      <foreignObject x="150" y="148.875" width="250" height="34.875">
        <div xmlns="http://www.w3.org/1999/xhtml" className="flex h-full items-center justify-center font-mono text-[10px] uppercase tracking-widest text-black">
          Embedding and Reranking models
        </div>
      </foreignObject>
      <foreignObject x="193.75" y="1.55" width="201.5" height="23.25">
        <div xmlns="http://www.w3.org/1999/xhtml" className="flex h-full items-center justify-center font-mono text-[10px] uppercase tracking-widest text-[#8b8b8b]">
          Pinecone Serverless Architecture rev. 4.1
        </div>
      </foreignObject>
      <path d="M400,380 L495,380" stroke="#8b8b8b"></path>
      <path
        d="M490.35,375.35 L495,380 L490.35,384.65"
        stroke="#8b8b8b"
        strokeLinecap="square"
      ></path>
      <foreignObject x="415" y="360" width="60" height="15">
        <div xmlns="http://www.w3.org/1999/xhtml" className="flex h-full items-center justify-center font-mono text-[10px] uppercase tracking-widest text-black">
          WRITE
        </div>
      </foreignObject>
      <path d="M400,274 L495,274" stroke="#8b8b8b"></path>
      <path
        d="M490.35,269.35 L495,274 L490.35,278.65"
        stroke="#8b8b8b"
        strokeLinecap="square"
      ></path>
      <foreignObject x="415" y="254" width="60" height="15">
        <div xmlns="http://www.w3.org/1999/xhtml" className="flex h-full items-center justify-center font-mono text-[10px] uppercase tracking-widest text-black">
          WRITE
        </div>
      </foreignObject>
      <path d="M400,187 L495,187" stroke="#8b8b8b"></path>
      <path
        d="M490.35,182.35 L495,187 L490.35,191.65"
        stroke="#8b8b8b"
        strokeLinecap="square"
      ></path>
      <foreignObject x="415" y="167" width="60" height="15">
        <div xmlns="http://www.w3.org/1999/xhtml" className="flex h-full items-center justify-center font-mono text-[10px] uppercase tracking-widest text-black">
          READ
        </div>
      </foreignObject>
      <path d="M267.375,341.625 L400,341.625" stroke="#8b8b8b"></path>
      <path
        d="M272.025,337 L267.375,341.625 L272.025,346.25"
        stroke="#8b8b8b"
        strokeLinecap="square"
      ></path>
      <path d="M139.5,196.375 L150,196.375" stroke="#8b8b8b"></path>
      <path
        d="M145.35,191.725 L150,196.375 L145.35,201.025"
        stroke="#8b8b8b"
        strokeLinecap="square"
      ></path>
      <path
        d="M139.5,231.125 L139.5,231.125 L139.5,235.625 L150,235.625"
        stroke="#8b8b8b"
      ></path>
      <path
        d="M145.35,231 L150,235.625 L145.35,240.25"
        stroke="#8b8b8b"
        strokeLinecap="square"
      ></path>
      <path d="M139.5,153.25 L150,153.25" stroke="#8b8b8b"></path>
      <path
        d="M145.35,148.6 L150,153.25 L145.35,157.9"
        stroke="#8b8b8b"
        strokeLinecap="square"
      ></path>
      <path d="M267.375,336 L267.375,300" stroke="#8b8b8b"></path>
      <path
        d="M262.725,304.65 L267.375,300 L272.025,304.65"
        stroke="#8b8b8b"
        strokeLinecap="square"
      ></path>
      <path d="M400,274 L400,235.625" stroke="#8b8b8b"></path>
      <path
        d="M395.35,240.275 L400,235.625 L404.65,240.275"
        stroke="#8b8b8b"
        strokeLinecap="square"
      ></path>
      <path d="M400,380 L400,341.625" stroke="#8b8b8b"></path>
      <path d="M139.5,120 L139.5,80.5" stroke="#8b8b8b"></path>
      <path
        d="M134.85,85.15 L139.5,80.5 L144.15,85.15"
        stroke="#8b8b8b"
        strokeLinecap="square"
      ></path>
      <path d="M267.375,419.8 L267.375,380.2" stroke="#8b8b8b"></path>
      <path
        d="M262.725,384.85 L267.375,380.2 L272.025,384.85"
        stroke="#8b8b8b"
        strokeLinecap="square"
      ></path>
      <path d="M139.5,269.9 L139.5,230.3" stroke="#8b8b8b"></path>
      <path
        d="M134.85,234.95 L139.5,230.3 L144.15,234.95"
        stroke="#8b8b8b"
        strokeLinecap="square"
      ></path>
      <path d="M400,309.125 L150,309.125" stroke="#8b8b8b" strokeDasharray="3 3"></path>
      <path d="M400,220.125 L150,220.125" stroke="#8b8b8b" strokeDasharray="3 3"></path>
      <path d="M400,117.125 L139,117.125" stroke="#8b8b8b" strokeDasharray="3 3"></path>
      <path
        d="M144.35,112.475 L139.7,117.125 L144.35,121.775"
        stroke="#8b8b8b"
        strokeLinecap="square"
      ></path>
      <path d="M34.875,380.2 L1,380.2" stroke="#8b8b8b"></path>
      <path
        d="M5.65,375.55 L1,380.2 L5.65,384.85"
        stroke="#8b8b8b"
        strokeLinecap="square"
      ></path>
      <path d="M34.875,341.6 L1,341.6" stroke="#8b8b8b"></path>
      <path
        d="M5.65,336.95 L1,341.6 L5.65,346.25"
        stroke="#8b8b8b"
        strokeLinecap="square"
      ></path>
      <path d="M34.875,230.3 L1,230.3" stroke="#8b8b8b"></path>
      <path
        d="M5.65,225.65 L1,230.3 L5.65,234.95"
        stroke="#8b8b8b"
        strokeLinecap="square"
      ></path>
      <path d="M34.875,191.7 L1,191.7" stroke="#8b8b8b"></path>
      <path
        d="M5.65,187.05 L1,191.7 L5.65,196.35"
        stroke="#8b8b8b"
        strokeLinecap="square"
      ></path>
      <path d="M34.875,80.5 L1,80.5" stroke="#8b8b8b"></path>
      <path
        d="M5.65,75.85 L1,80.5 L5.65,85.15"
        stroke="#8b8b8b"
        strokeLinecap="square"
      ></path>
      <path d="M34.875,41.9 L1,41.9" stroke="#8b8b8b"></path>
      <path
        d="M5.65,37.25 L1,41.9 L5.65,46.55"
        stroke="#8b8b8b"
        strokeLinecap="square"
      ></path>
    </svg>
  </div>
);

const CtaButton = ({
  href,
  text,
  primary = false,
}: {
  href: string;
  text: string;
  primary?: boolean;
}) => {
  const baseClasses =
    'block border px-5 py-2.5 text-[15px]/[1.4] transition-colors';
  const primaryClasses =
    'bg-primary text-primary-foreground border-primary hover:bg-blue-700 hover:border-blue-700';
  const secondaryClasses =
    'border-foreground bg-background text-foreground hover:border-primary';

  const cornerBaseClasses =
    'absolute transition-all duration-200 ease-out';
  const primaryCornerClasses =
    'bg-primary group-hover:bg-foreground';
  const secondaryCornerClasses = 'bg-foreground';

  return (
    <Link href={href} className="group relative inline-block p-1.5">
      <span className={`${baseClasses} ${primary ? primaryClasses : secondaryClasses}`}>
        {text}
      </span>
      <span role="presentation" className={`${cornerBaseClasses} ${primary ? primaryCornerClasses : secondaryCornerClasses} left-0 top-[5px] h-[1px] w-[6px] group-hover:translate-x-[5px]`}></span>
      <span role="presentation" className={`${cornerBaseClasses} ${primary ? primaryCornerClasses : secondaryCornerClasses} left-[5px] top-0 h-[6px] w-[1px] group-hover:translate-y-[5px]`}></span>
      <span role="presentation" className={`${cornerBaseClasses} ${primary ? primaryCornerClasses : secondaryCornerClasses} right-0 top-[5px] h-[1px] w-[6px] group-hover:-translate-x-[5px]`}></span>
      <span role="presentation" className={`${cornerBaseClasses} ${primary ? primaryCornerClasses : secondaryCornerClasses} right-[5px] top-0 h-[6px] w-[1px] group-hover:translate-y-[5px]`}></span>
      <span role="presentation" className={`${cornerBaseClasses} ${primary ? primaryCornerClasses : secondaryCornerClasses} bottom-[5px] left-0 h-[1px] w-[6px] group-hover:translate-x-[5px]`}></span>
      <span role="presentation" className={`${cornerBaseClasses} ${primary ? primaryCornerClasses : secondaryCornerClasses} bottom-0 left-[5px] h-[6px] w-[1px] group-hover:-translate-y-[5px]`}></span>
      <span role="presentation" className={`${cornerBaseClasses} ${primary ? primaryCornerClasses : secondaryCornerClasses} bottom-[5px] right-0 h-[1px] w-[6px] group-hover:-translate-x-[5px]`}></span>
      <span role="presentation" className={`${cornerBaseClasses} ${primary ? primaryCornerClasses : secondaryCornerClasses} bottom-0 right-[5px] h-[6px] w-[1px] group-hover:-translate-y-[5px]`}></span>
    </Link>
  );
};

const HeroSection = () => {
  return (
    <section className="border-b border-border bg-background">
      <div className="container">
        <div className="relative grid grid-cols-1 items-center gap-8 px-4 py-4 sm:px-8 md:grid-cols-2 md:py-8">
          <div className="space-y-10 pb-8 pt-10 md:mb-0 md:pb-0 md:pt-0">
            <span className="block text-xs/[1.5] font-medium uppercase tracking-[1.8px] text-primary">
              Blockchain-Native Tipping Infrastructure
            </span>
            <h1 className="text-[54px] font-bold leading-[1.1] tracking-tight text-foreground">
              AI TipLink
              <br />
              <span className="text-primary">Frictionless, Transparent, Auditable Tipping</span>
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
              AI TipLink delivers a one-click tipping experience via links, QR codes and widgets—built for the Base Network and supporting USDC, USDT, and ETH. It combines AI-powered contextual tip suggestions, transparent distribution, and verifiable receipts so guests tip easily, workers get paid fairly, and merchants gain actionable insights. Join the next generation of intelligent, blockchain-native tipping.
            </p>
            <div className="flex flex-wrap gap-4">
              <CtaButton
                href="/signup"
                text="Explore the Protocol"
                primary
              />
              <CtaButton
                href="/contact?inquiry=pilot"
                text="Book a Demo / Pilot"
              />
            </div>
          </div>
          <HeroIllustration />
          <div
            role="presentation"
            className="pointer-events-none absolute left-0 top-0 w-full"
          >
            <span className="absolute left-0 top-0 z-10 h-[7.125rem] border-l border-border"></span>
            <span className="absolute left-0 top-1 z-20 h-[10rem] w-[1px] bg-gradient-to-t from-background from-10% to-transparent"></span>
            <span className="absolute right-0 top-0 z-10 h-[7.125rem] border-l border-border [--tw-border-opacity:1] [border-right:var(--tw-border-width)_solid_rgba(var(--border)/var(--tw-border-opacity))] [border-left:0px]"></span>
            <span className="absolute right-0 top-1 z-20 h-[10rem] w-[1px] bg-gradient-to-t from-background from-10% to-transparent"></span>
          </div>
          <div
            role="presentation"
            className="pointer-events-none absolute bottom-0 left-0 w-full"
          >
            <span className="absolute bottom-0 left-0 z-10 h-[7.125rem] border-l border-border"></span>
            <span className="absolute bottom-1 left-0 z-20 h-[10rem] w-[1px] bg-gradient-to-b from-background from-10% to-transparent"></span>
            <span className="absolute bottom-0 right-0 z-10 h-[7.125rem] border-l border-border [--tw-border-opacity:1] [border-right:var(--tw-border-width)_solid_rgba(var(--border)/var(--tw-border-opacity))] [border-left:0px]"></span>
            <span className="absolute bottom-1 right-0 z-20 h-[10rem] w-[1px] bg-gradient-to-b from-background from-10% to-transparent"></span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
