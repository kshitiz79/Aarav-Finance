"use client";

import React, { useState } from "react";
import Link from "next/link";
import { sendWeb3Form } from "@/lib/web3forms";

interface ProductDetails {
  title: string;
  desc: string;
  tagline: string;
  metricLabel: string;
  metricPlaceholder: string;
  faqs: { q: string; a: string }[];
  features: string[];
}

const insuranceData: Record<string, ProductDetails> = {
  health: {
    title: "Health Insurance Plans",
    desc: "Protect your family against rising medical expenses with Finsocap cashless health policies.",
    tagline: "Save up to 25% on annual premiums & claim tax deductions u/s 80D",
    metricLabel: "Age of eldest member to insure",
    metricPlaceholder: "e.g. 35",
    features: [
      "10,000+ Cashless Hospital Networks",
      "Save up to ₹25,000 u/s 80D tax savings",
      "No pre-medical checks up to age 45",
      "Instant cashless claim settlement in 30 minutes"
    ],
    faqs: [
      { q: "What is Section 80D deduction?", a: "Under Section 80D of the Income Tax Act, you can claim tax deductions up to ₹25,000 annually for health insurance premiums paid for yourself and family, and an additional ₹50,000 for senior citizen parents." },
      { q: "What does cashless hospitalization mean?", a: "It means that you do not have to pay medical bills directly at network hospitals; Finsocap's partner insurers settle bills directly with the healthcare provider." }
    ]
  },
  life: {
    title: "Term Life Insurance Plans",
    desc: "Secure your family's future and build a financial safety net with high-cover term plans.",
    tagline: "Get ₹1 Crore life cover starting from just ₹450 per month",
    metricLabel: "Desired cover amount (Sum Assured)",
    metricPlaceholder: "e.g. ₹1 Crore",
    features: [
      "Tax exemptions u/s 80C on premium premiums",
      "Critical illness covers integrated",
      "99.5% Claim Settlement Ratio partners",
      "Accidental death benefits riders available"
    ],
    faqs: [
      { q: "What is term insurance?", a: "Term insurance is a pure life cover policy that pays out the entire sum assured to nominees in case of the policyholder's death within the term period." },
      { q: "How much term cover do I need?", a: "A rule of thumb is to secure a term cover equal to 10 to 15 times your annual salary plus outstanding liabilities." }
    ]
  },
  car: {
    title: "Car Insurance Policies",
    desc: "Renew or buy comprehensive car insurance policies instantly and protect your vehicle.",
    tagline: "Get comprehensive packages with up to 80% discount on own-damage premiums",
    metricLabel: "Enter car make and registration year",
    metricPlaceholder: "e.g. Maruti Swift, 2021",
    features: [
      "Cashless repairs across 5,000+ garages",
      "Zero depreciation & engine protection add-ons",
      "Instant online policy copy in 2 minutes",
      "No claim bonus (NCB) transfer support"
    ],
    faqs: [
      { q: "What is zero depreciation cover?", a: "A zero depreciation cover ensures that during claim settlements, the insurer pays the complete cost of replacement parts without subtracting depreciation values." },
      { q: "Can I transfer my No Claim Bonus (NCB)?", a: "Yes, you can transfer your accrued NCB (up to 50%) from your previous car insurer to Finsocap's partners instantly." }
    ]
  },
  bike: {
    title: "Two-Wheeler Insurance Policies",
    desc: "Secure your bike or scooter against damages, thefts, and third-party liabilities.",
    tagline: "Instant online policy renewal starting at just ₹1.5 per day",
    metricLabel: "Enter bike brand and model",
    metricPlaceholder: "e.g. Honda Activa, 2020",
    features: [
      "Instant third-party or comprehensive policies",
      "Cashless claims at network bike centers",
      "Personal accident cover of ₹15 Lakhs included",
      "Hassle-free online renew setup in seconds"
    ],
    faqs: [
      { q: "Is third-party bike insurance mandatory?", a: "Yes, under the Motor Vehicles Act, holding active third-party liability insurance is legally mandatory for all vehicles on Indian roads." },
      { q: "What does comprehensive bike cover include?", a: "It covers third-party liabilities plus damages to your own bike due to accidents, thefts, natural disasters, or fires." }
    ]
  },
  travel: {
    title: "International Travel Insurance",
    desc: "Travel securely across global destinations with extensive medical and trip covers.",
    tagline: "Baggage loss, medical emergencies, and flight delays covered internationally",
    metricLabel: "Specify travel destination country",
    metricPlaceholder: "e.g. USA, Europe, Thailand",
    features: [
      "Emergency medical hospitalization cover up to $500,000",
      "Loss of passport and baggage delay covered",
      "Trip cancellation & flight delay pay-back",
      "Schengen visa compliant policies instantly"
    ],
    faqs: [
      { q: "Is travel insurance compulsory for Schengen visas?", a: "Yes, to secure a Schengen visa, you must hold a travel insurance policy covering at least €30,000 for emergency medical services." },
      { q: "Does travel insurance cover flight cancellations?", a: "Yes, Finsocap travel partners reimburse pre-booked non-refundable travel/lodging costs if flights are canceled due to specified emergencies." }
    ]
  },
  business: {
    title: "Business & Group Insurance Plans",
    desc: "Protect your office, factory assets, or corporate team with tailored business covers.",
    tagline: "Group health insurance, fire liability, and public indemnity covers",
    metricLabel: "Total number of employees to insure",
    metricPlaceholder: "e.g. 50",
    features: [
      "Group health cover (GHI) starting from ₹99/employee/month",
      "Fire, theft & building damage assets covered",
      "Public liability & director indemnity insurance",
      "Custom startup workplace insurance packages"
    ],
    faqs: [
      { q: "What is Group Health Insurance?", a: "It is a unified health insurance policy covering employees of a corporate organization, often extending covers to spouses and children with waived pre-existing condition wait times." },
      { q: "Why does my company need fire insurance?", a: "Fire insurance covers structural rebuilding costs and financial losses of machinery and stocks due to fires or short-circuits, safeguarding your business capital." }
    ]
  }
};

