"use client";

import { useState } from "react";

// Inline icons
const CloseIcon = () => (
  <svg className="w-6 h-6 text-slate-400 hover:text-slate-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const CheckIcon = () => (
  <svg className="w-5 h-5 text-brand-teal flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default function ComparisonWizard({ product, onClose, onRequestCallback }) {
  const [step, setStep] = useState(1);
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    phone: "",
    detailVal: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setShowResults(true);
      }, 1500);
    }
  };

  const quotesList = [
    {
      provider: "Finsocap Premium Partner A",
      rate: `${((product.name.length % 4) + 6.8).toFixed(2)}%`,
      description: "Best for immediate approval, paperless documentation.",
      rating: "4.9/5",
      features: ["Instant approval", "Zero processing fee", "Digital verification"]
    },
    {
      provider: "Finsocap Premium Partner B",
      rate: `${((product.name.length % 3) + 7.2).toFixed(2)}%`,
      description: "High flexibility, lowest overall payout structure.",
      rating: "4.8/5",
      features: ["Flexible tenure", "No prepayment penalty", "Dedicated advisor support"]
    },
    {
      provider: "Finsocap Standard Partner C",
      rate: `${((product.name.length % 5) + 6.5).toFixed(2)}%`,
      description: "Public banking trust with steady long-term security.",
      rating: "4.7/5",
      features: ["Secure banking trust", "Lowest base rate", "24/7 query resolution"]
    }
  ];

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative bg-white border border-slate-100 rounded-[32px] w-full max-w-lg shadow-2xl p-6 sm:p-8 overflow-y-auto max-h-[90vh] z-10 transition-all duration-300 font-sans">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
          <div>
            <span className="text-[10px] text-brand-teal uppercase bg-brand-teal/10 px-2.5 py-0.5 rounded font-extrabold tracking-wider">
              Finsocap Engine
            </span>
            <h3 className="font-extrabold text-slate-800 text-lg mt-1">
              Get Quotes: {product.name}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Results Screen */}
        {showResults ? (
          <div className="flex flex-col gap-5">
            <div className="bg-brand-teal/10 border border-brand-teal/20 text-brand-teal rounded-2xl p-4 flex gap-3 text-xs leading-relaxed font-semibold">
              <CheckIcon />
              <span>Based on your criteria, we aggregated 3 custom recommendations from Finsocap partner systems.</span>
            </div>

            <div className="flex flex-col gap-3">
              {quotesList.map((q, idx) => (
                <div
                  key={idx}
                  className="border border-slate-100 bg-slate-50 p-4 rounded-2xl flex flex-col justify-between gap-3 shadow-sm hover:border-brand-teal transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-slate-800 text-sm">
                      {q.provider}
                    </span>
                    <span className="text-brand-blue font-extrabold text-base">
                      {q.rate}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">{q.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {q.features.map((feat, fIdx) => (
                      <span
                        key={fIdx}
                        className="text-[9px] bg-white border border-slate-150 px-2 py-0.5 rounded-full text-slate-500 font-semibold"
                      >
                        {feat}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => {
                      onRequestCallback(inputs.name, inputs.phone);
                      onClose();
                    }}
                    className="w-full bg-brand-blue hover:bg-brand-blue-hover text-white text-xs font-bold py-2.5 rounded-xl transition-all cursor-pointer text-center"
                  >
                    Apply / Request Callback
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Form Screen */
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {step === 1 ? (
              /* Step 1: Input details */
              <div className="flex flex-col gap-4">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                    Step 1 of 2
                  </span>
                  <h4 className="font-extrabold text-slate-800 text-[15px] mt-1 leading-snug">
                    {product.wizardLabel}
                  </h4>
                </div>

                <input
                  type="text"
                  required
                  value={inputs.detailVal}
                  onChange={(e) => setInputs({ ...inputs, detailVal: e.target.value })}
                  placeholder={product.placeholder}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm outline-none focus:border-brand-blue text-slate-800"
                />

                <button
                  type="submit"
                  className="bg-brand-blue hover:bg-brand-blue-hover text-white py-3 rounded-xl font-bold text-xs mt-3 transition-colors cursor-pointer text-center"
                >
                  Continue &rarr;
                </button>
              </div>
            ) : (
              /* Step 2: Contact Info */
              <div className="flex flex-col gap-4">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                    Step 2 of 2
                  </span>
                  <h4 className="font-extrabold text-slate-800 text-[15px] mt-1 leading-snug">
                    Where should we send your comparison quotes?
                  </h4>
                </div>

                <div className="flex flex-col gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1.5">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={inputs.name}
                      onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-brand-blue text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={inputs.email}
                      onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
                      placeholder="e.g. rahul@example.com"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-brand-blue text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1.5">
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      required
                      pattern="[0-9]{10}"
                      value={inputs.phone}
                      onChange={(e) => setInputs({ ...inputs, phone: e.target.value })}
                      placeholder="e.g. 9876543210"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-brand-blue text-slate-800"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-brand-teal hover:bg-brand-teal-hover text-white py-3 rounded-xl font-bold text-xs mt-3 transition-colors cursor-pointer text-center flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Aggregating quotes...</span>
                    </>
                  ) : (
                    <span>Generate Quotes Now &rarr;</span>
                  )}
                </button>
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
