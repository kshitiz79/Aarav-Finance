"use client";

import React, { useState } from "react";
import Link from "next/link";
import { sendWeb3Form } from "@/lib/web3forms";

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
    tagline: "Personal Loan starting from @ 9.99%*",
    defaultPrincipal: 500000,
    minPrincipal: 50000,
    maxPrincipal: 2500000,
    principalStep: 50000,
    defaultRate: 9.99,
    defaultYears: 5,
    features: [
      "No collateral or security needed",
      "Instant paperless verification in 10 minutes",
      "Flexible tenure options from 1 to 5 years",
      "Personal Loan starting from @ 9.99%*"
    ],
    faqs: [
      { q: "What is the minimum salary eligibility for a personal loan?", a: "Most partner banks require a minimum net monthly salary of ₹15,000 to ₹25,000, depending on the employer category and location." },
      { q: "Can I preclose my personal loan early?", a: "Yes, you can preclose your loan, though some lenders charge foreclosure charges ranging from 2% to 4% of the outstanding principal." }
    ]
  },
  home: {
    title: "Home Loan Offers",
    desc: "Achieve homeownership with customized home finance solutions, lowest interest rates, and balance transfer options.",
    tagline: "Home Loan starting from @ 7.25%*",
    defaultPrincipal: 4000000,
    minPrincipal: 500000,
    maxPrincipal: 100000000,
    principalStep: 100000,
    defaultRate: 7.25,
    defaultYears: 20,
    features: [
      "Tenure up to 30 years for lower monthly EMIs",
      "Hassle-free loan balance transfer from other banks",
      "Pradhan Mantri Awas Yojana (PMAY) subsidy guidance",
      "Home Loan starting from @ 7.25%*"
    ],
    faqs: [
      { q: "What documents are required for home loans?", a: "Standard requirements include: Identity proof, Address proof, Income proof (Form 16/3 months salary slips for salaried, or 2 years ITR filings for self-employed), and Property documents." },
      { q: "How is my home loan eligibility calculated?", a: "Lenders look at your monthly net income, age, credit score (usually 750+), and your existing monthly EMI liabilities to decide your max loan eligibility." }
    ]
  },
  business: {
    title: "Business Loan Offers",
    desc: "Fund your business growth, manage working capital requirements, or buy machinery with collateral-free SME business loans.",
    tagline: "Business Loan starting from @ 10.50%*",
    defaultPrincipal: 1500000,
    minPrincipal: 100000,
    maxPrincipal: 5000000,
    principalStep: 50000,
    defaultRate: 10.50,
    defaultYears: 3,
    features: [
      "No security or asset mortgage required",
      "Quick disbursal within 48 to 72 hours",
      "Structured repayments tailored to cashflow seasonal cycles",
      "Business Loan starting from @ 10.50%*"
    ],
    faqs: [
      { q: "What is the minimum business vintage required?", a: "Lenders usually require a minimum business running vintage of 2 years with a profitable operational track record." },
      { q: "What is the interest rate for SME business loans?", a: "The starting interest rate is @ 10.50%*, subject to credit profile, eligibility, and the lending institution's credit policy." }
    ]
  },
  property: {
    title: "Loan Against Property (LAP) Offers",
    desc: "Unlock high-value liquidity by mortgaging your residential, commercial, or industrial properties.",
    tagline: "LAP starting from @ 9.50%*",
    defaultPrincipal: 5000000,
    minPrincipal: 1000000,
    maxPrincipal: 150000000,
    principalStep: 200000,
    defaultRate: 9.50,
    defaultYears: 15,
    features: [
      "Lower interest rates compared to personal loans",
      "Long repayment tenure up to 15 years",
      "Property remains in your complete active possession",
      "LAP starting from @ 9.50%*"
    ],
    faqs: [
      { q: "Can co-owned property be used for LAP?", a: "Yes, you can apply using a co-owned property, provided all co-owners of the property join as co-applicants for the loan." },
      { q: "Does the bank verify property valuation?", a: "Yes, Finsocap's partner banks perform independent legal checks and a physical property valuation inspection to establish the fair market valuation." }
    ]
  }
};

