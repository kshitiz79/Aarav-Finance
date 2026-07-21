"use client";

import React, { useState } from "react";
import Link from "next/link";

interface ProductDetails {
  title: string;
  desc: string;
  tagline: string;
  defaultMonthly: number;
  minMonthly: number;
  maxMonthly: number;
  monthlyStep: number;
  defaultRate: number;
  defaultYears: number;
  features: string[];
  faqs: { q: string; a: string }[];
}

const investmentData: Record<string, ProductDetails> = {
  "mutual-funds": {
    title: "Direct Mutual Funds",
    desc: "Grow your wealth by investing directly in India's top performing mutual funds. Earn up to 1.5% extra returns by bypassing intermediary commission cuts.",
    tagline: "Zero commission direct mutual funds from leading asset managers",
    defaultMonthly: 5000,
    minMonthly: 500,
    maxMonthly: 200000,
    monthlyStep: 500,
    defaultRate: 15.0,
    defaultYears: 10,
    features: [
      "Zero commission direct mutual fund schemes",
      "Earn 1% to 1.5% additional compounding return annually",
      "Instant portfolio tracking and consolidation",
      "Robust options: Large-cap, Mid-cap, Small-cap & Sectoral plans"
    ],
    faqs: [
      { q: "What is a direct mutual fund plan?", a: "A direct plan is bought directly from the fund house. It has no distributor commission expenses, leading to a lower expense ratio and higher compound returns over time." },
      { q: "Are direct plans subject to market risks?", a: "Yes, all mutual funds are subject to market fluctuations. However, historical indices show long-term equity portfolios yield stable returns over 5 to 7 year periods." }
    ]
  },
  sip: {
    title: "Systematic Investment Plans (SIP)",
    desc: "Cultivate disciplined savings by investing small monthly sums into top-rated equity index or debt funds automatically.",
    tagline: "Build a multi-crore wealth fund starting with just ₹500 per month",
    defaultMonthly: 10000,
    minMonthly: 500,
    maxMonthly: 500000,
    monthlyStep: 1000,
    defaultRate: 12.0,
    defaultYears: 15,
    features: [
      "Instantly auto-debit payments from bank accounts securely",
      "Rupee cost averaging eliminates necessity to time market cycles",
      "Pause, increase, or stop SIP installments anytime without penalty",
      "Compound interest multiplies small savings into major funds"
    ],
    faqs: [
      { q: "What is rupee cost averaging?", a: "When markets fall, your monthly SIP buys more mutual fund units. When markets rise, it buys fewer units. This averages out the purchase cost over time, minimizing market volatility risks." },
      { q: "Can I increase my monthly SIP amount later?", a: "Yes, you can opt for a Step-up SIP which automatically increases your monthly investment by a fixed percentage or amount every year." }
    ]
  },
  elss: {
    title: "Tax Saving Mutual Funds (ELSS)",
    desc: "Deduct up to ₹1.5 Lakhs from your taxable income under Section 80C while growing your assets via diversified equity mutual funds.",
    tagline: "Save up to ₹46,800 in taxes annually with the shortest lock-in u/s 80C",
    defaultMonthly: 12500,
    minMonthly: 500,
    maxMonthly: 150000,
    monthlyStep: 500,
    defaultRate: 14.0,
    defaultYears: 5,
    features: [
      "Shortest lock-in period of 3 years compared to PPF (15 yrs) & FDs (5 yrs)",
      "Exempt up to ₹1.5 Lakhs from taxable salary u/s 80C",
      "Historically outperforms traditional debt savings rates",
      "Managed by qualified, professional fund managers"
    ],
    faqs: [
      { q: "What is the lock-in period for ELSS?", a: "ELSS funds have a mandatory lock-in period of 3 years from the date of purchase. If you invest via monthly SIP, each installment has its own 3-year lock-in." },
      { q: "How much tax can I save?", a: "You can deduct up to ₹1.5 Lakhs u/s 80C. For taxpayers in the 30% tax bracket, this results in an annual direct tax saving of ₹46,800 (including cess)." }
    ]
  },
  retirement: {
    title: "Retirement & Pension portfolios",
    desc: "Plan your golden years, build a steady post-retirement corpus, and secure high-rate recurring monthly payouts.",
    tagline: "Secure your financial freedom and retain inflation-proof spending power",
    defaultMonthly: 15000,
    minMonthly: 1000,
    maxMonthly: 250000,
    monthlyStep: 1000,
    defaultRate: 10.0,
    defaultYears: 25,
    features: [
      "Balanced asset allocations (Equity-to-Debt ratios) minimizing risks",
      "Systematic Withdrawal Plan (SWP) for inflation-proof retirement salary",
      "Integrate National Pension System (NPS) with additional ₹50,000 tax deduction",
      "Expert advisors help structure inheritance capital"
    ],
    faqs: [
      { q: "What is a Systematic Withdrawal Plan (SWP)?", a: "An SWP allows you to withdraw a fixed amount of money regularly from your accumulated mutual fund corpus, providing a monthly pension while the remaining funds continue to grow." },
      { q: "How does NPS differ from ELSS?", a: "NPS is a retirement-focused plan with lock-in till age 60, offering additional deductions u/s 80CCD(1B). ELSS is an equity fund with a 3-year lock-in that can be withdrawn anytime post lock-in." }
    ]
  }
};

