"use client";

export default function OurPartners() {
    const partners = [
        { name: "HDFC Bank", category: "Banking Partner" },
        { name: "Tata AIG", category: "Insurance Partner" },
        { name: "LIC India", category: "Life Insurance Partner" },
        { name: "SBI Mutual Fund", category: "Investment Partner" },
        { name: "ICICI Lombard", category: "Insurance Partner" },
        { name: "Nippon India", category: "Investment Partner" },
        { name: "Axis Bank", category: "Banking Partner" },
        { name: "Bajaj Allianz", category: "Insurance Partner" },
        { name: "HDFC Ergo", category: "General Insurance" },
        { name: "Kotak Mahindra", category: "Banking Partner" },
        { name: "DSP Mutual Fund", category: "Investment Partner" },
        { name: "Care Health", category: "Health Insurance" },
    ];

    return (
        <section className="py-16 bg-slate-50 border-y border-slate-100 overflow-hidden font-sans">
            <div className=" mx-auto px-4 ">
                <div className="text-center mb-10 max-w-2xl mx-auto">
                    <span className="text-brand-teal text-xs font-extrabold uppercase tracking-widest bg-brand-teal/10 px-3 py-1 rounded-full">
                        Finsocap Networks
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 mt-4 tracking-tight">
                        Our 50+ Trusted Financial Partners
                    </h2>
                    <p className="text-sm text-slate-500 mt-2">
                        We partner with India&apos;s leading banks, insurance providers, and asset management houses to bring you the best rates and policies.
                    </p>
                </div>

                {/* Dynamic sliding track */}
                <div className="relative w-full overflow-hidden select-none">
                    {/* We'll duplicate the list to make a seamless loop */}
                    <div className="flex gap-6 w-max animate-scroll-left hover:pause-scroll">
                        {/* Set 1 */}
                        {partners.map((partner, index) => (
                            <div
                                key={`p1-${index}`}
                                className="w-56 h-24 bg-white border border-slate-100 rounded-2xl flex flex-col items-center justify-center p-4 shadow-sm hover:shadow-md hover:border-brand-teal transition-all duration-300 group"
                            >
                                <span className="font-extrabold text-slate-800 text-lg group-hover:text-brand-blue transition-colors">
                                    {partner.name}
                                </span>
                                <span className="text-[10px] text-slate-400 mt-1 font-semibold uppercase tracking-wider">
                                    {partner.category}
                                </span>
                            </div>
                        ))}
                        {/* Set 2 */}
                        {partners.map((partner, index) => (
                            <div
                                key={`p2-${index}`}
                                className="w-56 h-24 bg-white border border-slate-100 rounded-2xl flex flex-col items-center justify-center p-4 shadow-sm hover:shadow-md hover:border-brand-teal transition-all duration-300 group"
                            >
                                <span className="font-extrabold text-slate-800 text-lg group-hover:text-brand-blue transition-colors">
                                    {partner.name}
                                </span>
                                <span className="text-[10px] text-slate-400 mt-1 font-semibold uppercase tracking-wider">
                                    {partner.category}
                                </span>
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
          animation: scroll-left 30s linear infinite;
        }
        .hover\:pause-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
        </section>
    );
}
