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

import { sendWeb3Form } from "@/lib/web3forms";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);

    try {
      await sendWeb3Form(
        { email, form_type: "Newsletter Subscription" },
        "New Newsletter Subscriber - Finsocap"
      );
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 5000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const insuranceLinks = [
    { label: "Health Insurance", href: "/insurance/health" },
    { label: "Term Life Insurance", href: "/insurance/life" },
    { label: "Car Insurance", href: "/insurance/car" },
    { label: "Bike Insurance", href: "/insurance/bike" },
    { label: "Business Insurance", href: "/insurance/business" },
  ];

  const loanInvestLinks = [
    { label: "Personal Loan", href: "/loans/personal" },
    { label: "Home Loan", href: "/loans/home" },
    { label: "Business Loan", href: "/loans/business" },
    { label: "Mutual Funds Direct SIP", href: "/investments/mutual-funds" },
    { label: "SIP / EMI Calculator", href: "/#calculator-section" },
  ];

  const advisoryLinks = [
    { label: "ITR Filing & Planning", href: "/tax/itr" },
    { label: "Accounting & GST Registration", href: "/tax/accounting" },
    { label: "Company Incorporation", href: "/tax/compliance" },
    { label: "Wealth Management", href: "/investments/retirement" },
    { label: "Contact Us", href: "/contact" },
  ];

  const socialLinks = [
    {
      label: "Facebook",
      href: "https://facebook.com",
      bgClass: "bg-[#1877F2] text-white hover:opacity-90",
      icon: (
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      label: "Instagram",
      href: "https://instagram.com",
      bgClass: "bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white hover:opacity-90",
      icon: (
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
    },
    {
      label: "LinkedIn",
      href: "https://linkedin.com",
      bgClass: "bg-[#0A66C2] text-white hover:opacity-90",
      icon: (
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
    },
    {
      label: "Twitter (X)",
      href: "https://x.com",
      bgClass: "bg-slate-900 text-white hover:bg-black",
      icon: (
        <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      label: "YouTube",
      href: "https://youtube.com",
      bgClass: "bg-[#FF0000] text-white hover:opacity-90",
      icon: (
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
    },
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
            <div className="flex gap-2.5">
              {socialLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className={`w-7 h-7 rounded-full flex items-center justify-center shadow-xs transition-transform duration-200 hover:scale-110 ${link.bgClass}`}
                >
                  {link.icon}
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

          {/* Column 4: Finance Consultancy */}
          <div className="lg:col-span-2">
            <h3 className="text-slate-800 text-base font-bold mb-5 tracking-wide">Finance Consultancy</h3>
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
                <span>717/F-2, Anmol Apartments, Ghaziabad, Radha Krishna Marg, Ghaziabad, Uttar Pradesh, 201005</span>
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
          <form onSubmit={handleSubscribe} className="relative w-full max-w-md flex items-center">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="w-full bg-white border border-slate-200 rounded-full py-3.5 pl-6 pr-14 text-slate-800 text-xs outline-none focus:border-brand-teal transition-all"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 bg-brand-teal hover:bg-brand-teal-hover text-white rounded-full flex items-center justify-center transition-colors cursor-pointer shadow-xs"
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
              © {new Date().getFullYear()} Finsocap Consulting All rights reserved.
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
