"use client";

import { useState } from "react";
import { sendWeb3Form, WEB3FORMS_ACCESS_KEY } from "@/lib/web3forms";

export default function ContactForm({ title = "Send Us a Message", subtitle = "Have a query or need financial guidance? Reach out and our experts will get back to you.", customSubject = "New Contact Form Inquiry - Finsocap" }) {
  const [result, setResult] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setResult("Sending message...");
    setIsSuccess(false);

    const formData = new FormData(event.target);
    formData.append("access_key", WEB3FORMS_ACCESS_KEY);
    formData.append("subject", customSubject);
    formData.append("from_name", "Finsocap Contact Form");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        setIsSuccess(true);
        setResult("Form Submitted Successfully! We will reach out shortly.");
        event.target.reset();
      } else {
        setIsSuccess(false);
        setResult(data.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setIsSuccess(false);
      setResult("Network error. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-lg bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-lg font-sans">
      {title && (
        <h3 className="text-xl sm:text-2xl font-extrabold text-slate-850 tracking-tight mb-2">
          {title}
        </h3>
      )}
      {subtitle && (
        <p className="text-xs sm:text-sm text-slate-500 mb-6 leading-relaxed">
          {subtitle}
        </p>
      )}

      {result && (
        <div
          className={`p-4 mb-6 rounded-2xl text-xs sm:text-sm font-semibold flex items-center gap-3 transition-all ${
            isSuccess
              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
              : "bg-rose-50 text-rose-700 border border-rose-200"
          }`}
        >
          <span className="text-base">{isSuccess ? "✓" : "⚠"}</span>
          <span>{result}</span>
        </div>
      )}

      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wide mb-1.5">
            Full Name <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            required
            placeholder="e.g. Rajesh Kumar"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm outline-none focus:border-brand-blue text-slate-850 placeholder:text-slate-400 transition-colors"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wide mb-1.5">
              Email Address <span className="text-rose-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="e.g. rajesh@example.com"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm outline-none focus:border-brand-blue text-slate-850 placeholder:text-slate-400 transition-colors"
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wide mb-1.5">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              pattern="[0-9]{10}"
              placeholder="e.g. 9876543210"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm outline-none focus:border-brand-blue text-slate-850 placeholder:text-slate-400 transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wide mb-1.5">
            Message / Query <span className="text-rose-500">*</span>
          </label>
          <textarea
            name="message"
            required
            rows={4}
            placeholder="How can we assist you with loans, insurance, investments, or taxes?"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm outline-none focus:border-brand-blue text-slate-850 placeholder:text-slate-400 transition-colors resize-none"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-brand-blue hover:bg-brand-blue-hover disabled:opacity-70 text-white py-3.5 rounded-xl font-bold text-xs sm:text-sm mt-2 transition-all cursor-pointer shadow-md shadow-brand-blue/15 flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Sending...</span>
            </>
          ) : (
            <span>Submit Form &rarr;</span>
          )}
        </button>
      </form>
    </div>
  );
}
