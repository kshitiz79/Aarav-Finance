"use client";

import { useState } from "react";
import ComparisonWizard from "./ComparisonWizard";

// Custom inline SVG SearchIcon
const SearchIcon = () => (
  <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
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
    { name: "GST Compliance & Returns", desc: "Monthly reconciliation, filings & registrations", wizardLabel: "Number of monthly sales invoices (estimate)?", placeholder: "e.g. 150", categoryTitle: "Tax & Compliance Support" },
    { name: "Corporate Incorporation", desc: "Start a Private Limited, LLP, or partnership firm", wizardLabel: "Proposed company type (LLP/Pvt Ltd)?", placeholder: "e.g. Pvt Ltd", categoryTitle: "Tax & Compliance Support" },
  ];

  const filteredProducts = searchQuery
    ? searchProducts.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setSearchQuery("");
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50/20 text-slate-800 py-20 lg:py-28 font-sans border-b border-slate-100">
      {/* Decorative colored spots */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-teal/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-blue/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10 text-center flex flex-col items-center">
        <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-widest bg-brand-teal/10 text-brand-teal px-4 py-1.5 rounded-full mb-6">
          All-In-One Financial Supermarket
        </span>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight max-w-3xl text-slate-850">
          Compare & Save on <span className="text-brand-blue">Loans, Insurance</span> & Mutual Funds
        </h1>
        <p className="text-sm sm:text-lg text-slate-500 mt-6 max-w-2xl leading-relaxed">
          Finsocap provides finance and insurance services, offering complete financial solutions under one roof. Save up to 25% with our trusted guidance and fast CA-assisted compliance.
        </p>

        {/* Search Input bar */}
        <div className="w-full max-w-xl mt-10 relative">
          <div className="flex bg-white rounded-full shadow-lg p-1.5 border border-slate-200">
            <span className="flex items-center pl-4 pr-2">
              <SearchIcon />
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products (e.g. Car Insurance, Home Loan, Mutual Funds...)"
              className="w-full bg-transparent text-slate-800 text-sm outline-none py-2.5 pr-4 placeholder:text-slate-400"
            />
          </div>

          {/* Suggester popover */}
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
                    <span className="text-[10px] text-brand-teal uppercase bg-brand-teal/10 px-2 py-0.5 rounded font-bold">
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
