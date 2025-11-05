'use client';

import Link from 'next/link';
import { Github, Linkedin, Twitter } from 'lucide-react';

const AiTipLinkLogo = () => (
  <span className="text-3xl font-black text-primary">AI TipLink</span>
);

const footerNav = [
  {
    title: 'Product',
    links: [
      { name: 'Overview', href: '/#' },
      { name: 'How it Works', href: '/#how' },
      { name: 'Pricing', href: '/pricing' },
      { name: 'Compliance', href: '/#compliance' },
      { name: 'Integrations', href: '/#integrations' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { name: 'Docs', href: '/docs', external: false },
      { name: 'Blog', href: '/blog' },
      { name: 'Ecosystem', href: '/#partners' },
      { name: 'FAQ', href: '/faq' },
    ],
  },
  {
    title: 'Company',
    links: [
      { name: 'About', href: '/about' },
      { name: 'Partners', href: '/#partners' },
      { name: 'Contact', href: '/contact' },
      { name: 'Careers', href: '/careers' }
    ]
  },
  {
    title: 'Legal',
    links: [
      { name: 'Platform Terms', href: '/legal/platform-terms' },
      { name: 'Privacy', href: '/legal/privacy' },
      { name: 'Cookies', href: '/legal/cookies' },
      { name: 'Cookie Preferences', href: '#', isButton: true },
    ]
  }
];

const socialLinks = [
  { icon: <Github className="h-5 w-5" />, href: 'https://github.com/aitiplink', 'aria-label': 'GitHub' },
  { icon: <Twitter className="h-5 w-5" />, href: 'https://twitter.com/aitiplink', 'aria-label': 'Twitter' },
  { icon: <Linkedin className="h-5 w-5" />, href: 'https://linkedin.com/company/aitiplink', 'aria-label': 'LinkedIn' },
];

const Footer = () => {
  const handleCookiePrefs = () => {
    // This would typically open a cookie consent management modal.
    console.log('Open cookie preferences');
  };

  return (
    <footer className="bg-[#f9f9f9] border-t border-border">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-10 gap-x-8">
          <div className="md:col-span-3">
            <Link href="/" className="inline-block mb-8" aria-label="AI TipLink homepage">
              <AiTipLinkLogo />
            </Link>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a key={index} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social['aria-label']} className="text-text-secondary hover:text-black transition-colors">
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
          <div className="hidden md:block md:col-span-1" />
          <div className="md:col-span-8 grid grid-cols-2 lg:grid-cols-4 gap-8">
            {footerNav.map((column) => (
              <div key={column.title}>
                <h3 className="font-bold text-sm text-black mb-4">{column.title}</h3>
                <ul className="space-y-3">
                  {column.links.map((link) => (
                    <li key={link.name}>
                      {link.isButton ? (
                        <button onClick={handleCookiePrefs} className="text-sm text-black text-left hover:text-primary hover:underline">
                          {link.name}
                        </button>
                      ) : link.external ? (
                        <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-sm text-black hover:text-primary hover:underline">
                           {link.name}
                        </a>
                      ) : (
                        <Link href={link.href} className="text-sm text-black hover:text-primary hover:underline">
                          {link.name}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <hr className="my-8 border-border" />
        <div className="flex flex-col md:flex-row justify-between text-xs text-text-secondary">
          <p className="text-center md:text-left">© {new Date().getFullYear()} AI TipLink | Powered by Base Network & Solana</p>
          <p className="mt-2 text-center md:text-right md:mt-0">
            AI TipLink is an open tipping infrastructure protocol for the next generation of payments.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
