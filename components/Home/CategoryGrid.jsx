"use client";

import { useState } from "react";
import ComparisonWizard from "./ComparisonWizard";

export default function CategoryGrid({ onRequestCallback }) {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const categories = [
    {
      id: "insurance",
      title: "Insurance Solutions",
      subtitle: "Complete protection for what matters most.",
      tagline: "Secure Today. Brighter Tomorrow.",
      image: "/Insurance.png",
      theme: {
        cardBg: "bg-gradient-to-br from-[#ebf5ff] via-[#f2f8ff] to-[#e0effe]",
        borderColor: "border-[#cce3fd]",
        headerIconBg: "bg-sky-500/10 text-sky-600 border border-sky-200/50",
        viewAllBg: "bg-sky-100/60 hover:bg-sky-200/70 text-sky-700",
        viewAllArrow: "bg-sky-600 text-white",
        prodIconBg: "bg-sky-50 text-sky-600 group-hover:bg-sky-100",
        arrowBg: "bg-sky-100/70 text-sky-600 group-hover:bg-sky-600 group-hover:text-white",
        dots: ["bg-sky-600", "bg-sky-400", "bg-sky-300"],
      },
      categoryIcon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
      products: [
        {
          name: "Health Insurance",
          desc: "Cashless hospitalization & tax savings u/s 80D",
          wizardLabel: "What is the age of the eldest family member?",
          placeholder: "e.g. 45",
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.72-8.72 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              <path d="M12 8v4l3 3" />
            </svg>
          ),
        },
        {
          name: "Term Life Insurance",
          desc: "Instant term quotes up to ₹1 Crore cover",
          wizardLabel: "Select desired life cover amount",
          placeholder: "e.g. ₹1 Crore",
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M12 2v2m0 0a8 8 0 0 1 8 8H4a8 8 0 0 1 8-8zm0 10v7a2 2 0 0 1-4 0" />
            </svg>
          ),
        },
        {
          name: "Car Insurance",
          desc: "Zero depreciation, instant policy renewal",
          wizardLabel: "Enter your car brand and model year",
          placeholder: "e.g. Hyundai i20, 2022",
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M5 17h14M5 17a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm14 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM3 15l2-5h14l2 5M5 10l1-3h12l1 3" />
            </svg>
          ),
        },
        {
          name: "Bike Insurance",
          desc: "Third-party & comprehensive covers from ₹1.5/day",
          wizardLabel: "Enter your bike brand and model year",
          placeholder: "e.g. Royal Enfield, 2021",
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="5.5" cy="17.5" r="3.5" />
              <circle cx="18.5" cy="17.5" r="3.5" />
              <path d="M15 6h4M12 17.5l-3-7.5H4.5M12 17.5l4-7.5h2.5M12 17.5V10" />
            </svg>
          ),
        },
      ],
    },
    {
      id: "loans",
      title: "Loan Offerings",
      subtitle: "Flexible loans for every goal in life.",
      tagline: "Bigger Dreams. Brighter Possibilities.",
      image: "/loans.png",
      theme: {
        cardBg: "bg-gradient-to-br from-[#f2effe] via-[#f7f5ff] to-[#eae6fe]",
        borderColor: "border-[#e0d8fe]",
        headerIconBg: "bg-indigo-500/10 text-indigo-600 border border-indigo-200/50",
        viewAllBg: "bg-indigo-100/60 hover:bg-indigo-200/70 text-indigo-700",
        viewAllArrow: "bg-indigo-600 text-white",
        prodIconBg: "bg-indigo-50 text-indigo-600 group-hover:bg-indigo-100",
        arrowBg: "bg-indigo-100/70 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white",
        dots: ["bg-indigo-600", "bg-indigo-400", "bg-indigo-300"],
      },
      categoryIcon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
          <rect x="3" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" />
        </svg>
      ),
      products: [
        {
          name: "Personal Loan",
          desc: "Collateral-free instant cash starting from @ 9.99%*",
          wizardLabel: "What is your required loan amount?",
          placeholder: "e.g. ₹5,000,000",
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          ),
        },
        {
          name: "Home Loan",
          desc: "Home finance solutions starting from @ 7.25%*",
          wizardLabel: "What is the budget of the property?",
          placeholder: "e.g. ₹8,000,000",
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          ),
        },
        {
          name: "Business Loan",
          desc: "SME working capital finance starting from @ 10.50%*",
          wizardLabel: "What is your monthly business turnover?",
          placeholder: "e.g. ₹1,000,050",
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
            </svg>
          ),
        },
        {
          name: "Loan Against Property",
          desc: "Unlock asset-secured liquidity starting from @ 9.50%*",
          wizardLabel: "What is the estimated market value of property?",
          placeholder: "e.g. ₹15,000,000",
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18" />
              <path d="M6 12h12M6 7h12M6 17h12" />
            </svg>
          ),
        },
      ],
    },
    {
      id: "investments",
      title: "Investments & Wealth",
      subtitle: "Grow your wealth with expert guidance.",
      tagline: "Invest Smart. Live Better.",
      image: "/inverstments.png",
      theme: {
        cardBg: "bg-gradient-to-br from-[#ebfef5] via-[#f3fdf8] to-[#dcfce7]",
        borderColor: "border-[#bbf7d0]",
        headerIconBg: "bg-emerald-500/10 text-emerald-600 border border-emerald-200/50",
        viewAllBg: "bg-emerald-100/60 hover:bg-emerald-200/70 text-emerald-700",
        viewAllArrow: "bg-emerald-600 text-white",
        prodIconBg: "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100",
        arrowBg: "bg-emerald-100/70 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white",
        dots: ["bg-emerald-600", "bg-emerald-400", "bg-emerald-300"],
      },
      categoryIcon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
          <path d="M18 20V10M12 20V4M6 20v-6" />
        </svg>
      ),
      products: [
        {
          name: "Mutual Funds Direct SIP",
          desc: "Save commissions, earn 1.5% extra returns",
          wizardLabel: "Desired monthly investment budget?",
          placeholder: "e.g. ₹5,000",
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M12 10a6 6 0 0 0-6-6H3v3a6 6 0 0 0 6 6h3zm0 0a6 6 0 0 1 6-6h3v3a6 6 0 0 1-6 6h-3zm0 0v11" />
            </svg>
          ),
        },
        {
          name: "Tax Saving Mutual Funds (ELSS)",
          desc: "Deduct up to ₹1.5L u/s 80C, high wealth growth",
          wizardLabel: "Annual tax-saving goal budget?",
          placeholder: "e.g. ₹150,000",
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <ellipse cx="12" cy="6" rx="8" ry="3" />
              <path d="M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6" />
              <path d="M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" />
            </svg>
          ),
        },
        {
          name: "Retirement & Pension",
          desc: "Create a stable recurring income portfolio",
          wizardLabel: "Desired retirement age?",
          placeholder: "e.g. 58",
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3M3 11v5a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5M5 18v3M19 18v3" />
            </svg>
          ),
        },
      ],
    },
    {
      id: "consultancy",
      title: "Finance Consultancy",
      subtitle: "Expert advisory for a stronger financial future.",
      tagline: "Your Goals. Our Guidance.",
      image: "/finance-.png",
      theme: {
        cardBg: "bg-gradient-to-br from-[#fffbeb] via-[#fffdf5] to-[#fef3c7]",
        borderColor: "border-[#fde68a]",
        headerIconBg: "bg-amber-500/10 text-amber-600 border border-amber-200/50",
        viewAllBg: "bg-amber-100/60 hover:bg-amber-200/70 text-amber-700",
        viewAllArrow: "bg-amber-600 text-white",
        prodIconBg: "bg-amber-50 text-amber-600 group-hover:bg-amber-100",
        arrowBg: "bg-amber-100/70 text-amber-600 group-hover:bg-amber-600 group-hover:text-white",
        dots: ["bg-amber-600", "bg-amber-400", "bg-amber-300"],
      },
      categoryIcon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
        </svg>
      ),
      products: [
        {
          name: "ITR Tax Filing",
          desc: "CA assisted income tax returns with maximum refund",
          wizardLabel: "What is your primary income source?",
          placeholder: "e.g. Salary, Business, Capital Gains",
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
            </svg>
          ),
        },
        {
          name: "GST Compliance & Returns",
          desc: "Monthly reconciliation, filings & registrations",
          wizardLabel: "Number of monthly sales invoices (estimate)?",
          placeholder: "e.g. 150",
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
              <path d="M22 12A10 10 0 0 0 12 2v10z" />
            </svg>
          ),
        },
        {
          name: "Corporate Incorporation",
          desc: "Start a Private Limited, LLP, or partnership firm",
          wizardLabel: "Proposed company type (LLP/Pvt Ltd)?",
          placeholder: "e.g. Pvt Ltd",
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          ),
        },
      ],
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-slate-50/50 font-sans">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            One Roof. Complete Financial Solutions.
          </h2>
          <p className="text-slate-500 mt-2.5 max-w-xl mx-auto text-sm sm:text-base">
            Explore our comprehensive range of financial, insurance, investment, and business advisory services tailored for you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className={`relative overflow-hidden rounded-3xl p-6 sm:p-8 border shadow-sm transition-all duration-300 hover:shadow-lg flex flex-col justify-between ${cat.theme.cardBg} ${cat.theme.borderColor}`}
            >
              {/* Top Header Row */}
              <div className="relative z-10">
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div className="flex items-center gap-3.5">
                    <span
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm ${cat.theme.headerIconBg}`}
                    >
                      {cat.categoryIcon}
                    </span>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug">
                        {cat.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
                        {cat.subtitle}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Sub-products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 mb-8">
                  {cat.products.map((prod, pIdx) => (
                    <button
                      key={pIdx}
                      onClick={() => setSelectedProduct(prod)}
                      className="group bg-white hover:bg-slate-50/90 border border-white/80 hover:border-slate-200/80 p-4 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 text-left flex items-center justify-between gap-3 min-h-[92px]"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span
                          className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${cat.theme.prodIconBg}`}
                        >
                          {prod.icon}
                        </span>
                        <div className="min-w-0">
                          <h4 className="font-bold text-slate-800 text-xs sm:text-sm truncate group-hover:text-slate-900">
                            {prod.name}
                          </h4>
                          <p className="text-[11px] sm:text-xs text-slate-500 line-clamp-2 mt-0.5 leading-snug">
                            {prod.desc}
                          </p>
                        </div>
                      </div>

                      <span
                        className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200 ${cat.theme.arrowBg}`}
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Bottom Tagline & Decorative Illustration */}
              <div className="relative z-10 flex items-center justify-between pt-2">
                <div className="flex items-center gap-2.5">
                  <div className="flex items-center gap-1">
                    {cat.theme.dots.map((dotClass, dIdx) => (
                      <span
                        key={dIdx}
                        className={`h-1.5 rounded-full ${dIdx === 0 ? "w-3" : "w-1.5"} ${dotClass}`}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-medium text-slate-500 tracking-tight">
                    {cat.tagline}
                  </span>
                </div>
              </div>

              {/* Background Illustration covering the card */}
              <img
                src={cat.image}
                alt={cat.title}
                className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none z-0 opacity-50 transition-opacity duration-500 hover:opacity-60"
              />
            </div>
          ))}
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