export default function LoansClient({ slug }: { slug: string }) {
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

  const handleApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (callbackName && callbackPhone) {
      try {
        await sendWeb3Form(
          {
            name: callbackName,
            phone: callbackPhone,
            loan_type: data.title,
            loan_amount: `₹${principal.toLocaleString("en-IN")}`,
            loan_tenure: `${years} Years`,
            estimated_emi: `₹${emiRes.monthly}`,
          },
          `New Loan Application: ${data.title} - Finsocap`
        );
      } catch (err) {
        console.error(err);
      }
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setShowApplyQuotes(false);
        setCallbackName("");
        setCallbackPhone("");
      }, 4000);
    }
  };

  return (
    <div className="bg-slate-50/50 text-slate-800 font-sans min-h-screen pb-16">
      <div className="container mx-auto px-4 max-w-7xl pt-6">
        {/* Breadcrumb */}
        <div className="text-xs text-slate-400 mb-6 flex items-center gap-2 font-semibold">
          <Link href="/" className="hover:text-brand-blue transition-colors">Home</Link>
          <span>/</span>
          <span className="text-slate-600">Loans</span>
          <span>/</span>
          <span className="text-[#0da687] font-bold capitalize">{slug}</span>
        </div>

        {/* Hero Section matching reference screenshot 2 */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-10 shadow-sm mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* LEFT COLUMN */}
            <div className="lg:col-span-7 flex flex-col items-start">
              {/* Category Pill with accent line */}
              <div className="inline-flex items-center gap-2.5 mb-3">
                <span className="text-xs font-black uppercase tracking-widest text-[#0da687]">
                  LOAN OFFERINGS
                </span>
                <span className="w-8 h-[2px] bg-[#0da687] rounded-full inline-block" />
              </div>

              {/* Dual-color headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-[48px] font-black text-slate-900 leading-[1.15] tracking-tight">
                {data.title.includes("Offers") ? (
                  <>
                    {data.title.replace("Offers", "")}
                    <span className="text-[#0da687]">Offers</span>
                  </>
                ) : (
                  <>
                    {data.title}
                  </>
                )}
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-base text-slate-600 mt-4 leading-relaxed max-w-2xl font-normal">
                {data.desc}
              </p>

              {/* Highlight / Trust Badge Pill */}
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#f0fdfa] border border-[#0da687]/20 text-[#0da687] text-xs sm:text-sm font-bold mt-4 shadow-xs">
                <svg className="w-4 h-4 text-[#0da687]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                <span>★ {data.tagline}</span>
              </div>

              {/* 4 Feature Icon Pills Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-7 w-full max-w-2xl">
                {data.features.map((feat, idx) => {
                  const icons = [
                    <svg key="1" className="w-5 h-5 text-[#0da687]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>,
                    <svg key="2" className="w-5 h-5 text-[#0da687]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
                    <svg key="3" className="w-5 h-5 text-[#0da687]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="19" y1="5" x2="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>,
                    <svg key="4" className="w-5 h-5 text-[#0da687]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  ];

                  return (
                    <div key={idx} className="bg-[#f8fafc] border border-slate-100 hover:border-[#0da687]/30 p-3.5 sm:p-4 rounded-2xl shadow-xs transition-all flex items-center gap-3.5 group">
                      <span className="w-10 h-10 rounded-xl bg-[#e6f7f3] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                        {icons[idx % icons.length]}
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-slate-800 leading-snug">
                        {feat}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* RIGHT COLUMN: Hero Graphic Banner Image matching Screenshot 2 */}
            <div className="lg:col-span-5 relative w-full h-[320px] sm:h-[400px] lg:h-[440px] rounded-3xl overflow-hidden shadow-md border border-slate-100 flex items-center justify-center bg-gradient-to-br from-[#e6f7f3]/40 via-white to-slate-50">
              <img
                src="/loans.png"
                alt="Finsocap Loan Offers Banner"
                className="w-full h-full object-cover object-center"
              />

              {/* Floating Tagline Script on Top Right */}
              <div className="absolute top-4 right-5 z-20 pointer-events-none">
                <span className="font-serif italic text-base sm:text-xl font-black text-[#3652a0] drop-shadow-sm tracking-wide block transform rotate-[-2deg]">
                  Smart Loans Easy EMIs
                </span>
              </div>

              {/* Floating Feature Card on Left Side */}
              <div className="absolute bottom-5 left-5 z-20 bg-white/95 backdrop-blur-md px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 max-w-[240px] sm:max-w-[260px]">
                <span className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#3652a0] text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  </svg>
                </span>
                <div className="min-w-0">
                  <span className="block font-black text-slate-900 text-xs sm:text-sm leading-tight truncate">
                    Lowest Interest Rates
                  </span>
                  <span className="block text-[10px] sm:text-[11px] font-bold text-[#0da687] mt-0.5 flex items-center gap-1">
                    Instant Approval &rarr;
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Interactive EMI Calculator Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          <div className="lg:col-span-12 bg-white border border-slate-150 p-6 sm:p-10 rounded-3xl shadow-sm">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-8">
                <span className="text-xs font-black uppercase tracking-widest text-[#0da687] bg-[#e6f7f3] px-3.5 py-1 rounded-full">
                  LOAN CALCULATOR
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
                  Calculate Loan EMI
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Adjust loan amount, interest rate, and tenure to estimate your exact monthly payments.
                </p>
              </div>

            {showApplyQuotes ? (
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
                    <span className="text-slate-400 uppercase tracking-wider">Interest Rate (p.a.)</span>
                    <span className="text-brand-blue text-sm font-extrabold">{rate} %*</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-200/50 rounded-lg relative overflow-hidden">
                    <div className="bg-brand-blue h-full" style={{ width: `${(rate / 22) * 100}%` }} />
                  </div>
                  <div className="text-[10px] text-slate-450 mt-1 italic">
                    Fixed starting rate of {rate}%* applied
                  </div>
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

        {/* Disclaimer */}
        <div className="mt-12 text-[11px] text-slate-450 leading-relaxed border-t border-slate-100 pt-6">
          <p className="font-bold mb-1">Disclaimer:</p>
          <p>
            The interest rates displayed on this website are indicative and starting rates only. The final loan amount, applicable interest rate, tenure, and terms of sanction are subject to the respective bank&apos;s or financial institution&apos;s credit policy, eligibility criteria, documentation, verification process, and final approval. Loan approval and actual interest rates may vary based on the applicant&apos;s profile and the lending institution&apos;s assessment.
          </p>
        </div>

      </div>
    </div>
  );
}
