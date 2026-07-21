"use client";

import React, { useState } from "react";
import Link from "next/link";

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

export default function InsurancePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = React.use(params);
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

  const handleCallbackRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (userName && userPhone) {
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
    <div className="bg-white text-slate-800 font-sans min-h-screen py-10">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Breadcrumb */}
        <div className="text-xs text-slate-400 mb-6 flex gap-2 font-semibold">
          <Link href="/" className="hover:text-brand-blue">Home</Link>
          <span>/</span>
          <span className="text-slate-600">Insurance</span>
          <span>/</span>
          <span className="text-brand-blue font-bold capitalize">{slug}</span>
        </div>

        {/* Hero split section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          <div className="lg:col-span-7">
            <span className="text-brand-teal text-xs font-extrabold uppercase tracking-widest bg-brand-teal/10 px-3 py-1 rounded-full">
              Insurance Solutions
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-slate-850 mt-4 leading-tight">
              {data.title}
            </h1>
            <p className="text-slate-500 text-sm sm:text-base mt-4 max-w-xl leading-relaxed">
              {data.desc}
            </p>
            <p className="text-brand-blue text-xs sm:text-sm mt-2 font-bold leading-relaxed">
              ★ {data.tagline}
            </p>

            {/* Feature cards list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              {data.features.map((feat, idx) => (
                <div key={idx} className="flex gap-2.5 items-start bg-slate-50 border border-slate-100 p-4 rounded-xl shadow-sm">
                  <span className="text-brand-teal font-bold">✓</span>
                  <span className="text-xs font-semibold text-slate-600 leading-snug">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Side Info Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-sky-50 to-indigo-50/30 border border-sky-100/70 p-6 sm:p-8 rounded-3xl shadow-sm">
            <h3 className="font-extrabold text-slate-850 text-lg mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-sky-600 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Finsocap Insurance Advantage
            </h3>
            
            <p className="text-slate-650 text-xs sm:text-sm leading-relaxed mb-4">
              Our team of experienced insurance professionals helps individuals and businesses choose the most suitable insurance plans based on their needs and financial goals.
            </p>
            
            <div className="border-t border-sky-100/50 my-4" />
            
            <p className="text-slate-600 text-xs leading-relaxed mb-4">
              Whether it is <strong>Health Insurance</strong>, <strong>Term Life Insurance</strong>, <strong>Motor (Car/Bike) Insurance</strong>, <strong>Travel Insurance</strong>, or <strong>Business Insurance</strong>, we provide expert guidance to help you select the right coverage at competitive prices.
            </p>
            
            <p className="text-slate-600 text-xs leading-relaxed mb-4">
              We also assist customers with policy servicing, renewals, and claim-related support to ensure a smooth and hassle-free experience.
            </p>
            
            <div className="bg-white/80 border border-sky-100 p-4 rounded-2xl mt-6 shadow-sm">
              <p className="text-slate-700 text-xs font-bold leading-relaxed text-center italic">
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

        {/* Callback request block */}
        <div className="bg-slate-50 border border-slate-100 p-8 sm:p-10 rounded-[32px] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div>
            <h3 className="font-extrabold text-slate-800 text-lg">Need help choosing a policy?</h3>
            <p className="text-slate-500 text-xs sm:text-sm mt-1 max-w-md">Our CAs and insurance consultants can guide you through claim parameters and tax savings u/s 80D.</p>
          </div>
          <div className="w-full sm:w-auto flex-shrink-0">
            {successCallback ? (
              <span className="text-brand-teal text-xs font-bold bg-brand-teal/10 px-4 py-2.5 rounded-full border border-brand-teal/20 animate-pulse inline-block">
                ✓ Callback request booked! We will call you back in 15 mins.
              </span>
            ) : (
              <form onSubmit={handleCallbackRequest} className="flex gap-2 w-full max-w-sm">
                <input
                  type="tel"
                  required
                  pattern="[0-9]{10}"
                  placeholder="Enter 10 digit mobile"
                  value={userPhone}
                  onChange={(e) => {
                    setUserName("Visitor");
                    setUserPhone(e.target.value);
                  }}
                  className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs outline-none focus:border-brand-blue text-slate-800 w-full"
                />
                <button
                  type="submit"
                  className="bg-brand-blue hover:bg-brand-blue-hover text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-colors cursor-pointer flex-shrink-0"
                >
                  Request Advisor Callback
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
