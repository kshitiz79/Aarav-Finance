"use client";

import React, { useState } from "react";
import Link from "next/link";

interface ProductDetails {
  title: string;
  desc: string;
  tagline: string;
  defaultPrincipal: number;
  minPrincipal: number;
  maxPrincipal: number;
  principalStep: number;
  defaultRate: number;
  defaultYears: number;
  features: string[];
  faqs: { q: string; a: string }[];
}

const loanData: Record<string, ProductDetails> = {
  personal: {
    title: "Personal Loan Offers",
    desc: "Unsecured cash loans with low interest rates, instant approvals, and zero collateral required.",
    tagline: "Get quick approval personal loans from ₹50,000 up to ₹25 Lakhs",
    defaultPrincipal: 500000,
    minPrincipal: 50000,
    maxPrincipal: 2500000,
    principalStep: 50000,
    defaultRate: 10.99,
    defaultYears: 5,
    features: [
      "No collateral or security needed",
      "Instant paperless verification in 10 minutes",
      "Flexible tenure options from 1 to 5 years",
      "Interest rates starting from 10.49% p.a."
    ],
    faqs: [
      { q: "What is the minimum salary eligibility for a personal loan?", a: "Most partner banks require a minimum net monthly salary of ₹15,000 to ₹25,000, depending on the employer category and location." },
      { q: "Can I preclose my personal loan early?", a: "Yes, you can preclose your loan, though some lenders charge foreclosure charges ranging from 2% to 4% of the outstanding principal." }
    ]
  },
  home: {
    title: "Home Loan Solutions",
    desc: "Achieve homeownership with customized home finance solutions, lowest interest rates, and balance transfer options.",
    tagline: "Secure home loans at competitive rates starting from 8.40% p.a.",
    defaultPrincipal: 4000000,
    minPrincipal: 500000,
    maxPrincipal: 100000000,
    principalStep: 100000,
    defaultRate: 8.5,
    defaultYears: 20,
    features: [
      "Tenure up to 30 years for lower monthly EMIs",
      "Hassle-free loan balance transfer from other banks",
      "Pradhan Mantri Awas Yojana (PMAY) subsidy guidance",
      "No foreclosure charges on floating interest rates"
    ],
    faqs: [
      { q: "What documents are required for home loans?", a: "Standard requirements include: Identity proof, Address proof, Income proof (Form 16/3 months salary slips for salaried, or 2 years ITR filings for self-employed), and Property documents." },
      { q: "How is my home loan eligibility calculated?", a: "Lenders look at your monthly net income, age, credit score (usually 750+), and your existing monthly EMI liabilities to decide your max loan eligibility." }
    ]
  },
  business: {
    title: "Business Loan Solutions",
    desc: "Fund your business growth, manage working capital requirements, or buy machinery with collateral-free SME business loans.",
    tagline: "Collateral-free commercial finance up to ₹50 Lakhs with minimum paperwork",
    defaultPrincipal: 1500000,
    minPrincipal: 100000,
    maxPrincipal: 5000000,
    principalStep: 50000,
    defaultRate: 14.5,
    defaultYears: 3,
    features: [
      "No security or asset mortgage required",
      "Quick disbursal within 48 to 72 hours",
      "Structured repayments tailored to cashflow seasonal cycles",
      "Available for startups, retailers, and manufacturers"
    ],
    faqs: [
      { q: "What is the minimum business vintage required?", a: "Lenders usually require a minimum business running vintage of 2 years with a profitable operational track record." },
      { q: "What is the interest rate for SME business loans?", a: "Interest rates range between 13% and 19% p.a., depending on the business category, turnover, and credit risk parameters." }
    ]
  },
  property: {
    title: "Loan Against Property (LAP)",
    desc: "Unlock high-value liquidity by mortgaging your residential, commercial, or industrial properties.",
    tagline: "Secure high-limit loans up to 70% of property market value u/s low rates",
    defaultPrincipal: 5000000,
    minPrincipal: 1000000,
    maxPrincipal: 150000000,
    principalStep: 200000,
    defaultRate: 9.5,
    defaultYears: 15,
    features: [
      "Lower interest rates compared to personal loans",
      "Long repayment tenure up to 15 years",
      "Property remains in your complete active possession",
      "Can be used for business growth, child education, or debt consolidation"
    ],
    faqs: [
      { q: "Can co-owned property be used for LAP?", a: "Yes, you can apply using a co-owned property, provided all co-owners of the property join as co-applicants for the loan." },
      { q: "Does the bank verify property valuation?", a: "Yes, Finsocap's partner banks perform independent legal checks and a physical property valuation inspection to establish the fair market valuation." }
    ]
  }
};

