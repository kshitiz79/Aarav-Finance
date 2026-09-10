"use client";

import { useState } from "react";
import { sendWeb3Form } from "@/lib/web3forms";

// Custom SVGs for exact visual match
const CloseIcon = () => (
  <svg className="w-4 h-4 text-slate-500 hover:text-slate-800 transition-colors" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const LeafIcon = () => (
  <svg className="w-3.5 h-3.5 text-[#0da687]" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
  </svg>
);

const ShieldIcon = ({ className = "w-4 h-4 text-slate-400" }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <polyline points="9 12 11 14 15 10" />
  </svg>
);

const SuccessCheckIcon = () => (
  <svg className="w-8 h-8 text-[#0da687]" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <polyline points="4 12 9 17 20 6" />
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else {
      setIsSubmitting(true);
      try {
        await sendWeb3Form(
          {
            name: inputs.name,
            email: inputs.email,
            phone: inputs.phone,
            product_selected: product.name,
            product_requirement: inputs.detailVal,
            category: product.categoryTitle || "General",
          },
          `New Quote Request: ${product.name} - Finsocap`
        );
        if (onRequestCallback) {
          onRequestCallback(inputs.name, inputs.phone);
        }
      } catch (err) {
        console.error("Web3Forms submission error:", err);
      }
      setIsSubmitting(false);
      setShowResults(true);
    }
  };

  // Determine tag label
  const categoryTag =
    product?.categoryTitle ||
    product?.categoryTag ||
    (product?.name ? product.name.toUpperCase() : "MUTUAL FUNDS");

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-md transition-all duration-300 font-sans">
      {/* Backdrop click handler */}
      <div
        className="absolute inset-0 transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative bg-white border border-slate-100 rounded-[24px] sm:rounded-[32px] w-full max-w-[560px] max-h-[92vh] overflow-y-auto shadow-2xl z-10 transition-all duration-300 flex flex-col">
        
        {/* Full Width Top Header Banner Section with popup-bg.png */}
        <div className="relative w-full overflow-hidden rounded-t-[24px] sm:rounded-t-[32px] bg-white">
          {/* Background image spanning full width */}
          <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-0 overflow-hidden">
            <img
              src="/popup-bg.png"
              alt="Finsocap Header Banner"
              className="w-full h-full object-cover object-right"
            />
          </div>

          {/* White linear gradient behind text on left, fading to transparent on right so image stays clear */}
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-white via-white/90 via-[45%] to-transparent pointer-events-none z-[5]" />

          {/* Header Content Overlay */}
          <div className="relative z-10 p-5 sm:p-7 pb-4 sm:pb-5">
            {/* Logo & Close Button Row */}
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xl sm:text-2xl font-black tracking-tight text-[#0f172a] block">
                  FINSOCAP
                </span>
                <span className="text-[10px] sm:text-[11px] font-medium text-slate-500 block -mt-0.5">
                  Plan Today. Prosper Tomorrow.
                </span>
              </div>

              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-slate-100/90 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer shadow-sm"
                aria-label="Close modal"
              >
                <CloseIcon />
              </button>
            </div>

            {/* Category Tag Pill */}
            <div className="mt-3.5 sm:mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e6f7f3] text-[#0da687] text-[10px] sm:text-[11px] font-black tracking-wider uppercase border border-[#0da687]/20 shadow-xs">
              <LeafIcon />
              <span>{categoryTag}</span>
            </div>

            {/* Product Title */}
            <h3 className="text-xl sm:text-2xl md:text-[24px] font-black text-[#0f172a] mt-2 leading-[1.18] tracking-tight max-w-[240px] sm:max-w-[280px]">
              Get Quotes: {product.name}
            </h3>

            {/* Description */}
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1 max-w-[230px] sm:max-w-[260px]">
              {product.desc || "Let's find the right investment plan for your goals."}
            </p>
          </div>
        </div>

        {/* Header-to-Body Separator */}
        <div className="border-t border-slate-100 w-full" />

        {/* Form Body Area */}
        <div className="bg-white flex-1 flex flex-col">
          {showResults ? (
            /* Success Screen */
            <div className="p-5 sm:p-8 flex flex-col items-center text-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#0da687]/15 border-2 border-[#0da687]/30 flex items-center justify-center mb-4 shadow-sm">
                <SuccessCheckIcon />
              </div>

              <h3 className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight mb-2">
                Request Submitted!
              </h3>

              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-xs mb-6">
                Thank you, <span className="font-bold text-slate-700">{inputs.name || "Customer"}</span>! Our certified financial advisor will reach out to you on <span className="font-bold text-slate-700">{inputs.phone}</span> shortly.
              </p>

              <button
                onClick={onClose}
                className="w-full bg-[#0da687] hover:bg-[#0b8c71] text-white font-extrabold text-xs sm:text-sm py-3.5 px-8 rounded-full shadow-lg shadow-[#0da687]/20 hover:shadow-xl transition-all cursor-pointer text-center"
              >
                OK
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col flex-1">
              {step === 1 ? (
                /* STEP 1: Amount / Requirement Input */
                <>
                  <div className="p-5 sm:p-8 py-4 sm:py-5 flex flex-col">
                    {/* Step Indicator Header */}
                    <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
                      <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#0da687] text-white flex items-center justify-center text-[11px] sm:text-xs font-black shadow-sm">
                        1
                      </span>
                      <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-slate-400">
                        STEP 1 OF 2
                      </span>
                    </div>

                    {/* Question Title */}
                    <h4 className="text-sm sm:text-lg font-black text-[#0f172a] mt-1 mb-0.5 leading-snug">
                      {product.wizardLabel || "Desired monthly investment budget?"}
                    </h4>

                    {/* Sub-label */}
                    <p className="text-xs sm:text-sm text-slate-500 font-medium mb-3.5 sm:mb-4">
                      Enter the amount you're comfortable investing every month.
                    </p>

                    {/* Input Box */}
                    <div className="relative flex items-center bg-[#f4f7fb] border border-slate-200/90 rounded-2xl overflow-hidden focus-within:border-[#0da687] focus-within:bg-white focus-within:ring-4 focus-within:ring-[#0da687]/15 transition-all shadow-sm">
                      <div className="flex items-center justify-center px-3.5 sm:px-4.5 py-3 sm:py-3.5 bg-slate-100/80 border-r border-slate-200/80 text-slate-700 font-bold text-base sm:text-xl select-none">
                        ₹
                      </div>
                      <input
                        type="text"
                        required
                        value={inputs.detailVal}
                        onChange={(e) => setInputs({ ...inputs, detailVal: e.target.value })}
                        placeholder={product.placeholder || "e.g. 5,000"}
                        className="w-full py-3 sm:py-3.5 px-3 sm:px-4 bg-transparent text-slate-900 font-bold text-sm sm:text-lg placeholder:text-slate-400 placeholder:font-normal outline-none"
                      />
                    </div>
                  </div>

                  {/* Step 1 Footer Action Bar */}
                  <div className="px-5 sm:px-8 pb-5 sm:pb-6 flex flex-col sm:flex-row items-center justify-between gap-3.5 sm:gap-4 mt-auto">
                    <div className="flex items-center gap-2 text-slate-500 text-[11px] sm:text-xs font-medium justify-center sm:justify-start">
                      <ShieldIcon className="w-4 h-4 text-slate-400 shrink-0" />
                      <span>Your information is secure with FINSOCAP</span>
                    </div>

                    <button
                      type="submit"
                      className="w-full sm:w-auto bg-[#1e3a8a] hover:bg-[#172e6e] text-white font-extrabold text-sm sm:text-base px-7 sm:px-8 py-3 sm:py-3.5 rounded-full shadow-lg shadow-indigo-950/20 hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer border border-indigo-900/30 hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <span>Continue</span>
                      <span className="text-lg leading-none">&rarr;</span>
                    </button>
                  </div>
                </>
              ) : (
                /* STEP 2: Contact Information */
                <>
                  <div className="p-5 sm:p-8 py-4 sm:py-5 flex flex-col gap-3.5 sm:gap-4">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#0da687] text-white flex items-center justify-center text-[11px] sm:text-xs font-black shadow-sm">
                        2
                      </span>
                      <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-slate-400">
                        STEP 2 OF 2
                      </span>
                    </div>

                    <h4 className="text-sm sm:text-lg font-black text-[#0f172a] leading-snug">
                      Where should we send your comparison quotes?
                    </h4>

                    <div className="flex flex-col gap-3 mt-1">
                      <div>
                        <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wide mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          required
                          value={inputs.name}
                          onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
                          placeholder="e.g. Rahul Sharma"
                          className="w-full bg-[#f4f7fb] border border-slate-200/90 rounded-xl px-3.5 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold outline-none focus:border-[#0da687] focus:bg-white text-slate-800 transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wide mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          required
                          value={inputs.email}
                          onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
                          placeholder="e.g. rahul@example.com"
                          className="w-full bg-[#f4f7fb] border border-slate-200/90 rounded-xl px-3.5 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold outline-none focus:border-[#0da687] focus:bg-white text-slate-800 transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wide mb-1">
                          Mobile Number
                        </label>
                        <input
                          type="tel"
                          required
                          pattern="[0-9]{10}"
                          value={inputs.phone}
                          onChange={(e) => setInputs({ ...inputs, phone: e.target.value })}
                          placeholder="e.g. 9876543210"
                          className="w-full bg-[#f4f7fb] border border-slate-200/90 rounded-xl px-3.5 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold outline-none focus:border-[#0da687] focus:bg-white text-slate-800 transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Step 2 Footer Action Bar */}
                  <div className="px-5 sm:px-8 pb-5 sm:pb-6 flex flex-col-reverse sm:flex-row items-center justify-between gap-3.5 sm:gap-4 mt-auto">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer py-1"
                    >
                      &larr; Back to Step 1
                    </button>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto bg-[#0da687] hover:bg-[#0b8c71] text-white font-extrabold text-sm sm:text-base px-7 sm:px-8 py-3 sm:py-3.5 rounded-full shadow-lg shadow-[#0da687]/20 hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer border border-[#0da687]/30 hover:scale-[1.02] active:scale-[0.98]"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <span>Get Instant Quotes &rarr;</span>
                      )}
                    </button>
                  </div>
                </>
              )}
            </form>
          )}
        </div>

        {/* Sub-Footer Bottom Bar */}
        <div className="relative border-t border-slate-100 bg-slate-50/70 px-5 sm:px-8 py-2.5 sm:py-3 flex items-center justify-between overflow-hidden rounded-b-[24px] sm:rounded-b-[32px]">
          <div className="absolute -bottom-4 -left-4 w-28 h-12 bg-gradient-to-tr from-[#0da687]/20 to-transparent rounded-tr-full pointer-events-none opacity-60" />

          <div className="ml-auto flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] font-bold text-slate-400 z-10">
            <span className="text-[#0da687] font-black tracking-widest text-xs sm:text-sm leading-none">•••</span>
            <span>Smarter Investments. Brighter Futures.</span>
          </div>
        </div>

      </div>
    </div>
  );
}
