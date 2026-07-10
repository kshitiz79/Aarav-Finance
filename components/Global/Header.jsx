"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

// Custom Inline SVG Icons
const ChevronDownIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

const PhoneCallIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

export default function Header() {
  const [isSticky, setIsSticky] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    {
      title: "Insurance",
      href: "#",
      children: [
        { title: "Health Insurance", href: "/#insurance-wizard", tag: "Compare & Save" },
        { title: "Term Life Insurance", href: "/#insurance-wizard", tag: "1 Crore Cover" },
        { title: "Car Insurance", href: "/#insurance-wizard", tag: "Instant Policy" },
        { title: "Bike Insurance", href: "/#insurance-wizard", tag: "Starts @ ₹1.5/day" },
        { title: "Travel Insurance", href: "/#insurance-wizard" },
        { title: "Business/Group Insurance", href: "/#insurance-wizard" },
      ],
    },
    {
      title: "Loans",
      href: "#",
      children: [
        { title: "Personal Loan", href: "/#loan-wizard", tag: "Best Interest Rate" },
        { title: "Home Loan", href: "/#loan-wizard" },
        { title: "Business Loan", href: "/#loan-wizard", tag: "Collateral Free" },
        { title: "Loan Against Property", href: "/#loan-wizard" },
      ],
    },
    {
      title: "Investments",
      href: "#",
      children: [
        { title: "Mutual Funds", href: "/#mutual-funds-section", tag: "Direct Plans" },
        { title: "SIP (Systematic Investment)", href: "/#calculator-section", tag: "From ₹500/m" },
        { title: "Tax Saving Plans (ELSS)", href: "/#mutual-funds-section" },
        { title: "Retirement Planning", href: "/#calculator-section" },
      ],
    },
    {
      title: "Tax & Advisory",
      href: "#",
      children: [
        { title: "Income Tax Filing (ITR)", href: "/#tax-filing-section", tag: "Expert Assisted" },
        { title: "Accounting & Bookkeeping", href: "/#tax-filing-section" },
        { title: "GST Registration & Filing", href: "/#tax-filing-section" },
        { title: "Corporate Compliance", href: "/#tax-filing-section" },
      ],
    },
    { title: "EMI Calculator", href: "/#calculator-section" },
  ];

  const handleMobileSubmenuToggle = (idx) => {
    setActiveSubmenu(activeSubmenu === idx ? null : idx);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-[999] transition-all duration-300 font-sans ${
          isSticky
            ? "bg-white/95 backdrop-blur-md shadow-md py-3"
            : "bg-white border-b border-slate-100 py-4"
        }`}
      >
        <div className="container mx-auto px-4 max-w-7xl flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="relative h-11 w-36 sm:w-44 md:w-48">
              <Image
                src="/Finsocap_logo.png"
                alt="Finsocap Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-4">
            <ul className="flex items-center gap-2 xl:gap-5 list-none m-0 p-0 text-sm font-semibold text-slate-700">
              {navItems.map((item, idx) => (
                <li key={idx} className="group relative py-2">
                  {item.children ? (
                    <div className="flex items-center gap-1 px-3 py-1.5 rounded-lg hover:bg-slate-50 hover:text-brand-blue transition-all cursor-pointer">
                      <span>{item.title}</span>
                      <ChevronDownIcon className="w-3.5 h-3.5 opacity-60 group-hover:rotate-180 transition-transform duration-300" />
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className="block px-3 py-1.5 rounded-lg hover:bg-slate-50 hover:text-brand-blue transition-all"
                    >
                      {item.title}
                    </Link>
                  )}

                  {/* Dropdown menu */}
                  {item.children && (
                    <div className="absolute left-1/2 -translate-x-1/2 top-[100%] pt-2 w-72 opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0 transition-all duration-300 z-50">
                      <div className="bg-white shadow-xl rounded-xl border border-slate-100 p-3 grid gap-1">
                        {item.children.map((subItem, subIdx) => (
                          <Link
                            key={subIdx}
                            href={subItem.href}
                            className="flex items-center justify-between px-3.5 py-2.5 rounded-lg hover:bg-slate-50 text-slate-600 hover:text-brand-blue transition-all"
                          >
                            <span className="font-medium text-xs sm:text-[13px]">{subItem.title}</span>
                            {subItem.tag && (
                              <span className="text-[10px] bg-brand-teal/10 text-brand-teal px-2 py-0.5 rounded-full font-bold">
                                {subItem.tag}
                              </span>
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Right Controls */}
          <div className="flex items-center gap-3">
            {/* Consultation CTA */}
            <Link
              href="tel:+918095132132"
              className="hidden md:flex items-center gap-2 bg-brand-blue hover:bg-brand-blue-hover text-white px-4.5 py-2.5 rounded-full text-sm font-semibold transition-all shadow-md shadow-brand-blue/15 hover:shadow-lg"
            >
              <PhoneCallIcon className="w-4 h-4" />
              <span>Talk to Expert</span>
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-slate-100 text-slate-700 transition-colors"
              aria-label="Toggle Menu"
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <span className={`w-full h-0.5 bg-current rounded-full transition-all duration-300 origin-left ${isMobileMenuOpen ? "rotate-45 translate-x-1" : ""}`} />
                <span className={`w-full h-0.5 bg-current rounded-full transition-all duration-300 ${isMobileMenuOpen ? "opacity-0" : ""}`} />
                <span className={`w-full h-0.5 bg-current rounded-full transition-all duration-300 origin-left ${isMobileMenuOpen ? "-rotate-45 translate-x-1" : ""}`} />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <div className={`fixed inset-0 z-[998] transition-all duration-300 ${isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`}>
        {/* Backdrop overlay */}
        <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
        
        {/* Panel content */}
        <div className={`absolute top-0 right-0 w-80 max-w-[90%] h-full bg-white shadow-2xl flex flex-col p-6 overflow-y-auto transition-transform duration-300 ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
          <div className="flex items-center justify-between mb-8 border-b border-slate-100 pb-4">
            <span className="font-bold text-lg text-slate-800">Finsocap</span>
            <button onClick={() => setIsMobileMenuOpen(false)} className="text-slate-400 hover:text-slate-600 text-xl font-bold">×</button>
          </div>

          <nav className="flex-1">
            <ul className="flex flex-col gap-3 list-none p-0 m-0">
              {navItems.map((item, idx) => (
                <li key={idx} className="border-b border-slate-50 pb-2">
                  {item.children ? (
                    <div>
                      <button
                        onClick={() => handleMobileSubmenuToggle(idx)}
                        className="w-full flex items-center justify-between py-2 text-slate-700 text-left font-semibold hover:text-brand-blue"
                      >
                        <span>{item.title}</span>
                        <ChevronDownIcon className={`w-4 h-4 transition-transform duration-300 ${activeSubmenu === idx ? "rotate-180" : ""}`} />
                      </button>

                      <div className={`overflow-hidden transition-all duration-300 ${activeSubmenu === idx ? "max-h-96 mt-2 opacity-100" : "max-h-0 opacity-0 pointer-events-none"}`}>
                        <div className="bg-slate-50 rounded-xl p-2 flex flex-col gap-2">
                          {item.children.map((subItem, subIdx) => (
                            <Link
                              key={subIdx}
                              href={subItem.href}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="flex items-center justify-between py-2 px-3 hover:bg-slate-100 rounded-lg text-slate-600 text-xs font-medium"
                            >
                              <span>{subItem.title}</span>
                              {subItem.tag && (
                                <span className="text-[9px] bg-brand-teal/10 text-brand-teal px-1.5 py-0.5 rounded font-bold">
                                  {subItem.tag}
                                </span>
                              )}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block py-2 text-slate-700 font-semibold hover:text-brand-blue"
                    >
                      {item.title}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-8 pt-4 border-t border-slate-100">
            <Link
              href="tel:+918095132132"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 bg-brand-blue text-white w-full py-3 rounded-xl font-semibold shadow-md hover:bg-brand-blue-hover transition-colors"
            >
              <PhoneCallIcon className="w-4 h-4" />
              <span>Talk to an Advisor</span>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Spacer to push page content down below header */}
      <div className="h-16 md:h-20" />
    </>
  );
}
