"use client";

import { useState } from "react";
import { sendWeb3Form } from "@/lib/web3forms";

// Inline icons
const CloseIcon = () => (
  <svg className="w-5 h-5 text-slate-400 hover:text-slate-600 transition-colors" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const SuccessCheckIcon = () => (
  <svg className="w-8 h-8 text-[#0da687]" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <polyline points="4 12 9 17 20 6" className="animate-draw-check" />
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

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative bg-white border border-slate-100 rounded-[32px] w-full max-w-md shadow-2xl p-6 sm:p-8 overflow-y-auto max-h-[90vh] z-10 transition-all duration-300 font-sans">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
          <div>
            <span className="text-[10px] text-[#0da687] uppercase bg-[#0da687]/10 px-2.5 py-0.5 rounded-full font-black tracking-wider">
              Finsocap Assistant
            </span>
            <h3 className="font-extrabold text-slate-800 text-base sm:text-lg mt-1">
              Get Quotes: {product.name}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Success Screen */}
        {showResults ? (
          <div className="flex flex-col items-center text-center py-4 sm:py-6">
            <div className="w-16 h-16 rounded-full bg-[#0da687]/15 border-2 border-[#0da687]/30 flex items-center justify-center mb-5 shadow-sm">
              <SuccessCheckIcon />
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mb-2">
              Request Submitted!
            </h3>

            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-xs mb-8">
              Thank you, <span className="font-bold text-slate-700">{inputs.name || "Customer"}</span>! Our certified financial advisor will reach out to you on <span className="font-bold text-slate-700">{inputs.phone}</span> shortly.
            </p>

            <button
              onClick={onClose}
              className="w-full bg-[#0da687] hover:bg-[#0b8c71] text-white font-bold text-sm py-3.5 px-8 rounded-full shadow-lg shadow-[#0da687]/20 hover:shadow-xl transition-all cursor-pointer text-center"
            >
              OK
            </button>
          </div>
        ) : (
          /* Form Screen */
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {step === 1 ? (
              /* Step 1: Requirement input */
              <div className="flex flex-col gap-4">
                <div>
                  <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">
                    Step 1 of 2
                  </span>
                  <h4 className="font-extrabold text-slate-800 text-sm sm:text-[15px] mt-1 leading-snug">
                    {product.wizardLabel}
                  </h4>
                </div>

                <input
                  type="text"
                  required
                  value={inputs.detailVal}
                  onChange={(e) => setInputs({ ...inputs, detailVal: e.target.value })}
                  placeholder={product.placeholder}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs sm:text-sm outline-none focus:border-[#0da687] text-slate-800 transition-colors"
                />

                <button
                  type="submit"
                  className="bg-[#3652a0] hover:bg-[#2b417d] text-white py-3.5 rounded-full font-bold text-xs sm:text-sm mt-3 transition-colors cursor-pointer text-center shadow-md shadow-indigo-900/10"
                >
                  Continue &rarr;
                </button>
              </div>
            ) : (
              /* Step 2: Contact Info */
              <div className="flex flex-col gap-4">
                <div>
                  <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">
                    Step 2 of 2
                  </span>
                  <h4 className="font-extrabold text-slate-800 text-sm sm:text-[15px] mt-1 leading-snug">
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
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-[#0da687] text-slate-800"
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
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-[#0da687] text-slate-800"
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
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-[#0da687] text-slate-800"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#0da687] hover:bg-[#0b8c71] text-white py-3.5 rounded-full font-bold text-xs sm:text-sm mt-3 transition-colors cursor-pointer text-center flex items-center justify-center gap-2 shadow-md shadow-[#0da687]/20"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Submitting request...</span>
                    </>
                  ) : (
                    <span>Submit Quote Request &rarr;</span>
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
