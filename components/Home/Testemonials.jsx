"use client";

import { useState, useEffect } from "react";

// Custom inline SVG icons
const ArrowLeftIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const StarIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="#f59e0b" className="text-brand-accent">
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

export default function Testemonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleSlides, setVisibleSlides] = useState(3);

  const testimonials = [
    {
      id: 1,
      name: "Rajesh Sharma",
      role: "SME Business Owner",
      quote: "Finsocap made securing our business expansion loan completely hassle-free. Their advisors compared three lenders and got us a rate 1.5% lower than our bank. Truly trusted guidance!",
      rating: 5,
      init: "RS",
    },
    {
      id: 2,
      name: "Meera Deshmukh",
      role: "Freelance UI Designer",
      quote: "Filing tax returns as a freelancer was a nightmare until I found Finsocap. Their assisted ITR filing service was incredibly fast, professional, and saved me a lot in deductions.",
      rating: 5,
      init: "MD",
    },
    {
      id: 3,
      name: "Amit & Priya Verma",
      role: "IT Professionals",
      quote: "We were looking for direct mutual fund SIPs and tax-saving plans. The Finsocap platform and calculators made it clear how to plan our retirement goals. Highly recommended portal!",
      rating: 5,
      init: "AP",
    },
    {
      id: 4,
      name: "Dr. Sandeep Nair",
      role: "Senior Consultant, HealthCare",
      quote: "Comparing health insurance plans for my parents was simplified by Finsocap. The comparison wizard showed absolute policy wording clarity and helped us save ₹8,000 on the yearly premium.",
      rating: 5,
      init: "SN",
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleSlides(1);
      } else if (window.innerWidth < 1024) {
        setVisibleSlides(2);
      } else {
        setVisibleSlides(3);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalSlides = testimonials.length;
  const maxIndex = totalSlides - visibleSlides;

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <section className="bg-white text-slate-800 py-20 overflow-hidden font-sans border-t border-slate-100">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Heading row */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div>
            <span className="text-brand-teal text-xs font-extrabold uppercase tracking-widest bg-brand-teal/10 px-3 py-1 rounded-full">
              Success Stories
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-850 mt-4 tracking-tight">
              What Our Clients Say
            </h2>
            <p className="text-sm text-slate-500 mt-2 max-w-xl">
              Discover how Finsocap helps thousands of families and businesses secure loans, save taxes, and insure their futures.
            </p>
          </div>

          {/* Navigation Controls */}
          {maxIndex > 0 && (
            <div className="flex gap-3">
              <button
                onClick={prevSlide}
                disabled={currentIndex === 0}
                aria-label="Previous Testimonial"
                className={`w-12 h-11 rounded-xl border flex items-center justify-center transition-all ${
                  currentIndex === 0
                    ? "border-slate-100 text-slate-300 cursor-not-allowed"
                    : "border-slate-200 text-slate-700 hover:bg-slate-50 cursor-pointer"
                }`}
              >
                <ArrowLeftIcon />
              </button>
              <button
                onClick={nextSlide}
                disabled={currentIndex === maxIndex}
                aria-label="Next Testimonial"
                className={`w-12 h-11 rounded-xl border flex items-center justify-center transition-all ${
                  currentIndex === maxIndex
                    ? "border-slate-100 text-slate-300 cursor-not-allowed"
                    : "border-slate-200 text-slate-700 hover:bg-slate-50 cursor-pointer"
                }`}
              >
                <ArrowRightIcon />
              </button>
            </div>
          )}
        </div>

        {/* Carousel Viewport */}
        <div className="overflow-hidden w-full relative">
          <div
            className="flex transition-transform duration-500 ease-in-out -mx-3"
            style={{ transform: `translateX(-${Math.min(currentIndex, maxIndex) * (100 / visibleSlides)}%)` }}
          >
            {testimonials.map((item) => (
              <div
                key={item.id}
                className="w-full sm:w-1/2 lg:w-1/3 flex-shrink-0 px-3"
              >
                {/* Testimonial Card */}
                <div className="border border-slate-100 bg-slate-50 rounded-2xl p-6 md:p-8 flex flex-col justify-between h-full min-h-[320px] transition-all duration-300 hover:border-brand-teal/45 shadow-sm">
                  {/* Top Quote */}
                  <div className="flex-grow mb-6">
                    {/* Stars */}
                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: item.rating }).map((_, i) => (
                        <StarIcon key={i} />
                      ))}
                    </div>
                    <p className="text-slate-650 text-sm md:text-[15px] leading-relaxed italic">
                      &ldquo;{item.quote}&rdquo;
                    </p>
                  </div>

                  {/* Client Info */}
                  <div className="flex items-center gap-4 pt-4 border-t border-slate-200/60">
                    <div className="w-12 h-12 rounded-full bg-brand-blue flex items-center justify-center font-extrabold text-white text-sm shadow-md">
                      {item.init}
                    </div>
                    <div>
                      <h4 className="text-slate-800 text-base font-bold leading-tight">
                        {item.name}
                      </h4>
                      <p className="text-slate-400 text-xs mt-1">
                        {item.role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
