"use client";

import { useState } from "react";
import ComparisonWizard from "./ComparisonWizard";

export default function CategoryGrid({ onRequestCallback }) {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const categories = [
    {
      title: "Insurance Solutions",
      color: "border-sky-100 bg-sky-50/30",
      iconBg: "bg-sky-500/10 text-sky-600",
      iconSvg: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
      products: [
        { name: "Health Insurance", desc: "Cashless hospitalization & tax savings u/s 80D", wizardLabel: "What is the age of the eldest family member?", placeholder: "e.g. 45" },
        { name: "Term Life Insurance", desc: "Instant term quotes up to ₹1 Crore cover", wizardLabel: "Select desired life cover amount", placeholder: "e.g. ₹1 Crore" },
        { name: "Car Insurance", desc: "Zero depreciation, instant policy renewal", wizardLabel: "Enter your car brand and model year", placeholder: "e.g. Hyundai i20, 2022" },
        { name: "Bike Insurance", desc: "Third-party & comprehensive covers from ₹1.5/day", wizardLabel: "Enter your bike brand and model year", placeholder: "e.g. Royal Enfield, 2021" },
      ]
    },
    {
      title: "Loan Offerings",
      color: "border-indigo-100 bg-indigo-50/30",
      iconBg: "bg-indigo-500/10 text-indigo-600",
      iconSvg: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <line x1="12" y1="4" x2="12" y2="20" />
          <line x1="2" y1="12" x2="22" y2="12" />
        </svg>
      ),
      products: [
        { name: "Personal Loan", desc: "Collateral-free instant cash up to ₹25 Lakhs", wizardLabel: "What is your required loan amount?", placeholder: "e.g. ₹5,000,000" },
        { name: "Home Loan", desc: "Low interest rates starting from 8.4% p.a.", wizardLabel: "What is the budget of the property?", placeholder: "e.g. ₹8,000,000" },
        { name: "Business Loan", desc: "SME working capital finance without security", wizardLabel: "What is your monthly business turnover?", placeholder: "e.g. ₹1,000,050" },
        { name: "Loan Against Property", desc: "Unlock high-value liquidity against asset security", wizardLabel: "What is the estimated market value of property?", placeholder: "e.g. ₹15,000,000" },
      ]
    },
    {
      title: "Investments & Wealth",
      color: "border-teal-100 bg-teal-50/30",
      iconBg: "bg-teal-500/10 text-teal-600",
      iconSvg: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      ),
      products: [
        { name: "Mutual Funds Direct SIP", desc: "Save commissions, earn 1.5% extra returns", wizardLabel: "Desired monthly investment budget?", placeholder: "e.g. ₹5,000" },
        { name: "Tax Saving Mutual Funds (ELSS)", desc: "Deduct up to ₹1.5L u/s 80C, high wealth growth", wizardLabel: "Annual tax-saving goal budget?", placeholder: "e.g. ₹150,000" },
        { name: "Retirement & Pension", desc: "Create a stable recurring income portfolio", wizardLabel: "Desired retirement age?", placeholder: "e.g. 58" },
      ]
    },
    {
      title: "Tax & Compliance Support",
      color: "border-amber-100 bg-amber-50/30",
      iconBg: "bg-amber-500/10 text-amber-600",
      iconSvg: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      ),
      products: [
        { name: "ITR Tax Filing", desc: "CA assisted income tax returns with maximum refund", wizardLabel: "What is your primary income source?", placeholder: "e.g. Salary, Business, Capital Gains" },
        { name: "GST Compliance & Returns", desc: "Monthly reconciliation, filings & registrations", wizardLabel: "Number of monthly sales invoices (estimate)?", placeholder: "e.g. 150" },
        { name: "Corporate Incorporation", desc: "Start a Private Limited, LLP, or partnership firm", wizardLabel: "Proposed company type (LLP/Pvt Ltd)?", placeholder: "e.g. Pvt Ltd" },
      ]
    }
  ];

  return (
    <section className="py-20 bg-white font-sans">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
            One Roof. Complete Financial Solutions.
          </h2>
          <p className="text-slate-500 mt-2 max-w-lg mx-auto text-sm">
            Click on any product to launch the instant quote aggregator wizard and compare rates.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className={`border rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-sm transition-all duration-300 hover:shadow-md ${cat.color}`}
            >
              <div>
                <div className="flex items-center gap-3.5 mb-6">
                  <span className={`w-12 h-12 rounded-2xl flex items-center justify-center ${cat.iconBg}`}>
                    {cat.iconSvg}
                  </span>
                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-800">
                    {cat.title}
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {cat.products.map((prod, pIdx) => (
                    <button
                      key={pIdx}
                      onClick={() => setSelectedProduct(prod)}
                      className="text-left bg-white hover:bg-slate-50 border border-slate-100 p-4 rounded-2xl transition-all duration-200 group flex flex-col justify-between min-h-[110px]"
                    >
                      <span className="font-bold text-slate-700 group-hover:text-brand-blue transition-colors text-sm sm:text-base">
                        {prod.name}
                      </span>
                      <p className="text-[11px] sm:text-xs text-slate-450 mt-1 leading-relaxed">
                        {prod.desc}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
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