export default function InsuranceClient({ slug }: { slug: string }) {
  const data = insuranceData[slug];

  const [inputVal, setInputVal] = useState("");
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showQuotes, setShowQuotes] = useState(false);
  const [successCallback, setSuccessCallback] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  if (!data) {
    return (
      <div className="container mx-auto py-20 text-center font-sans">
        <h2 className="text-2xl font-bold">Insurance category not found</h2>
        <Link href="/" className="text-brand-blue hover:underline mt-4 inline-block">
          Return to home page
        </Link>
      </div>
    );
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setShowQuotes(true);
    }, 1200);
  };

  const handleCallbackRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (userPhone) {
      try {
        await sendWeb3Form(
          {
            phone: userPhone,
            category: `Insurance - ${data.title}`,
            slug,
          },
          `New Insurance Callback Request: ${data.title} - Finsocap`
        );
      } catch (err) {
        console.error(err);
      }
      setSuccessCallback(true);
      setTimeout(() => setSuccessCallback(false), 5000);
      setUserName("");
      setUserPhone("");
    }
  };

  const simulatedPartners = [
    { name: "Partner Insurer Alpha", premium: "₹1,240 / yr", coverage: "₹5 Lakhs Cover", rating: "4.9/5", highlight: "Superfast 30m Claim" },
    { name: "Partner Insurer Beta", premium: "₹1,560 / yr", coverage: "₹10 Lakhs Cover", rating: "4.8/5", highlight: "Zero Copay benefit" },
    { name: "Partner Insurer Gamma", premium: "₹980 / yr", coverage: "₹5 Lakhs Cover", rating: "4.7/5", highlight: "Best budget plan" }
  ];

  return (
    <div className="bg-slate-50/50 text-slate-800 font-sans min-h-screen pb-16">
      <div className="container mx-auto px-4 max-w-7xl pt-6">
        {/* Breadcrumb */}
        <div className="text-xs text-slate-400 mb-6 flex items-center gap-2 font-semibold">
          <Link href="/" className="hover:text-brand-blue transition-colors">Home</Link>
          <span>/</span>
          <span className="text-slate-600">Insurance</span>
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
                  INSURANCE SOLUTIONS
                </span>
                <span className="w-8 h-[2px] bg-[#0da687] rounded-full inline-block" />
              </div>

              {/* Dual-color headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-[48px] font-black text-slate-900 leading-[1.15] tracking-tight">
                {data.title.includes("Plans") ? (
                  <>
                    {data.title.replace("Plans", "")}
                    <span className="text-[#0da687]">Plans</span>
                  </>
                ) : data.title.includes("Policies") ? (
                  <>
                    {data.title.replace("Policies", "")}
                    <span className="text-[#0da687]">Policies</span>
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
                  // Icon picker based on index
                  const icons = [
                    <svg key="1" className="w-5 h-5 text-[#0da687]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1M9 21v-4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4" /></svg>,
                    <svg key="2" className="w-5 h-5 text-[#0da687]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
                    <svg key="3" className="w-5 h-5 text-[#0da687]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
                    <svg key="4" className="w-5 h-5 text-[#0da687]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
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

            {/* RIGHT COLUMN: Hero Banner Graphic Image matching Screenshot 2 */}
            <div className="lg:col-span-5 relative w-full h-[320px] sm:h-[400px] lg:h-[440px] rounded-3xl overflow-hidden shadow-md border border-slate-100 flex items-center justify-center bg-gradient-to-br from-[#e6f7f3]/40 via-white to-slate-50">
              <img
                src="/Insurance.png"
                alt="Finsocap Health Insurance Banner"
                className="w-full h-full object-cover object-center"
              />

              {/* Floating Tagline Script on Top Right */}
              <div className="absolute top-4 right-5 z-20 pointer-events-none">
                <span className="font-serif italic text-base sm:text-xl font-black text-[#3652a0] drop-shadow-sm tracking-wide block transform rotate-[-2deg]">
                  Your Health Our Priority
                </span>
              </div>

              {/* Floating Shield Feature Card on Left Side */}
              <div className="absolute bottom-5 left-5 z-20 bg-white/95 backdrop-blur-md px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 max-w-[240px] sm:max-w-[260px]">
                <span className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#0da687] text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </span>
                <div className="min-w-0">
                  <span className="block font-black text-slate-900 text-xs sm:text-sm leading-tight truncate">
                    Complete Health Coverage
                  </span>
                  <span className="block text-[10px] sm:text-[11px] font-bold text-[#0da687] mt-0.5 flex items-center gap-1">
                    For a Healthier Tomorrow &rarr;
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Advantage & Advisory Card Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          <div className="lg:col-span-12 bg-gradient-to-br from-[#eff5fe]/80 to-white border border-slate-100 p-6 sm:p-10 rounded-3xl shadow-xs">
            <h3 className="font-black text-slate-900 text-xl mb-4 flex items-center gap-2">
              <svg className="w-6 h-6 text-[#3652a0]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Finsocap Insurance Advantage
            </h3>
            
            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              Our team of experienced insurance professionals helps individuals and businesses choose the most suitable insurance plans based on their needs and financial goals.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4">
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Whether it is <strong>Health Insurance</strong>, <strong>Term Life Insurance</strong>, <strong>Motor (Car/Bike) Insurance</strong>, <strong>Travel Insurance</strong>, or <strong>Business Insurance</strong>, we provide expert guidance to help you select the right coverage at competitive prices.
              </p>
              
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                We also assist customers with policy servicing, renewals, and claim-related support to ensure a smooth and hassle-free experience.
              </p>
            </div>
            
            <div className="bg-white border border-slate-200/80 p-4 rounded-2xl mt-4 shadow-xs">
              <p className="text-slate-700 text-xs sm:text-sm font-bold leading-relaxed text-center italic">
                &ldquo;Choose the right protection with expert advice and reliable claim assistance at every step of your insurance journey&rdquo;
              </p>
            </div>
          </div>
        </div>

        {/* FAQs Section */}
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

      </div>
    </div>
  );
}