export default function LoansPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = React.use(params);
  const data = loanData[slug];

  const [principal, setPrincipal] = useState(data ? data.defaultPrincipal : 1000000);
  const [rate, setRate] = useState(data ? data.defaultRate : 8.5);
  const [years, setYears] = useState(data ? data.defaultYears : 15);
  const [showApplyQuotes, setShowApplyQuotes] = useState(false);
  const [callbackName, setCallbackName] = useState("");
  const [callbackPhone, setCallbackPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  if (!data) {
    return (
      <div className="container mx-auto py-20 text-center font-sans">
        <h2 className="text-2xl font-bold">Loan category not found</h2>
        <Link href="/" className="text-brand-blue hover:underline mt-4 inline-block">
          Return to home page
        </Link>
      </div>
    );
  }

  // Live EMI calculation logic
  const calculateEMI = () => {
    const P = principal;
    const r = rate / 12 / 100;
    const n = years * 12;
    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = emi * n;
    const totalInterest = totalPayment - P;
    return {
      monthly: Math.round(emi).toLocaleString("en-IN"),
      interest: Math.round(totalInterest).toLocaleString("en-IN"),
      total: Math.round(totalPayment).toLocaleString("en-IN"),
      percentInterest: (totalInterest / totalPayment) * 100
    };
  };

  const emiRes = calculateEMI();

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (callbackName && callbackPhone) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setShowApplyQuotes(false);
        setCallbackName("");
        setCallbackPhone("");
      }, 4000);
    }
  };

  const simulatedOffers = [
    { lender: "Lender Alpha (Top Private)", rate: `${(rate - 0.2).toFixed(2)}%`, processing: "0.5% fee", rating: "4.9/5" },
    { lender: "Lender Beta (Public Trusted)", rate: `${rate.toFixed(2)}%`, processing: "Flat ₹2,500 fee", rating: "4.8/5" },
    { lender: "Lender Gamma (MNC Bank)", rate: `${(rate + 0.15).toFixed(2)}%`, processing: "Zero fee promo", rating: "4.7/5" }
  ];

  return (
    <div className="bg-white text-slate-800 font-sans min-h-screen py-10">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Breadcrumb */}
        <div className="text-xs text-slate-400 mb-6 flex gap-2 font-semibold">
          <Link href="/" className="hover:text-brand-blue">Home</Link>
          <span>/</span>
          <span className="text-slate-600">Loans</span>
          <span>/</span>
          <span className="text-brand-blue font-bold capitalize">{slug}</span>
        </div>

        {/* Hero description */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          <div className="lg:col-span-7">
            <span className="text-brand-blue text-xs font-extrabold uppercase tracking-widest bg-brand-blue/10 px-3 py-1 rounded-full">
              Loan Offerings
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-slate-850 mt-4 leading-tight">
              {data.title}
            </h1>
            <p className="text-slate-500 text-sm sm:text-base mt-4 max-w-xl leading-relaxed">
              {data.desc}
            </p>
            <p className="text-brand-teal text-xs sm:text-sm mt-2 font-bold leading-relaxed">
              ★ {data.tagline}
            </p>

            {/* Feature lists */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              {data.features.map((feat, idx) => (
                <div key={idx} className="flex gap-2.5 items-start bg-slate-50 border border-slate-100 p-4 rounded-xl shadow-sm">
                  <span className="text-brand-teal font-bold">✓</span>
                  <span className="text-xs font-semibold text-slate-600 leading-snug">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Calculator widget card */}
          <div className="lg:col-span-5 bg-slate-50 border border-slate-150 p-6 sm:p-8 rounded-3xl shadow-md">
            <h3 className="font-extrabold text-slate-850 text-base mb-6">
              Calculate Loan EMI
            </h3>

            {showApplyQuotes ? (
              /* Quotations or Application wizard */
              <div className="flex flex-col gap-4">
                {submitted ? (
                  <div className="text-center py-6">
                    <span className="inline-flex w-12 h-12 rounded-full bg-brand-teal/10 text-brand-teal items-center justify-center text-xl font-bold mb-4">
                      ✓
                    </span>
                    <h4 className="font-bold text-slate-800 text-sm">Application Sent!</h4>
                    <p className="text-[10px] text-slate-450 mt-1">Our advisor will connect with you to process documents.</p>
                  </div>
                ) : (
                  <form onSubmit={handleApplySubmit} className="flex flex-col gap-4">
                    <span className="text-[11px] text-brand-blue bg-brand-blue/5 p-3 rounded-lg font-bold">
                      Compare Partner Offers on: ₹{principal.toLocaleString("en-IN")}
                    </span>

                    <div className="flex flex-col gap-2 max-h-56 overflow-y-auto mb-2">
                      {simulatedOffers.map((off, oIdx) => (
                        <div key={oIdx} className="bg-white border border-slate-100 p-3.5 rounded-xl flex justify-between items-center shadow-xs">
                          <div>
                            <h5 className="font-bold text-xs text-slate-700">{off.lender}</h5>
                            <p className="text-[10px] text-slate-450 mt-0.5">{off.processing}</p>
                          </div>
                          <span className="text-brand-teal font-extrabold text-xs sm:text-sm">{off.rate}</span>
                        </div>
                      ))}
                    </div>

                    <div>
                      <label className="block text-[9px] font-bold text-slate-450 uppercase mb-1">Your Name</label>
                      <input
                        type="text"
                        required
                        value={callbackName}
                        onChange={(e) => setCallbackName(e.target.value)}
                        placeholder="e.g. Amit Sharma"
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs outline-none focus:border-brand-blue text-slate-800"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-bold text-slate-450 uppercase mb-1">Phone Number</label>
                      <input
                        type="tel"
                        required
                        pattern="[0-9]{10}"
                        value={callbackPhone}
                        onChange={(e) => setCallbackPhone(e.target.value)}
                        placeholder="e.g. 9876543210"
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs outline-none focus:border-brand-blue text-slate-800"
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-brand-teal hover:bg-brand-teal-hover text-white text-xs font-bold py-2.5 rounded-xl transition-all cursor-pointer text-center mt-2 shadow-md shadow-brand-teal/10"
                    >
                      Secure Low Rate Offer &rarr;
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowApplyQuotes(false)}
                      className="text-[10px] text-slate-400 hover:text-slate-600 font-semibold text-center"
                    >
                      &larr; Return to calculator
                    </button>
                  </form>
                )}
              </div>
            ) : (
              /* Sliders input */
              <div className="flex flex-col gap-6">
                <div>
                  <div className="flex justify-between items-center text-[11px] font-bold mb-2">
                    <span className="text-slate-400 uppercase tracking-wider">Loan Amount</span>
                    <span className="text-brand-blue text-sm font-extrabold">₹ {principal.toLocaleString("en-IN")}</span>
                  </div>
                  <input
                    type="range"
                    min={data.minPrincipal}
                    max={data.maxPrincipal}
                    step={data.principalStep}
                    value={principal}
                    onChange={(e) => setPrincipal(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-blue"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center text-[11px] font-bold mb-2">
                    <span className="text-slate-400 uppercase tracking-wider">Interest Rate</span>
                    <span className="text-brand-blue text-sm font-extrabold">{rate} %</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="22"
                    step="0.1"
                    value={rate}
                    onChange={(e) => setRate(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-blue"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center text-[11px] font-bold mb-2">
                    <span className="text-slate-400 uppercase tracking-wider">Tenure</span>
                    <span className="text-brand-blue text-sm font-extrabold">{years} Years</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="30"
                    step="1"
                    value={years}
                    onChange={(e) => setYears(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-blue"
                  />
                </div>

                {/* Live calculations */}
                <div className="bg-white border border-slate-100 p-4 rounded-xl flex flex-col gap-2 font-semibold text-xs text-slate-500 shadow-inner">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-50">
                    <span>Est. Interest Cost</span>
                    <span className="text-slate-800 font-bold">₹ {emiRes.interest}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-slate-50">
                    <span>Total Cost Payable</span>
                    <span className="text-slate-800 font-bold">₹ {emiRes.total}</span>
                  </div>
                  <div className="flex justify-between items-center pt-1.5">
                    <span className="text-brand-blue font-extrabold">Monthly EMI Payment</span>
                    <span className="text-brand-teal text-base font-black">₹ {emiRes.monthly}</span>
                  </div>
                </div>

                <button
                  onClick={() => setShowApplyQuotes(true)}
                  className="w-full bg-brand-blue hover:bg-brand-blue-hover text-white py-3 rounded-xl font-bold text-xs transition-colors cursor-pointer text-center shadow-md shadow-brand-blue/10"
                >
                  View Partner Offers
                </button>
              </div>
            )}
          </div>
        </div>

        {/* FAQs */}
        <div className="border-t border-slate-100 pt-16 mb-16">
          <h2 className="text-2xl font-extrabold text-slate-850 mb-8 tracking-tight text-center">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto flex flex-col gap-3">
            {data.faqs.map((faq, fIdx) => (
              <div key={fIdx} className="border border-slate-100 rounded-2xl bg-slate-50 overflow-hidden transition-all shadow-sm">
                <button
                  onClick={() => setOpenFaq(openFaq === fIdx ? null : fIdx)}
                  className="w-full text-left p-5 font-bold text-xs sm:text-sm text-slate-700 hover:text-brand-blue flex justify-between items-center outline-none"
                >
                  <span>{faq.q}</span>
                  <span className="text-slate-400 text-lg">{openFaq === fIdx ? "−" : "+"}</span>
                </button>
                {openFaq === fIdx && (
                  <p className="px-5 pb-5 text-xs text-slate-500 leading-relaxed border-t border-slate-150/40 pt-3">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
