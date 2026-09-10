"use client";

import React, { useState } from "react";
import Link from "next/link";
import { sendWeb3Form } from "@/lib/web3forms";

interface PricingGroup {
  groupName: string;
  tiers: { bracket: string; fee: string; note?: string }[];
}

interface ProductDetails {
  title: string;
  desc: string;
  tagline: string;
  metricLabel: string;
  pricingTiers?: { bracket: string; fee: string; note: string }[];
  groupedPricing?: PricingGroup[];
  features: string[];
  faqs: { q: string; a: string }[];
}

const taxData: Record<string, ProductDetails> = {
  itr: {
    title: "CA-Assisted Income Tax Filing (ITR)",
    desc: "File your personal, professional, or Company income tax returns with experienced CAs. Ensure 100% compliance, zero notices, and maximum legal tax refunds.",
    tagline: "Expert-assisted ITR filing starting from just ₹999 with maximum tax saving optimization",
    metricLabel: "Select primary income source category",
    pricingTiers: [
      { bracket: "Salaried Individual (Form 16)", fee: "Starts from ₹999", note: "Standard single Form 16 filing with professional CA review" },
      { bracket: "Non-Salaried Individuals", fee: "Starts from ₹1,999", note: "Professional/Freelancer, Capital Gains, House Properties" },
      { bracket: "Business ITR", fee: "Get Quote", note: "Proprietorship, Partnership, LLP, or Pvt Ltd tax returns" }
    ],
    features: [
      "Assigned dedicated personal Chartered Accountant (CA)",
      "Cross-check AIS/TIS statement files to avoid tax mismatches",
      "Optimize capital gains adjustments and loss carry-forwards",
      "Full post-filing support for rectifications or query letters"
    ],
    faqs: [
      { q: "What is the deadline for filing ITR in India?", a: "For individuals, the standard annual deadline is July 31st of the assessment year (unless extended by the CBDT). For audits, it is October 31st." },
      { q: "What happens if I make a mistake in my return?", a: "You can file a Revised Return under Section 139(5) anytime before the end of the relevant assessment year to correct any errors without penalty." }
    ]
  },
  accounting: {
    title: "Accounting & Bookkeeping Services",
    desc: "Outsource your startup or SME bookkeeping, ledger management, payroll processing, and audit compliance to certified Finsocap accountants.",
    tagline: "Ensure absolute accounting sheet accuracy and stay business audit ready",
    metricLabel: "Select monthly business transaction volume",
    pricingTiers: [
      { bracket: "Micro Startup (<100 transactions/month)", fee: "₹2,499/month", note: "Monthly ledgers, bank reconciliation, standard P&L sheets" },
      { bracket: "Growing Business (100–500 transactions/month)", fee: "₹6,999/month", note: "Includes accounts payable/receivable monitoring and payroll" },
      { bracket: "Enterprise Scale (>500 transactions/month)", fee: "Get Quote", note: "Dedicated full-time virtual accountant & direct audit coordination" }
    ],
    features: [
      "Maintain active, updated ledgers compliant with Companies Act",
      "Monthly bank account reconciliation sheets completed",
      "Accurate P&L, Balance Sheet, and Cash Flow metrics generated",
      "Audit-ready folders prepared for statutory audits"
    ],
    faqs: [
      { q: "What accounting software does Finsocap support?", a: "Our team is expert across Tally, Zoho Books, QuickBooks, and Xero. We integrate with your existing cloud ledger setups." },
      { q: "Why outsource bookkeeping instead of hiring in-house?", a: "Outsourcing saves up to 60% in overheads compared to a full-time employee, while providing access to a collective team of CAs for complex compliance reviews." }
    ]
  },
  gst: {
    title: "GST Registration & Return Filing",
    desc: "Secure new GST registration files or manage monthly/quarterly GST returns (GSTR-1, GSTR-3B) with absolute compliance.",
    tagline: "Avoid late penalties and match Input Tax Credit (ITC) with 100% accuracy",
    metricLabel: "Select GST frequency scheme preference",
    pricingTiers: [
      { bracket: "GST Registration (New Setup)", fee: "Starts from ₹1,999", note: "Includes GSTIN certificate generation & advisory on HSN codes" },
      { bracket: "Monthly Return Filing (GSTR-1 & GSTR-3B)", fee: "Starts from ₹999/month", note: "Includes GSTR-2B purchase credit reconciliation checks" },
      { bracket: "Composition Scheme Returns (QRMP)", fee: "Starts from ₹1,999/quarter", note: "Best for low turnover retailers under QRMP flat schemes" }
    ],
    features: [
      "Reconciliation of purchase invoices with GSTR-2B ensuring full ITC",
      "Draft GSTR-1 (sales) and GSTR-3B (tax payment) returns monthly",
      "Advisory on GST rate classification and reverse charge (RCM)",
      "Speedy reply support to GST notices and tax warnings"
    ],
    faqs: [
      { q: "What is Input Tax Credit (ITC) reconciliation?", a: "It is the process of matching GST numbers on purchase invoices with your suppliers' uploaded GSTR-1 filings. You can only claim credits for tax that appears on GSTR-2B." },
      { q: "What is the threshold turnover limit for GST registration?", a: "For supply of goods, registration is mandatory for businesses with turnover exceeding ₹40 Lakhs (₹20 Lakhs for hill states). For services, the limit is ₹20 Lakhs." }
    ]
  },
  compliance: {
    title: "Company & Startup Compliance",
    desc: "Handle company incorporation, ROC filings, director KYC registration, statutory registers, and government audits seamlessly.",
    tagline: "Stay fully compliant with Ministry of Company Affairs (MCA) mandates",
    metricLabel: "Choose incorporation or ROC compliance type",
    groupedPricing: [
      {
        groupName: "Registration",
        tiers: [
          { bracket: "Udyam Registration", fee: "Starts from ₹999", note: "MSME registration for business benefits & subsidies" },
          { bracket: "FSSAI Registration", fee: "Starts from ₹1,499", note: "Food license registration for food business operators" },
          { bracket: "EPF Registration", fee: "Starts from ₹4,999", note: "Employee Provident Fund registration for employers" },
          { bracket: "ESI Registration", fee: "Starts from ₹4,999", note: "Employee State Insurance registration for employers" },
          { bracket: "12A & 80G Registration", fee: "Starts from ₹5,999", note: "Income tax exemption registrations for NGOs & Trusts" }
        ]
      },
      {
        groupName: "New Setup",
        tiers: [
          { bracket: "Partnership Firm Registration", fee: "Starts from ₹1,999", note: "Partnership deed drafting and firm registration setup" },
          { bracket: "OPC Registration", fee: "Starts from ₹2,499", note: "One Person Company registration with legal setup" },
          { bracket: "LLP Registration", fee: "Starts from ₹2,499", note: "Limited Liability Partnership registration & deed draft" },
          { bracket: "Private Limited Company Registration", fee: "Starts from ₹2,999", note: "Pvt Ltd company registration, DIN, DSC & name approval" },
          { bracket: "Trust Registration", fee: "Starts from ₹2,999", note: "Trust deed drafting & official trust registration" }
        ]
      },
      {
        groupName: "Other Services",
        tiers: [
          { bracket: "Powerful Logos for Your Brand", fee: "Starts from ₹1,999", note: "Brand identity, creative custom logo design options" },
          { bracket: "Copyright Registration", fee: "Starts from ₹4,999", note: "Legal protection registration for creative and original works" },
          { bracket: "Trademark Application & Filing", fee: "Starts from ₹1,999", note: "Brand name, logo, or slogan trademark application filing" }
        ]
      }
    ],
    features: [
      "Company name approval checks and DSC/DIN generation",
      "ROC filings submitted before due dates avoiding hefty MCA fines",
      "Statutory registers maintained and minute books drafted",
      "Advisory support on FEMA, FDI compliance, and ESOP schemes"
    ],
    faqs: [
      { q: "What is Udyam Registration?", a: "It is a government registration for micro, small, and medium enterprises (MSMEs). It allows businesses to claim benefits under MSME schemes, lower loan interest rates, and priority sector lending." },
      { q: "Why register a Trademark?", a: "A trademark protects your brand identity, logo, or slogan from being copied or used by competitors, granting you exclusive nationwide ownership rights." }
    ]
  }
};

