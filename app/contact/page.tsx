import ContactForm from "@/components/Global/ContactForm";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Finsocap Financial Services",
  description: "Get in touch with Finsocap for personalized advice on loans, insurance policies, mutual fund investments, and tax filing.",
};

export default function ContactPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-12 md:py-16 font-sans">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Breadcrumb */}
        <div className="text-xs text-slate-400 mb-8 flex gap-2 font-semibold">
          <Link href="/" className="hover:text-brand-blue">Home</Link>
          <span>/</span>
          <span className="text-brand-blue font-bold">Contact Us</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Info Column */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div>
              <span className="text-brand-blue text-xs font-extrabold uppercase tracking-widest bg-brand-blue/10 px-3.5 py-1 rounded-full">
                Get In Touch
              </span>
              <h1 className="text-3xl sm:text-5xl font-black text-slate-850 mt-4 tracking-tight leading-tight">
                Let's Talk About Your Financial Goals
              </h1>
              <p className="text-slate-500 text-sm sm:text-base mt-4 leading-relaxed">
                Whether you need low-interest loans, high-growth mutual fund portfolios, tailored insurance policies, or CA-certified tax filings, our advisors are here to assist you.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              <div className="bg-white border border-slate-200/80 p-5 rounded-2xl shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-brand-blue/10 text-brand-blue flex items-center justify-center font-bold text-lg mb-3">
                  📞
                </div>
                <h4 className="font-bold text-slate-850 text-sm">Call Us</h4>
                <p className="text-xs text-slate-500 mt-1">Direct support hotline</p>
                <a href="tel:+918095132132" className="text-brand-blue hover:text-brand-blue-hover font-bold text-xs mt-2 block">
                  +91 80951 32132
                </a>
              </div>

              <div className="bg-white border border-slate-200/80 p-5 rounded-2xl shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-brand-teal/10 text-brand-teal flex items-center justify-center font-bold text-lg mb-3">
                  ✉️
                </div>
                <h4 className="font-bold text-slate-850 text-sm">Email Support</h4>
                <p className="text-xs text-slate-500 mt-1">Queries & documents</p>
                <a href="mailto:info@finsocap.com" className="text-brand-teal hover:text-brand-teal-hover font-bold text-xs mt-2 block">
                  info@finsocap.com
                </a>
              </div>
            </div>

            <div className="bg-white border border-slate-200/80 p-5 rounded-2xl shadow-sm flex gap-4 items-start">
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-lg flex-shrink-0">
                📍
              </div>
              <div>
                <h4 className="font-bold text-slate-850 text-sm">Corporate Office</h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  717/F-2, Anmol Apartments, Ghaziabad, Radha Krishna Marg, Ghaziabad, Uttar Pradesh, 201005
                </p>
                <p className="text-[11px] text-slate-400 mt-2 font-medium">
                  Hours: Mon - Sat, 9:30 AM - 6:30 PM IST
                </p>
              </div>
            </div>
          </div>

          {/* Right Form Column */}
          <div className="lg:col-span-6 flex justify-center">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