export default function InvestmentsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = React.use(params);
  const data = investmentData[slug];

  const [monthly, setMonthly] = useState(data ? data.defaultMonthly : 5000);
  const [rate, setRate] = useState(data ? data.defaultRate : 12);
  const [years, setYears] = useState(data ? data.defaultYears : 10);
  const [showApplyQuotes, setShowApplyQuotes] = useState(false);
  const [callbackName, setCallbackName] = useState("");
  const [callbackPhone, setCallbackPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  if (!data) {
    return (
      <div className="container mx-auto py-20 text-center font-sans">
        <h2 className="text-2xl font-bold">Investment category not found</h2>
        <Link href="/" className="text-brand-blue hover:underline mt-4 inline-block">
          Return to home page
        </Link>
      </div>
    );
  }

  // Live Wealth calculation logic
  const calculateWealth = () => {
    const P = monthly;
    const i = rate / 12 / 100;
    const n = years * 12;
    const totalAmount = P * (((Math.pow(1 + i, n) - 1) / i) * (1 + i));
    const invested = P * n;
    const returns = totalAmount - invested;
    return {
      invested: Math.round(invested).toLocaleString("en-IN"),
      returns: Math.round(returns).toLocaleString("en-IN"),
      total: Math.round(totalAmount).toLocaleString("en-IN"),
      percentReturns: (returns / totalAmount) * 100
    };
  };

  const wealthRes = calculateWealth();

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

  const getFundsForSlug = (slug: string) => {
    switch (slug) {
      case "mutual-funds":
        return [
          { name: "Parag Parikh Flexi Cap Fund - Direct Growth", returns: "Expected Return: 14.52%", rating: "5/5 Stars", expenseRatio: "0.55% (Direct)" },
          { name: "Nippon India Small Cap Fund - Direct Growth", returns: "Expected Return: 18.25%", rating: "5/5 Stars", expenseRatio: "0.68% (Direct)" },
          { name: "Quant Small Cap Fund (Direct Plan - Growth)", returns: "Expected Return: 21.35%", rating: "4.9/5 Stars", expenseRatio: "0.77% (Direct)" }
        ];
      case "sip":
        return [
          { name: "HDFC Flexi Cap Fund", returns: "Expected Return: 17.50%", rating: "5/5 Stars", expenseRatio: "0.80% (Direct)" },
          { name: "ICICI Prudential Bluechip Fund", returns: "Expected Return: 15.15%", rating: "4.8/5 Stars", expenseRatio: "0.75% (Direct)" },
          { name: "Motilal Oswal Midcap Fund", returns: "Expected Return: 20.05%", rating: "4.9/5 Stars", expenseRatio: "0.65% (Direct)" }
        ];
      case "elss":
        return [
          { name: "SBI ELSS Tax Saver Fund", returns: "Expected Return: 16.55%", rating: "4.8/5 Stars", expenseRatio: "0.78% (Direct)" },
          { name: "HDFC ELSS Tax Saver Fund", returns: "Expected Return: 15.40%", rating: "4.7/5 Stars", expenseRatio: "0.82% (Direct)" },
          { name: "Quant ELSS Tax Saver Fund", returns: "Expected Return: 16.50%", rating: "4.9/5 Stars", expenseRatio: "0.77% (Direct)" }
        ];
      case "retirement":
        return [
          { name: "ICICI Prudential Retirement Fund (Pure Equity)", returns: "3-Year CAGR: ~21.90%", rating: "4.9/5 Stars", expenseRatio: "0.85% (Direct)" },
          { name: "Tata Retirement Savings Fund", returns: "3-Year CAGR: ~13.90%", rating: "4.7/5 Stars", expenseRatio: "0.90% (Direct)" },
          { name: "Nippon India Retirement Fund", returns: "3-Year CAGR: ~13.40%", rating: "4.6/5 Stars", expenseRatio: "0.88% (Direct)" }
        ];
      default:
        return [];
    }
  };
  const simulatedFunds = getFundsForSlug(slug);

  return (
    <div className="bg-white text-slate-800 font-sans min-h-screen py-10">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Breadcrumb */}
        <div className="text-xs text-slate-400 mb-6 flex gap-2 font-semibold">
          <Link href="/" className="hover:text-brand-blue">Home</Link>
          <span>/</span>
          <span className="text-slate-600">Investments</span>
          <span>/</span>
          <span className="text-brand-blue font-bold capitalize">{slug}</span>
        </div>

        {/* Hero split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          <div className="lg:col-span-7">
            <span className="text-brand-teal text-xs font-extrabold uppercase tracking-widest bg-brand-teal/10 px-3 py-1 rounded-full">
              Investments & Wealth
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-slate-850 mt-4 leading-tight">
              {data.title}
            </h1>
            <p className="text-slate-500 text-sm sm:text-base mt-4 max-w-xl leading-relaxed">
              {data.desc}
            </p>
            <p className="text-brand-blue text-xs sm:text-sm mt-2 font-bold leading-relaxed">
              ★ {data.tagline}
            </p>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              {data.features.map((feat, idx) => (
                <div key={idx} className="flex gap-2.5 items-start bg-slate-50 border border-slate-100 p-4 rounded-xl shadow-sm">
                  <span className="text-brand-teal font-bold">✓</span>
                  <span className="text-xs font-semibold text-slate-600 leading-snug">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Calculator card */}
          <div className="lg:col-span-5 bg-slate-50 border border-slate-150 p-6 sm:p-8 rounded-3xl shadow-md">
            <h3 className="font-extrabold text-slate-850 text-base mb-6">
              Project Investment Yield
            </h3>

            {showApplyQuotes ? (
              /* Fund recommendations and callback booking */
              <div className="flex flex-col gap-4">
                {submitted ? (
                  <div className="text-center py-6">
                    <span className="inline-flex w-12 h-12 rounded-full bg-brand-teal/10 text-brand-teal items-center justify-center text-xl font-bold mb-4">
                      ✓
                    </span>
                    <h4 className="font-bold text-slate-800 text-sm">Portfolio Request Sent!</h4>
                    <p className="text-[10px] text-slate-450 mt-1">Our certified wealth advisor will email your draft allocation chart.</p>
                  </div>
                ) : (
                  <form onSubmit={handleApplySubmit} className="flex flex-col gap-4">
                    <span className="text-[11px] text-brand-teal bg-brand-teal/10 p-3 rounded-lg font-bold">
                      Compare Active Schemes: ₹{monthly.toLocaleString("en-IN")}/month
                    </span>

                    <div className="flex flex-col gap-2 max-h-56 overflow-y-auto mb-2">
                      {simulatedFunds.map((fund, fIdx) => (
                        <div key={fIdx} className="bg-white border border-slate-100 p-3.5 rounded-xl flex justify-between items-center shadow-xs">
                          <div>
                            <h5 className="font-bold text-xs text-slate-700">{fund.name}</h5>
                            <p className="text-[9px] text-slate-405 mt-0.5">{fund.expenseRatio} | {fund.returns}</p>
                          </div>
                          <span className="text-brand-blue font-bold text-[10px] bg-brand-blue/5 px-2 py-0.5 rounded-full">{fund.rating}</span>
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
                        placeholder="e.g. Priyan Sharma"
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
                      className="bg-brand-blue hover:bg-brand-blue-hover text-white text-xs font-bold py-2.5 rounded-xl transition-all cursor-pointer text-center mt-2 shadow-md shadow-brand-blue/10"
                    >
                      Invest / Request Portfolio Advice &rarr;
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
              /* Sliders */
              <div className="flex flex-col gap-6">
                <div>
                  <div className="flex justify-between items-center text-[11px] font-bold mb-2">
                    <span className="text-slate-400 uppercase tracking-wider">Monthly SIP Amount</span>
                    <span className="text-brand-blue text-sm font-extrabold">₹ {monthly.toLocaleString("en-IN")}</span>
                  </div>
                  <input
                    type="range"
                    min={data.minMonthly}
                    max={data.maxMonthly}
                    step={data.monthlyStep}
                    value={monthly}
                    onChange={(e) => setMonthly(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-blue"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center text-[11px] font-bold mb-2">
                    <span className="text-slate-400 uppercase tracking-wider">Expected Return Rate (p.a.)</span>
                    <span className="text-brand-blue text-sm font-extrabold">{rate} %</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="28"
                    step="0.5"
                    value={rate}
                    onChange={(e) => setRate(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-blue"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center text-[11px] font-bold mb-2">
                    <span className="text-slate-400 uppercase tracking-wider">Investment Time Period</span>
                    <span className="text-brand-blue text-sm font-extrabold">{years} Years</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="40"
                    step="1"
                    value={years}
                    onChange={(e) => setYears(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-blue"
                  />
                </div>

                {/* Live math */}
                <div className="bg-white border border-slate-100 p-4 rounded-xl flex flex-col gap-2 font-semibold text-xs text-slate-500 shadow-inner">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-50">
                    <span>Total Principal Invested</span>
                    <span className="text-slate-800 font-bold">₹ {wealthRes.invested}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-slate-50">
                    <span>Est. Growth Returns</span>
                    <span className="text-slate-800 font-bold">₹ {wealthRes.returns}</span>
                  </div>
                  <div className="flex justify-between items-center pt-1.5">
                    <span className="text-brand-blue font-extrabold">Total Projected Wealth</span>
                    <span className="text-brand-teal text-base font-black">₹ {wealthRes.total}</span>
                  </div>
                </div>

                <button
                  onClick={() => setShowApplyQuotes(true)}
                  className="w-full bg-brand-blue hover:bg-brand-blue-hover text-white py-3 rounded-xl font-bold text-xs transition-colors cursor-pointer text-center shadow-md shadow-brand-blue/10"
                >
                  View Scheme Options
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

        {/* Investment Disclaimer */}
        <div className="mt-12 text-[11px] text-slate-450 leading-relaxed border-t border-slate-105 pt-6">
          <p className="font-bold mb-2">Investment Disclaimer:</p>
          <p className="mb-2">
            The mutual fund schemes, SIPs, ELSS funds, and retirement portfolio options displayed on this website are for informational and illustrative purposes only and should not be considered investment advice or a recommendation to buy, sell, or hold any security or mutual fund scheme.
          </p>
          <p className="mb-2">
            The expected returns and CAGR figures mentioned are based on historical performance and market estimates and are not guaranteed. Mutual fund investments are subject to market risks, including the possible loss of principal invested. Actual returns may vary depending on market conditions, investment tenure, fund performance, and other factors.
          </p>
          <p className="mb-2">
            Investors are advised to carefully read all scheme-related documents and consult their financial advisor or investment professional before making any investment decision.
          </p>
          <p className="font-bold text-slate-500">
            Mutual Fund investments are subject to market risks. Please read all scheme-related documents carefully before investing.
          </p>
        </div>

      </div>
    </div>
  );
}