export default function TaxClient({ slug }: { slug: string }) {
  const data = taxData[slug];

  const [selectedPlan, setSelectedPlan] = useState<{ name: string; fee: string } | null>(null);
  const [callbackName, setCallbackName] = useState("");
  const [callbackPhone, setCallbackPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  if (!data) {
    return (
      <div className="container mx-auto py-20 text-center font-sans">
        <h2 className="text-2xl font-bold">Tax category not found</h2>
        <Link href="/" className="text-brand-blue hover:underline mt-4 inline-block">
          Return to home page
        </Link>
      </div>
    );
  }

  const handleApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (callbackName && callbackPhone) {
      try {
        await sendWeb3Form(
          {
            name: callbackName,
            phone: callbackPhone,
            service: data.title,
            selected_package: selectedPlan ? `${selectedPlan.name} (${selectedPlan.fee})` : "General",
          },
          `New CA Tax Consultation Request: ${data.title} - Finsocap`
        );
      } catch (err) {
        console.error(err);
      }
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setSelectedPlan(null);
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
          <span className="text-slate-600">Finance Consultancy</span>
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
                  FINANCE CONSULTANCY
                </span>
                <span className="w-8 h-[2px] bg-[#0da687] rounded-full inline-block" />
              </div>

              {/* Dual-color headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-[48px] font-black text-slate-900 leading-[1.15] tracking-tight">
                {data.title.includes("Filing") ? (
                  <>
                    {data.title.replace("Filing", "")}
                    <span className="text-[#0da687]">Filing</span>
                  </>
                ) : data.title.includes("Services") ? (
                  <>
                    {data.title.replace("Services", "")}
                    <span className="text-[#0da687]">Services</span>
                  </>
                ) : data.title.includes("Compliance") ? (
                  <>
                    {data.title.replace("Compliance", "")}
                    <span className="text-[#0da687]">Compliance</span>
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
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <polyline points="9 12 11 14 15 10" />
                </svg>
                <span>★ {data.tagline}</span>
              </div>

              {/* 4 Feature Icon Pills Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-7 w-full max-w-2xl">
                {data.features.map((feat, idx) => {
                  const icons = [
                    <svg key="1" className="w-5 h-5 text-[#0da687]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
                    <svg key="2" className="w-5 h-5 text-[#0da687]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>,
                    <svg key="3" className="w-5 h-5 text-[#0da687]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
                    <svg key="4" className="w-5 h-5 text-[#0da687]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
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
                src="/finance-.png"
                alt="Finsocap Finance Consultancy Banner"
                className="w-full h-full object-cover object-center"
              />

              {/* Floating Tagline Script on Top Right */}
              <div className="absolute top-4 right-5 z-20 pointer-events-none">
                <span className="font-serif italic text-base sm:text-xl font-black text-[#3652a0] drop-shadow-sm tracking-wide block transform rotate-[-2deg]">
                  Expert CA Assistance
                </span>
              </div>

              {/* Floating Feature Card on Left Side */}
              <div className="absolute bottom-5 left-5 z-20 bg-white/95 backdrop-blur-md px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 max-w-[240px] sm:max-w-[260px]">
                <span className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#3652a0] text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </span>
                <div className="min-w-0">
                  <span className="block font-black text-slate-900 text-xs sm:text-sm leading-tight truncate">
                    100% Tax Notice Protection
                  </span>
                  <span className="block text-[10px] sm:text-[11px] font-bold text-[#0da687] mt-0.5 flex items-center gap-1">
                    Zero Notice Guarantee &rarr;
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Package & Pricing Selector Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          <div className="lg:col-span-12 bg-white border border-slate-150 p-6 sm:p-10 rounded-3xl shadow-sm">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-8">
                <span className="text-xs font-black uppercase tracking-widest text-[#0da687] bg-[#e6f7f3] px-3.5 py-1 rounded-full">
                  SERVICE PACKAGES
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
                  Select Package & Plan
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Choose a suitable tier below to book a consultation with our experienced CAs.
                </p>
              </div>

            {selectedPlan !== null ? (
              <div className="flex flex-col gap-4">
                {submitted ? (
                  <div className="text-center py-6">
                    <span className="inline-flex w-12 h-12 rounded-full bg-brand-teal/10 text-brand-teal items-center justify-center text-xl font-bold mb-4">
                      ✓
                    </span>
                    <h4 className="font-bold text-slate-800 text-sm">Consultation Scheduled!</h4>
                    <p className="text-[10px] text-slate-450 mt-1">Our finance expert will call you within 15 minutes.</p>
                  </div>
                ) : (
                  <form onSubmit={handleApplySubmit} className="flex flex-col gap-4">
                    <span className="text-[11px] text-brand-teal bg-brand-teal/10 p-3 rounded-lg font-bold">
                      Selected: {selectedPlan.name} ({selectedPlan.fee})
                    </span>

                    <div>
                      <label className="block text-[9px] font-bold text-slate-450 uppercase mb-1">Your Name</label>
                      <input
                        type="text"
                        required
                        value={callbackName}
                        onChange={(e) => setCallbackName(e.target.value)}
                        placeholder="e.g. Ramesh Deshmukh"
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
                      Connect with Finance Expert &rarr;
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedPlan(null)}
                      className="text-[10px] text-slate-400 hover:text-slate-600 font-semibold text-center"
                    >
                      &larr; Return to plans
                    </button>
                  </form>
                )}
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">
                  {data.metricLabel}
                </span>

                {data.pricingTiers && data.pricingTiers.map((tier, tIdx) => (
                  <button
                    key={tIdx}
                    onClick={() => setSelectedPlan({ name: tier.bracket, fee: tier.fee })}
                    className="w-full text-left bg-white hover:bg-slate-50 border border-slate-100 p-4 rounded-xl flex items-center justify-between shadow-xs transition-all group"
                  >
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-slate-700 group-hover:text-brand-blue transition-colors">
                        {tier.bracket}
                      </h4>
                      <p className="text-[9px] text-slate-400 mt-1">{tier.note}</p>
                    </div>
                    <span className="text-brand-teal font-extrabold text-xs sm:text-sm ml-2 flex-shrink-0">
                      {tier.fee}
                    </span>
                  </button>
                ))}

                {data.groupedPricing && (
                  <div className="flex flex-col gap-5 max-h-[420px] overflow-y-auto pr-1">
                    {data.groupedPricing.map((group, gIdx) => (
                      <div key={gIdx} className="flex flex-col gap-2">
                        <h4 className="text-[10px] text-brand-blue font-extrabold uppercase tracking-widest bg-brand-blue/5 px-2.5 py-1 rounded w-fit">
                          {group.groupName}
                        </h4>
                        <div className="flex flex-col gap-2">
                          {group.tiers.map((tier, tIdx) => (
                            <button
                              key={tIdx}
                              onClick={() => setSelectedPlan({ name: tier.bracket, fee: tier.fee })}
                              className="w-full text-left bg-white hover:bg-slate-50 border border-slate-100 p-3 rounded-xl flex items-center justify-between shadow-xs transition-all group"
                            >
                              <div className="pr-2">
                                <h5 className="font-bold text-xs text-slate-700 group-hover:text-brand-blue transition-colors">
                                  {tier.bracket}
                                </h5>
                                {tier.note && <p className="text-[9px] text-slate-400 mt-0.5">{tier.note}</p>}
                              </div>
                              <span className="text-brand-teal font-extrabold text-[11px] sm:text-xs ml-2 flex-shrink-0">
                                {tier.fee}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <p className="text-[9px] text-slate-400 mt-3 leading-relaxed border-t border-slate-200/60 pt-2.5">
                  * Note: The prices mentioned above represent our professional consultation and service fees only. Government fees, statutory charges, taxes, and other applicable filing or registration costs, if any, will be payable separately by the customer as per actual requirements.
                </p>
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

        {/* About Finance Consultancy */}
        <div className="bg-gradient-to-br from-amber-50/40 to-slate-50 border border-slate-100 p-8 sm:p-10 rounded-[32px] shadow-sm mt-12 mb-16">
          <h3 className="font-extrabold text-slate-800 text-lg mb-4">Finance Consultancy</h3>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
            Our team of experienced Chartered Accountants (CAs) and finance professionals is committed to helping individuals, startups, and businesses achieve sustainable growth through expert financial guidance and compliance support.
          </p>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
            From Income Tax Filing and Accounting to GST, Bookkeeping, and Business Compliance, we provide reliable, accurate, and timely services tailored to your business needs. Our objective is to simplify financial management so that you can focus on growing your business with confidence.
          </p>
          <p className="text-slate-750 text-xs sm:text-sm font-bold leading-relaxed">
            Partner with our experts for professional advice, seamless compliance, and best-in-class financial services to support your business growth journey.
          </p>
        </div>

      </div>
    </div>
  );
}
