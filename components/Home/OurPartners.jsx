"use client";

import Image from "next/image";

export default function OurPartners() {
  const partners = [
    { name: "HDFC Life", category: "Life Insurance Partner", src: "/home_slider/Partners-01.svg" },
    { name: "Tata AIG", category: "Insurance Partner", src: "/home_slider/Partners-02.svg" },
    { name: "LIC India", category: "Life Insurance Partner", src: "/home_slider/Partners-03.svg" },
    { name: "SBI Mutual Fund", category: "Investment Partner", src: "/home_slider/Partners-04.svg" },
    { name: "ICICI Lombard", category: "Insurance Partner", src: "/home_slider/Partners-05.svg" },
    { name: "Nippon India", category: "Investment Partner", src: "/home_slider/Partners-06.svg" },
    { name: "Axis Bank", category: "Banking Partner", src: "/home_slider/Partners-07.svg" },
    { name: "Bajaj Allianz", category: "Insurance Partner", src: "/home_slider/Partners-08.svg" },
    { name: "HDFC ERGO", category: "General Insurance", src: "/home_slider/Partners-09.svg" },
    { name: "Kotak Mahindra", category: "Banking Partner", src: "/home_slider/Partners-10.svg" },
    { name: "Care Health", category: "Health Insurance", src: "/home_slider/Partners-11.svg" },
  ];

  return (
    <section className="py-16 bg-slate-50/80 border-y border-slate-100 overflow-hidden font-sans">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <span className="text-[#0da687] text-xs font-black uppercase tracking-widest bg-[#0da687]/10 px-3.5 py-1.5 rounded-full">
            Finsocap Networks
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 mt-4 tracking-tight">
            Our 50+ Trusted Financial Partners
          </h2>
          <p className="text-sm sm:text-base text-slate-500 mt-2.5 font-normal">
            We partner with India&apos;s leading banks, insurance providers, and asset management houses to bring you the best rates and policies.
          </p>
        </div>

        {/* Dynamic sliding track */}
        <div className="relative w-full overflow-hidden select-none py-2">
          <div className="flex gap-6 sm:gap-8 w-max animate-scroll-left hover:pause-scroll items-center">
            {/* Set 1 */}
            {partners.map((partner, index) => (
              <div key={`p1-${index}`} className="flex flex-col items-center gap-2.5 group">
                {/* SVG Logo Container */}
                <div className="w-52 h-20 sm:w-60 sm:h-24 flex items-center justify-center p-0 drop-shadow-xs group-hover:scale-105 transition-transform duration-300">
                  <Image
                    src={partner.src}
                    alt={partner.name}
                    width={240}
                    height={96}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Rounded Category Pill Div under SVG */}
                <div className="bg-white border border-slate-200/80 px-4 py-1 rounded-full text-xs font-bold text-slate-700 shadow-xs flex items-center justify-center gap-1.5 group-hover:bg-[#0da687] group-hover:text-white group-hover:border-[#0da687] transition-all">
                  <span>{partner.category}</span>
                </div>
              </div>
            ))}

            {/* Set 2 (Seamless Infinite Loop) */}
            {partners.map((partner, index) => (
              <div key={`p2-${index}`} className="flex flex-col items-center gap-2.5 group">
                {/* SVG Logo Container */}
                <div className="w-52 h-20 sm:w-60 sm:h-24 flex items-center justify-center p-0 drop-shadow-xs group-hover:scale-105 transition-transform duration-300">
                  <Image
                    src={partner.src}
                    alt={partner.name}
                    width={240}
                    height={96}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Rounded Category Pill Div under SVG */}
                <div className="bg-white border border-slate-200/80 px-4 py-1 rounded-full text-xs font-bold text-slate-700 shadow-xs flex items-center justify-center gap-1.5 group-hover:bg-[#0da687] group-hover:text-white group-hover:border-[#0da687] transition-all">
                  <span>{partner.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll-left {
          animation: scroll-left 28s linear infinite;
        }
        .hover\:pause-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
