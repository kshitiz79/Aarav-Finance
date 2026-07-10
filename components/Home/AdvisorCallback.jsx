"use client";

import { useState } from "react";

export default function AdvisorCallback() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && phone) {
      setSubmitted(true);
      setName("");
      setPhone("");
    }
  };

  return (
    <section className="py-20 bg-white border-t border-slate-100 font-sans">
      <div className="container mx-auto px-4  border border-slate-100 bg-slate-50 p-8 sm:p-12 rounded-[40px] flex flex-col lg:flex-row items-center justify-between gap-10 shadow-sm">
        <div className="max-w-md">
          <span className="text-brand-blue text-xs font-extrabold uppercase tracking-widest bg-brand-blue/10 px-3 py-1 rounded-full">
            Direct Support
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 mt-6 tracking-tight">
            Confused by Policies? Talk to our Advisors.
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-3 leading-relaxed">
            Submit your phone number, and a certified Finsocap consultant will call you back within 15 minutes to review loan terms or draft tax structures.
          </p>
        </div>

        <div className="w-full max-w-sm bg-white border border-slate-150 rounded-3xl p-6 shadow-md">
          {submitted ? (
            <div className="text-center py-8">
              <span className="inline-flex w-12 h-12 rounded-full bg-brand-teal/10 text-brand-teal items-center justify-center text-xl font-bold mb-4">
                ✓
              </span>
              <h3 className="font-extrabold text-slate-800">Callback Scheduled!</h3>
              <p className="text-xs text-slate-400 mt-2">
                Our advisor will contact you shortly on your provided phone number.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1.5">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-brand-blue text-slate-800"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1.5">
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  pattern="[0-9]{10}"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 9876543210"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-brand-blue text-slate-800"
                />
              </div>
              <button
                type="submit"
                className="bg-brand-blue hover:bg-brand-blue-hover text-white py-3 rounded-xl font-bold text-xs mt-2 transition-colors cursor-pointer shadow-md shadow-brand-blue/10"
              >
                Request Advisor Callback
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
