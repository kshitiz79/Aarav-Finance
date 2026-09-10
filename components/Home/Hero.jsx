"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ComparisonWizard from "./ComparisonWizard";

// Inline Custom SVGs matching exact reference design
const SearchIcon = ({ className = "w-5 h-5 text-slate-400" }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const ShieldIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <polyline points="9 12 11 14 15 10" />
  </svg>
);

const HomeIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const ChartIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);

const CarIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.8C1.5 11.2 1 12 1 13v3c0 .6.4 1 1 1h2" />
    <circle cx="7" cy="17" r="2" />
    <circle cx="17" cy="17" r="2" />
  </svg>
);

const ChevronRightIcon = ({ className = "w-4 h-4 text-slate-400" }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const UsersIcon = ({ className = "w-6 h-6 text-slate-700" }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const ShieldCheckIcon = ({ className = "w-6 h-6 text-slate-700" }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <polyline points="9 12 11 14 15 10" />
  </svg>
);

const StarIcon = ({ className = "w-6 h-6 text-slate-700" }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const HeadsetIcon = ({ className = "w-6 h-6 text-slate-700" }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
  </svg>
);

const LeafIcon = ({ className = "w-4 h-4 text-white" }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
  </svg>
);

export default function Hero({ onRequestCallback }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const searchProducts = [
    { name: "Health Insurance", desc: "Cashless hospitalization & tax savings u/s 80D", wizardLabel: "What is the age of the eldest family member?", placeholder: "e.g. 45", categoryTitle: "Insurance Solutions" },
    { name: "Term Life Insurance", desc: "Instant term quotes up to ₹1 Crore cover", wizardLabel: "Select desired life cover amount", placeholder: "e.g. ₹1 Crore", categoryTitle: "Insurance Solutions" },
    { name: "Car Insurance", desc: "Zero depreciation, instant policy renewal", wizardLabel: "Enter your car brand and model year", placeholder: "e.g. Hyundai i20, 2022", categoryTitle: "Insurance Solutions" },
    { name: "Bike Insurance", desc: "Third-party & comprehensive covers from ₹1.5/day", wizardLabel: "Enter your bike brand and model year", placeholder: "e.g. Royal Enfield, 2021", categoryTitle: "Insurance Solutions" },
    { name: "Personal Loan", desc: "Collateral-free instant cash up to ₹25 Lakhs", wizardLabel: "What is your required loan amount?", placeholder: "e.g. ₹5,000,000", categoryTitle: "Loan Offerings" },
    { name: "Home Loan", desc: "Low interest rates starting from 8.4% p.a.", wizardLabel: "What is the budget of the property?", placeholder: "e.g. ₹8,000,000", categoryTitle: "Loan Offerings" },
    { name: "Business Loan", desc: "SME working capital finance without security", wizardLabel: "What is your monthly business turnover?", placeholder: "e.g. ₹1,000,050", categoryTitle: "Loan Offerings" },
    { name: "Loan Against Property", desc: "Unlock liquidity against property security", wizardLabel: "What is estimated market value of property?", placeholder: "e.g. ₹15,000,000", categoryTitle: "Loan Offerings" },
    { name: "Mutual Funds Direct SIP", desc: "Save commissions, earn 1.5% extra returns", wizardLabel: "Desired monthly investment budget?", placeholder: "e.g. ₹5,005", categoryTitle: "Investments & Wealth" },
    { name: "Tax Saving Mutual Funds (ELSS)", desc: "Deduct up to ₹1.5L u/s 80C, high wealth growth", wizardLabel: "Annual tax-saving goal budget?", placeholder: "e.g. ₹150,000", categoryTitle: "Investments & Wealth" },
    { name: "Retirement & Pension", desc: "Create a stable recurring income portfolio", wizardLabel: "Desired retirement age?", placeholder: "e.g. 58", categoryTitle: "Investments & Wealth" },
    { name: "ITR Tax Filing", desc: "CA assisted income tax returns with maximum refund", wizardLabel: "What is your primary income source?", placeholder: "e.g. Salary, Business, Capital Gains", categoryTitle: "Tax & Compliance Support" },
  ];

  const filteredProducts = searchQuery
    ? searchProducts.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setSearchQuery("");
  };

  return (
    <section className="relative overflow-hidden pt-6 pb-10 sm:py-10 lg:py-12 font-sans border-b border-slate-100 min-h-[650px] flex flex-col justify-between">

      {/* Full-width Cover Background Image ONLY FOR DESKTOP/LAPTOP (lg+) */}
      <div className="hidden lg:block absolute top-0 left-0 right-0 h-[650px] z-0 pointer-events-none overflow-hidden">
        <img
          src="./hero_Finsocap.png"
          alt="Finsocap Hero Background"
          className="w-full h-full object-cover object-center lg:object-right"
        />
        {/* Soft white gradient overlay on left for optimal text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent w-full md:w-3/5 lg:w-1/2 pointer-events-none" />
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">

          {/* LEFT COLUMN: Main Content, Search & 3 Category Explore Pills */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            {/* Tagline */}
            <div className="inline-flex items-center gap-2 mb-3 sm:mb-5">
              <span className="text-[11px] sm:text-xs font-black uppercase tracking-widest text-[#0da687]">
                ALL-IN-ONE FINANCIAL SUPERMARKET
              </span>
              <span className="w-7 h-[2px] bg-[#0da687] rounded-full inline-block" />
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-[54px] xl:text-[60px] font-black tracking-tight leading-[1.1] text-slate-900">
              Compare & Save on{" "}
              <span className="text-[#0da687] block sm:inline">
                Loans, Insurance &
              </span>{" "}
              Mutual Funds
            </h1>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm md:text-base text-slate-600 mt-4 max-w-xl leading-relaxed font-normal">
              Smart financial choices, compared and simplified — all under one roof. Save up to 25% with our trusted guidance and fast CA-assisted compliance.
            </p>

            {/* Search Bar Pill */}
            <div className="w-full max-w-xl mt-6 sm:mt-7 relative z-30">
              <div className="flex items-center bg-white/95 backdrop-blur-md rounded-full shadow-2xl shadow-slate-200/80 p-1.5 border border-slate-100 transition-all focus-within:border-[#0da687]/50">
                <span className="pl-4 pr-1 text-slate-400">
                  <SearchIcon />
                </span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products (e.g. Car Insurance, Home Loan, Mutual Funds...)"
                  className="w-full bg-transparent text-slate-800 text-xs sm:text-sm font-medium outline-none py-2 px-2 placeholder:text-slate-400"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (searchQuery) {
                      const match = searchProducts.find(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
                      if (match) handleProductSelect(match);
                    }
                  }}
                  className="bg-[#3652a0] hover:bg-[#2b417d] text-white w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center shadow-md flex-shrink-0 transition-transform active:scale-95 cursor-pointer ml-1"
                >
                  <SearchIcon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </button>
              </div>

              {/* Suggester Popover */}
              {searchQuery && (
                <div className="absolute left-0 right-0 top-full mt-3 bg-white rounded-2xl shadow-2xl border border-slate-100 p-3 max-h-72 overflow-y-auto text-left z-50">
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((prod, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleProductSelect(prod)}
                        className="w-full text-left px-4 py-2.5 rounded-xl hover:bg-slate-50 transition-all flex items-center justify-between text-xs sm:text-sm font-semibold text-slate-700"
                      >
                        <span>{prod.name}</span>
                        <span className="text-[10px] text-[#0da687] uppercase bg-[#0da687]/10 px-2 py-0.5 rounded font-bold">
                          {prod.categoryTitle}
                        </span>
                      </button>
                    ))
                  ) : (
                    <p className="text-center py-4 text-xs text-slate-400 font-semibold">
                      No matching Finsocap product found. Try &ldquo;Health&rdquo;, &ldquo;Loan&rdquo;, or &ldquo;SIP&rdquo;.
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* 3 CATEGORY EXPLORE PILLS (Matching Exact Reference UI) */}
            <div className="grid grid-cols-3 gap-2.5 sm:gap-4 mt-6 sm:mt-8 w-full max-w-xl">
              {/* Card 1: Explore Insurance */}
              <button
                onClick={() => handleProductSelect(searchProducts[0])}
                className="bg-[#eff5fe]/95 backdrop-blur-sm hover:bg-[#e2eefa] rounded-2xl p-2.5 sm:p-3.5 flex items-center gap-2.5 sm:gap-3 transition-all cursor-pointer border border-[#d8e6fc]/60 shadow-xs hover:shadow-md text-left group"
              >
                <span className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#dbe8fc] text-[#1d6bf3] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                  <ShieldIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                </span>
                <div className="min-w-0">
                  <span className="block text-[11px] sm:text-xs font-medium text-slate-500 leading-tight">Explore</span>
                  <span className="block font-extrabold text-slate-900 text-xs sm:text-sm lg:text-[15px] leading-snug mt-0.5 truncate sm:whitespace-normal">
                    Insurance &rarr;
                  </span>
                </div>
              </button>

              {/* Card 2: Explore Loans */}
              <button
                onClick={() => handleProductSelect(searchProducts[4])}
                className="bg-[#eaf8f4]/95 backdrop-blur-sm hover:bg-[#d8f4ec] rounded-2xl p-2.5 sm:p-3.5 flex items-center gap-2.5 sm:gap-3 transition-all cursor-pointer border border-[#c6f2e6]/60 shadow-xs hover:shadow-md text-left group"
              >
                <span className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#cef2e8] text-[#0da687] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                  <HomeIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                </span>
                <div className="min-w-0">
                  <span className="block text-[11px] sm:text-xs font-medium text-slate-500 leading-tight">Explore</span>
                  <span className="block font-extrabold text-slate-900 text-xs sm:text-sm lg:text-[15px] leading-snug mt-0.5 truncate sm:whitespace-normal">
                    Loans &rarr;
                  </span>
                </div>
              </button>

              {/* Card 3: Explore Investments */}
              <button
                onClick={() => handleProductSelect(searchProducts[8])}
                className="bg-[#f5eefc]/95 backdrop-blur-sm hover:bg-[#ebe2fa] rounded-2xl p-2.5 sm:p-3.5 flex items-center gap-2.5 sm:gap-3 transition-all cursor-pointer border border-[#eadafa]/60 shadow-xs hover:shadow-md text-left group"
              >
                <span className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#e8d7fa] text-[#8b5cf6] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                  <ChartIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                </span>
                <div className="min-w-0">
                  <span className="block text-[11px] sm:text-xs font-medium text-slate-500 leading-tight">Explore</span>
                  <span className="block font-extrabold text-slate-900 text-xs sm:text-sm lg:text-[15px] leading-snug mt-0.5 truncate sm:whitespace-normal">
                    Investments &rarr;
                  </span>
                </div>
              </button>
            </div>

          </div>

          {/* RIGHT COLUMN ON DESKTOP & DEDICATED HERO SECTION ON MOBILE/TABLET (ALWAYS VISIBLE) */}
          <div className="w-full lg:col-span-6 relative min-h-[380px] sm:min-h-[440px] lg:h-[500px] xl:h-[540px] justify-center items-center rounded-3xl overflow-hidden lg:overflow-visible shadow-md lg:shadow-none my-4 lg:my-0 z-10 border border-slate-100/80 lg:border-none">

            {/* Background Image for Mobile/Tablet within the dedicated Hero container */}
            <div className="block lg:hidden absolute inset-0 z-0 pointer-events-none">
              <img
                src="./Hero_Finsocap.png"
                alt="Finsocap Hero Background"
                className="w-full h-full object-cover object-right sm:object-[90%_center]"
              />
            </div>

            {/* Floating Animated Card 1: Car Insurance */}
            <button
              onClick={() => handleProductSelect(searchProducts[2])}
              className="animate-float-slow absolute top-[4%] sm:top-[5%] lg:top-[4%] left-[16%] sm:left-[24%] lg:left-[28%] xl:left-[30%] z-20 min-w-[155px] sm:min-w-[195px] xl:min-w-[215px] bg-white/95 backdrop-blur-md px-2.5 py-1.5 sm:px-4 sm:py-3 rounded-2xl shadow-xl border border-slate-100/90 flex items-center justify-between gap-2 sm:gap-3 hover:scale-105 transition-all cursor-pointer text-left"
            >
              <div className="flex items-center gap-2 sm:gap-2.5">
                <span className="w-7 h-7 sm:w-9 sm:h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                  <CarIcon className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
                </span>
                <div>
                  <span className="block font-extrabold text-slate-800 text-[10px] sm:text-xs xl:text-sm whitespace-nowrap">Car Insurance</span>
                  <span className="block text-[8px] sm:text-[10px] xl:text-xs text-slate-400 font-medium whitespace-nowrap">From ₹2,499/year</span>
                </div>
              </div>
              <ChevronRightIcon />
            </button>

            {/* Floating Animated Card 2: Home Loan */}
            <button
              onClick={() => handleProductSelect(searchProducts[5])}
              className="animate-float-delayed absolute top-[28%] sm:top-[26%] lg:top-[22%] left-[2%] lg:left-[2%] xl:left-[4%] z-20 min-w-[155px] sm:min-w-[195px] xl:min-w-[215px] bg-white/95 backdrop-blur-md px-2.5 py-1.5 sm:px-4 sm:py-3 rounded-2xl shadow-xl border border-slate-100/90 flex items-center justify-between gap-2 sm:gap-3 hover:scale-105 transition-all cursor-pointer text-left"
            >
              <div className="flex items-center gap-2 sm:gap-2.5">
                <span className="w-7 h-7 sm:w-9 sm:h-9 rounded-xl bg-emerald-50 text-[#0da687] flex items-center justify-center flex-shrink-0">
                  <HomeIcon className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
                </span>
                <div>
                  <span className="block font-extrabold text-slate-800 text-[10px] sm:text-xs xl:text-sm whitespace-nowrap">Home Loan</span>
                  <span className="block text-[8px] sm:text-[10px] xl:text-xs text-slate-400 font-medium whitespace-nowrap">Compare 20+ banks</span>
                </div>
              </div>
              <ChevronRightIcon />
            </button>

            {/* Floating Animated Card 3: Mutual Funds */}
            <button
              onClick={() => handleProductSelect(searchProducts[8])}
              className="animate-float-reverse absolute top-[52%] sm:top-[48%] lg:top-[30%] right-[2%] lg:right-[3%] xl:right-[-7%] z-20 min-w-[155px] sm:min-w-[195px] xl:min-w-[215px] bg-white/95 backdrop-blur-md px-2.5 py-1.5 sm:px-4 sm:py-3 rounded-2xl shadow-xl border border-slate-100/90 flex items-center justify-between gap-2 sm:gap-3 hover:scale-105 transition-all cursor-pointer text-left"
            >
              <div className="flex items-center gap-2 sm:gap-2.5">
                <span className="w-7 h-7 sm:w-9 sm:h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0">
                  <ChartIcon className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
                </span>
                <div>
                  <span className="block font-extrabold text-slate-800 text-[10px] sm:text-xs xl:text-sm whitespace-nowrap">Mutual Funds</span>
                  <span className="block text-[8px] sm:text-[10px] xl:text-xs text-slate-400 font-medium whitespace-nowrap">Start with ₹500</span>
                </div>
              </div>
              <ChevronRightIcon />
            </button>

            {/* Floating Animated Organic Mint Teal Badge */}
            <div className="animate-float-badge absolute bottom-3 sm:bottom-6 lg:bottom-8 right-2 sm:right-4 xl:right-4 z-20 bg-gradient-to-r from-[#0da687] to-[#14b8a6] text-white px-3 py-1.5 sm:px-4 sm:py-2.5 rounded-3xl shadow-xl flex items-center gap-1.5 sm:gap-2.5 border border-white/20">
              <span className="w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                <LeafIcon className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-white" />
              </span>
              <div className="text-left">
                <span className="block text-[9px] sm:text-xs font-bold leading-tight whitespace-nowrap">Your Financial Goals, Our Priority</span>
                <span className="block w-8 sm:w-12 h-[2px] bg-white/50 rounded-full mt-0.5 sm:mt-1" />
              </div>
            </div>

          </div>

        </div>

        {/* BOTTOM STATS & TRUST BAR */}
        <div className="mt-8 sm:mt-10 bg-white/90 backdrop-blur-md border border-slate-100 rounded-3xl sm:rounded-full p-4 sm:p-6 shadow-sm relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-100 gap-4 md:gap-0">
            {/* Stat 1 */}
            <div className="flex items-center gap-3 justify-center px-4 py-2 md:py-0">
              <div className="p-2.5 rounded-2xl bg-slate-50 text-slate-700">
                <UsersIcon className="w-6 h-6" />
              </div>
              <div className="text-left">
                <span className="block font-black text-slate-900 text-lg sm:text-xl leading-none">10L+</span>
                <span className="block text-xs text-slate-500 font-medium mt-1">Happy Customers</span>
              </div>
            </div>

            {/* Stat 2 */}
            <div className="flex items-center gap-3 justify-center px-4 py-2 md:py-0">
              <div className="p-2.5 rounded-2xl bg-slate-50 text-slate-700">
                <ShieldCheckIcon className="w-6 h-6" />
              </div>
              <div className="text-left">
                <span className="block font-black text-slate-900 text-lg sm:text-xl leading-none">50+</span>
                <span className="block text-xs text-slate-500 font-medium mt-1">Trusted Partners</span>
              </div>
            </div>

            {/* Stat 3 */}
            <div className="flex items-center gap-3 justify-center px-4 py-2 md:py-0">
              <div className="p-2.5 rounded-2xl bg-slate-50 text-slate-700">
                <StarIcon className="w-6 h-6" />
              </div>
              <div className="text-left">
                <span className="block font-black text-slate-900 text-lg sm:text-xl leading-none">4.8/5</span>
                <span className="block text-xs text-slate-500 font-medium mt-1">Customer Rating</span>
              </div>
            </div>

            {/* Stat 4 */}
            <div className="flex items-center gap-3 justify-center px-4 py-2 md:py-0">
              <div className="p-2.5 rounded-2xl bg-slate-50 text-slate-700">
                <HeadsetIcon className="w-6 h-6" />
              </div>
              <div className="text-left">
                <span className="block font-black text-slate-900 text-sm sm:text-base leading-snug">Expert Support</span>
                <span className="block text-xs text-slate-500 font-medium">At Every Step</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Quote Aggregator Wizard Modal Overlay */}
      {selectedProduct && (
        <ComparisonWizard
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onRequestCallback={onRequestCallback}
        />
      )}
    </section>
  );
}
