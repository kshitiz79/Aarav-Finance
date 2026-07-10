"use client";

import { useState } from "react";

export default function Calculators() {
  const [tab, setTab] = useState("sip"); // sip | emi
  // SIP inputs
  const [sipMonthly, setSipMonthly] = useState(5000);
  const [sipRate, setSipRate] = useState(12);
  const [sipYears, setSipYears] = useState(10);
  // EMI inputs
  const [emiPrincipal, setEmiPrincipal] = useState(1000000);
  const [emiRate, setEmiRate] = useState(8.5);
  const [emiYears, setEmiYears] = useState(15);

  // SIP math
  const calculateSIP = () => {
    const P = sipMonthly;
    const i = sipRate / 12 / 100;
    const n = sipYears * 12;
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

  // EMI math
  const calculateEMI = () => {
    const P = emiPrincipal;
    const r = emiRate / 12 / 100;
    const n = emiYears * 12;
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

  const sipResults = calculateSIP();
  const emiResults = calculateEMI();

  return (
    <section id="calculator-section" className="py-20 bg-white font-sans">
      <div className="container mx-auto px-4 ">
        <div className="text-center mb-12">
          <span className="text-brand-teal text-xs font-extrabold uppercase tracking-widest bg-brand-teal/10 px-3 py-1 rounded-full">
            Planning Tools
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 mt-4 tracking-tight">
            Interactive Financial Calculators
          </h2>
          <p className="text-slate-500 text-sm mt-2">
            Plan your financial commitments and estimate returns instantly with slide controls.
          </p>
        </div>

        {/* Tab selector */}
        <div className="flex bg-slate-100 p-1 rounded-full w-fit mx-auto mb-10 shadow-inner">
          <button
            onClick={() => setTab("sip")}
            className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${tab === "sip"
                ? "bg-brand-blue text-white shadow-md"
                : "text-slate-500 hover:text-slate-855"
              }`}
          >
            SIP Wealth Calculator
          </button>
          <button
            onClick={() => setTab("emi")}
            className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${tab === "emi"
                ? "bg-brand-blue text-white shadow-md"
                : "text-slate-500 hover:text-slate-855"
              }`}
          >
            Loan EMI Calculator
          </button>
        </div>

        {/* Calculators core UI */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 border border-slate-100 bg-slate-50/50 p-6 sm:p-8 rounded-3xl">
          {tab === "sip" ? (
            <>
              {/* Sliders */}
              <div className="md:col-span-7 flex flex-col gap-6">
                <div>
                  <div className="flex justify-between items-center text-xs font-bold mb-2">
                    <span className="text-slate-500 uppercase tracking-wider">Monthly SIP Amount</span>
                    <span className="text-brand-blue text-base font-extrabold">₹ {sipMonthly.toLocaleString("en-IN")}</span>
                  </div>
                  <input
                    type="range"
                    min="500"
                    max="100000"
                    step="500"
                    value={sipMonthly}
                    onChange={(e) => setSipMonthly(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-blue"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>₹500</span>
                    <span>₹100,000</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center text-xs font-bold mb-2">
                    <span className="text-slate-500 uppercase tracking-wider">Expected Return Rate (p.a.)</span>
                    <span className="text-brand-blue text-base font-extrabold">{sipRate} %</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="30"
                    step="0.5"
                    value={sipRate}
                    onChange={(e) => setSipRate(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-blue"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>5%</span>
                    <span>30%</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center text-xs font-bold mb-2">
                    <span className="text-slate-500 uppercase tracking-wider">Investment Time Period</span>
                    <span className="text-brand-blue text-base font-extrabold">{sipYears} Years</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="40"
                    step="1"
                    value={sipYears}
                    onChange={(e) => setSipYears(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-blue"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>1 Year</span>
                    <span>40 Years</span>
                  </div>
                </div>
              </div>

              {/* Results summary card */}
              <div className="md:col-span-5 bg-white rounded-2xl p-6 border border-slate-100 flex flex-col justify-between shadow-sm">
                <div className="flex flex-col gap-4 text-xs font-semibold text-slate-500">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-2.5">
                    <span>Invested Amount</span>
                    <span className="text-slate-800 text-sm font-bold">₹ {sipResults.invested}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-slate-100 pb-2.5">
                    <span>Est. Wealth Returns</span>
                    <span className="text-slate-800 text-sm font-bold">₹ {sipResults.returns}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-brand-blue uppercase tracking-wider font-extrabold">Total Wealth Value</span>
                    <span className="text-brand-teal text-lg font-black">₹ {sipResults.total}</span>
                  </div>
                </div>

                {/* visual proportion bar */}
                <div className="mt-8">
                  <div className="h-4 w-full bg-brand-blue rounded-full overflow-hidden flex shadow-inner">
                    <div
                      className="bg-brand-teal h-full transition-all duration-300"
                      style={{ width: `${sipResults.percentReturns || 0}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400 mt-2 font-bold uppercase tracking-wider">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded bg-brand-blue" />
                      <span>Invested</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded bg-brand-teal" />
                      <span>Returns ({Math.round(sipResults.percentReturns || 0)}%)</span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Sliders */}
              <div className="md:col-span-7 flex flex-col gap-6">
                <div>
                  <div className="flex justify-between items-center text-xs font-bold mb-2">
                    <span className="text-slate-500 uppercase tracking-wider">Principal Loan Amount</span>
                    <span className="text-brand-blue text-base font-extrabold">₹ {emiPrincipal.toLocaleString("en-IN")}</span>
                  </div>
                  <input
                    type="range"
                    min="100000"
                    max="100000000"
                    step="100000"
                    value={emiPrincipal}
                    onChange={(e) => setEmiPrincipal(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-blue"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>₹1 Lakh</span>
                    <span>₹10 Crore</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center text-xs font-bold mb-2">
                    <span className="text-slate-500 uppercase tracking-wider">Interest Rate (p.a.)</span>
                    <span className="text-brand-blue text-base font-extrabold">{emiRate} %</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="20"
                    step="0.1"
                    value={emiRate}
                    onChange={(e) => setEmiRate(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-blue"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>5%</span>
                    <span>20%</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center text-xs font-bold mb-2">
                    <span className="text-slate-500 uppercase tracking-wider">Loan Tenure</span>
                    <span className="text-brand-blue text-base font-extrabold">{emiYears} Years</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="30"
                    step="1"
                    value={emiYears}
                    onChange={(e) => setEmiYears(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-blue"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>1 Year</span>
                    <span>30 Years</span>
                  </div>
                </div>
              </div>

              {/* Results summary card */}
              <div className="md:col-span-5 bg-white rounded-2xl p-6 border border-slate-100 flex flex-col justify-between shadow-sm">
                <div className="flex flex-col gap-4 text-xs font-semibold text-slate-500">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-2.5">
                    <span>Principal Amount</span>
                    <span className="text-slate-800 text-sm font-bold">₹ {emiPrincipal.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-slate-100 pb-2.5">
                    <span>Total Interest Payable</span>
                    <span className="text-slate-800 text-sm font-bold">₹ {emiResults.interest}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-slate-100 pb-2.5">
                    <span>Total Amount Payable</span>
                    <span className="text-slate-800 text-sm font-bold">₹ {emiResults.total}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-brand-blue uppercase tracking-wider font-extrabold">Monthly Loan EMI</span>
                    <span className="text-brand-teal text-lg font-black">₹ {emiResults.monthly}</span>
                  </div>
                </div>

                {/* visual proportion bar */}
                <div className="mt-6">
                  <div className="h-4 w-full bg-brand-blue rounded-full overflow-hidden flex shadow-inner">
                    <div
                      className="bg-brand-teal h-full transition-all duration-300"
                      style={{ width: `${emiResults.percentInterest || 0}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400 mt-2 font-bold uppercase tracking-wider">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded bg-brand-blue" />
                      <span>Principal</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded bg-brand-teal" />
                      <span>Interest ({Math.round(emiResults.percentInterest || 0)}%)</span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
