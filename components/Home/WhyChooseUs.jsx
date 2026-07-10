"use client";

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-slate-50 border-t border-slate-100 font-sans">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <span className="text-brand-teal text-xs font-extrabold uppercase tracking-widest bg-brand-teal/10 px-3 py-1 rounded-full">
            Company Mission
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 mt-4 tracking-tight">
            Why Indians Choose Finsocap
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            We focus on absolute clarity, financial integration, and speed. Here is what we offer under one roof:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex flex-col gap-4">
            <span className="w-12 h-12 rounded-2xl bg-brand-blue/10 text-brand-blue flex items-center justify-center font-extrabold text-lg">
              1
            </span>
            <h3 className="font-extrabold text-slate-850 text-lg sm:text-xl">
              Complete Financial Solutions
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Whether you need home loans, health insurance, direct mutual fund portfolios, or accounting audits, we integrate all plans under a single login.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex flex-col gap-4">
            <span className="w-12 h-12 rounded-2xl bg-brand-teal/10 text-brand-teal flex items-center justify-center font-extrabold text-lg">
              2
            </span>
            <h3 className="font-extrabold text-slate-850 text-lg sm:text-xl">
              Trusted Expert Guidance
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              We support our algorithms with verified human advisors and certified CAs who assist in structuring tax deductions and analyzing loan payouts.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex flex-col gap-4">
            <span className="w-12 h-12 rounded-2xl bg-brand-accent/10 text-brand-accent flex items-center justify-center font-extrabold text-lg">
              3
            </span>
            <h3 className="font-extrabold text-slate-850 text-lg sm:text-xl">
              Fast Assistance Guaranteed
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Our digital workflows submit applications and file returns in minutes. Get swift updates and instant digital policies issued with zero manual lag.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
