"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Custom inline SVGs for Footer Icons
const LocationPinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-teal flex-shrink-0">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const EnvelopeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-teal flex-shrink-0">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const PhoneIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-teal flex-shrink-0">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const SendIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const insuranceLinks = [
    { label: "Health Insurance", href: "/#insurance-wizard" },
    { label: "Term Life Insurance", href: "/#insurance-wizard" },
    { label: "Car Insurance", href: "/#insurance-wizard" },
    { label: "Bike Insurance", href: "/#insurance-wizard" },
    { label: "Business Insurance", href: "/#insurance-wizard" },
  ];

  const loanInvestLinks = [
    { label: "Personal Loan", href: "/#loan-wizard" },
    { label: "Home Loan", href: "/#loan-wizard" },
    { label: "Business Loan", href: "/#loan-wizard" },
    { label: "Mutual Funds Direct SIP", href: "/#mutual-funds-section" },
    { label: "SIP / EMI Calculator", href: "/#calculator-section" },
  ];

  const advisoryLinks = [
    { label: "ITR Filing & Planning", href: "/#tax-filing-section" },
    { label: "Accounting & GST Registration", href: "/#tax-filing-section" },
    { label: "Company Incorporation", href: "/#tax-filing-section" },
    { label: "Wealth Management", href: "/#calculator-section" },
  ];

  const socialLinks = [
    { label: "Facebook", href: "https://facebook.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "Instagram", href: "https://instagram.com" },
    { label: "Twitter", href: "https://x.com" },
  ];

  return (
    <footer className="bg-slate-50 text-slate-650 font-sans border-t border-slate-200/60 pt-16 pb-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Main Footer Widgets */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-y-10 lg:gap-y-0 gap-x-8 mb-16">
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <div className="relative h-12 w-48 mb-6">
              <Image
                src="/Finsocap_logo.png"
                alt="Finsocap Logo"
                fill
                className="object-contain"
              />
            </div>
            <p className="text-slate-500 text-sm leading-relaxed mb-6 pr-4">
              We provide finance and insurance services, offering complete financial solutions under one roof. Our services include all types of loans, insurance, mutual funds, investment planning, tax return filing, and account-related services, supported by trusted guidance and fast assistance.
            </p>
            {/* Social Icons */}
            <div className="flex gap-4">
              {socialLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-slate-200 hover:bg-brand-blue hover:text-white flex items-center justify-center transition-all text-xs font-semibold text-slate-500"
                >
                  {link.label[0]}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Insurance Links */}
          <div className="lg:col-span-2">
            <h3 className="text-slate-800 text-base font-bold mb-5 tracking-wide">Insurance</h3>
            <ul className="flex flex-col gap-3 list-none p-0 m-0 text-sm">
              {insuranceLinks.map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href} className="hover:text-brand-teal transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Loans & Invest Links */}
          <div className="lg:col-span-2">
            <h3 className="text-slate-800 text-base font-bold mb-5 tracking-wide">Loans & SIP</h3>
            <ul className="flex flex-col gap-3 list-none p-0 m-0 text-sm">
              {loanInvestLinks.map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href} className="hover:text-brand-teal transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Tax & Advisory */}
          <div className="lg:col-span-2">
            <h3 className="text-slate-800 text-base font-bold mb-5 tracking-wide">Tax & Advisory</h3>
            <ul className="flex flex-col gap-3 list-none p-0 m-0 text-sm">
              {advisoryLinks.map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href} className="hover:text-brand-teal transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: Contact Info */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <h3 className="text-slate-800 text-base font-bold mb-1 tracking-wide">Contact Us</h3>
            <ul className="flex flex-col gap-4 list-none p-0 m-0 text-sm text-slate-500">
              <li className="flex gap-2">
                <LocationPinIcon />
                <span>Sector 5, HSR Layout, Bengaluru, KA - 560102</span>
              </li>
              <li className="flex gap-2">
                <EnvelopeIcon />
                <a href="mailto:info@finsocap.com" className="hover:text-brand-teal transition-colors">
                  info@finsocap.com
                </a>
              </li>
              <li className="flex gap-2">
                <PhoneIcon />
                <a href="tel:+918095132132" className="hover:text-brand-teal transition-colors">
                  +91 80951 32132
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Mid-row: Newsletter */}
        <div className="border-t border-slate-200 pt-8 pb-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-md">
            <h4 className="text-slate-800 font-bold text-[15px] mb-1">Subscribe to Financial Insights</h4>
            <p className="text-slate-500 text-xs">Receive weekly guidance on savings, tax filings, and insurance policies.</p>
          </div>
          <form onSubmit={handleSubscribe} className="relative w-full max-w-md">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="w-full bg-white border border-slate-200 rounded-full py-3 pl-6 pr-14 text-slate-800 text-xs outline-none focus:border-brand-teal transition-all"
            />
            <button
              type="submit"
              className="absolute right-1.5 top-1.5 w-9 h-9 bg-brand-teal hover:bg-brand-teal-hover text-white rounded-full flex items-center justify-center transition-colors cursor-pointer"
            >
              <SendIcon />
            </button>
            {subscribed && (
              <span className="absolute left-6 top-full mt-1.5 text-brand-teal text-[11px] font-semibold animate-pulse">
                ✓ Thank you for subscribing!
              </span>
            )}
          </form>
        </div>

        {/* Footer Divider */}
        <div className="border-t border-slate-200 mt-2 mb-8" />

        {/* Copyright and Legal Disclaimer */}
        <div className="flex flex-col gap-6 text-xs text-slate-400 text-center md:text-left leading-relaxed">
          <p>
            Disclaimer: Finsocap is an independent financial consulting and advisory aggregator platform. We do not issue insurance policies or underwrite loan programs directly. All financial products listed on this website are subjected to the terms and conditions and underwriting policies of their respective providers. All loans and investment values, including Mutual Funds and SIP returns, are subject to market risks. Please read all scheme-related information carefully before investing.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-t border-slate-200/60 pt-6">
            <span className="text-slate-400">
              © {new Date().getFullYear()} Finsocap Consulting Pvt. Ltd. All rights reserved.
            </span>
            <div className="flex gap-6 text-slate-400">
              <Link href="#" className="hover:text-brand-teal transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-brand-teal transition-colors">Terms of Use</Link>
              <Link href="#" className="hover:text-brand-teal transition-colors">Disclaimers</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
