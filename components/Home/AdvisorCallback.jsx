"use client";

import { useState } from "react";
import { sendWeb3Form } from "@/lib/web3forms";

export default function AdvisorCallback() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name && phone) {
      setIsSubmitting(true);
      setErrorMsg("");

      const res = await sendWeb3Form(
        {
          name,
          phone,
          form_name: "Advisor Callback Request",
        },
        "New Advisor Callback Request - Finsocap"
      );

      setIsSubmitting(false);
      if (res.success) {
        setSubmitted(true);
        setName("");
        setPhone("");
      } else {
        setErrorMsg(res.message || "Could not submit. Please try again.");
      }
    }
  };

  return (
    <section className="py-6 sm:py-8 md:py-10 lg:py-14 bg-white font-sans">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="relative overflow-hidden rounded-[28px] sm:rounded-[36px] lg:rounded-[40px] bg-gradient-to-br from-[#eef8f5] via-[#e2f4ef] to-[#cbeee4] border border-[#c2e8dd] shadow-md p-5 sm:p-7 md:p-8 lg:p-12 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 lg:gap-6 min-h-0 lg:min-h-[440px]">
          
          {/* Full Banner Background Image ONLY ON DESKTOP/LAPTOP (lg+) */}
          <img
            src="/requestcallback.png"
            alt="Talk to Our Advisors"
            className="hidden lg:block absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none z-0"
          />

          {/* Left Text & Feature Pills */}
          <div className="relative z-10 w-full md:w-[50%] lg:w-[42%] max-w-lg">
            <div className="inline-flex items-center gap-2 bg-[#d4eae4]/90 backdrop-blur-sm text-[#0d6457] px-3 py-1 rounded-full text-[10px] sm:text-xs font-extrabold tracking-wider uppercase mb-3 sm:mb-4 shadow-sm border border-[#bce2d7]/60">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                <path d="M19 11a7 7 0 0 1-7 7m0 0a7 7 0 0 1-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
              </svg>
              <span>DIRECT SUPPORT</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-[38px] xl:text-[44px] font-extrabold tracking-tight leading-[1.15] lg:leading-[1.12]">
              <span className="text-[#102a45]">Confused by Policies?</span> <br />
              <span className="text-[#0d846c]">Talk to Our Advisors.</span>
            </h2>

            <p className="text-slate-600 text-xs sm:text-sm mt-2 sm:mt-3 leading-relaxed font-medium max-w-md">
              Submit your phone number, and a certified Finsocap consultant will call you back within 15 minutes to review loan terms or draft tax structures.
            </p>

            {/* Bottom 3 Feature Pills */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 md:gap-5 mt-4 sm:mt-6 pt-1">
              <div className="flex items-center gap-2.5 bg-white/70 md:bg-white/80 backdrop-blur-sm border border-emerald-100/80 px-3 py-2 rounded-2xl shadow-xs">
                <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#d4eae4] text-[#0d846c] flex items-center justify-center flex-shrink-0">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                  </svg>
                </span>
                <div className="text-[10px] sm:text-xs font-bold text-slate-700 leading-tight">
                  Quick<br />Response
                </div>
              </div>

              <div className="flex items-center gap-2.5 bg-white/70 md:bg-white/80 backdrop-blur-sm border border-emerald-100/80 px-3 py-2 rounded-2xl shadow-xs">
                <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#d4eae4] text-[#0d846c] flex items-center justify-center flex-shrink-0">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="M9 12l2 2 4-4" />
                  </svg>
                </span>
                <div className="text-[10px] sm:text-xs font-bold text-slate-700 leading-tight">
                  Certified<br />Advisors
                </div>
              </div>

              <div className="flex items-center gap-2.5 bg-white/70 md:bg-white/80 backdrop-blur-sm border border-emerald-100/80 px-3 py-2 rounded-2xl shadow-xs">
                <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#d4eae4] text-[#0d846c] flex items-center justify-center flex-shrink-0">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </span>
                <div className="text-[10px] sm:text-xs font-bold text-slate-700 leading-tight">
                  No Obligation<br />Consultation
                </div>
              </div>
            </div>
          </div>

          {/* Right Floating Form Card */}
          <div className="relative z-10 w-full md:w-[48%] lg:w-auto flex justify-center md:justify-end">
            <div className="w-full sm:w-[350px] md:w-full lg:w-[380px] xl:w-[400px] bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-xl border border-slate-100/90">
              {submitted ? (
                <div className="text-center py-6 flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-[#0da687]/15 border border-[#0da687]/30 flex items-center justify-center mb-3">
                    <svg className="w-6 h-6 text-[#0da687]" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <polyline points="4 12 9 17 20 6" className="animate-draw-check" />
                    </svg>
                  </div>
                  <h3 className="font-extrabold text-slate-800 text-base">Callback Scheduled!</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Our advisor will contact you shortly on your provided phone number.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 bg-[#3558b8] hover:bg-[#294699] text-white px-7 py-2 rounded-xl text-xs font-bold shadow-sm transition-colors cursor-pointer"
                  >
                    OK
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  <div>
                    <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">
                      Request a Callback
                    </h3>
                    <p className="text-[11px] sm:text-xs text-slate-500 font-medium mt-0.5">
                      Our expert will get in touch with you shortly.
                    </p>
                  </div>

                  <div className="space-y-2.5 mt-0.5">
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                          <circle cx="12" cy="7" r="4" />
                        </svg>
                      </span>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full bg-[#f8fafc] border border-slate-200/80 rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-slate-800 outline-none focus:border-[#0d846c] focus:bg-white transition-all placeholder:text-slate-400"
                      />
                    </div>

                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                        </svg>
                      </span>
                      <input
                        type="tel"
                        required
                        pattern="[0-9]{10}"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. 9876543210"
                        className="w-full bg-[#f8fafc] border border-slate-200/80 rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-slate-800 outline-none focus:border-[#0d846c] focus:bg-white transition-all placeholder:text-slate-400"
                      />
                    </div>
                  </div>

                  {errorMsg && (
                    <div className="text-[11px] text-rose-600 bg-rose-50 border border-rose-200 p-2 rounded-xl font-medium">
                      {errorMsg}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#3558b8] hover:bg-[#284697] disabled:opacity-70 text-white py-3 rounded-xl font-bold text-xs mt-0.5 transition-all duration-200 shadow-md shadow-blue-900/15 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Sending request...</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                        </svg>
                        <span>Request Advisor Callback</span>
                        <svg className="w-3.5 h-3.5 ml-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400 font-medium mt-0.5">
                    <svg className="w-3 h-3 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    <span>Your information is safe with us</span>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
