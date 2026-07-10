"use client";

import Hero from "../components/Home/Hero";
import CategoryGrid from "../components/Home/CategoryGrid";
import OurPartners from "../components/Home/OurPartners";
import Calculators from "../components/Home/Calculators";
import WhyChooseUs from "../components/Home/WhyChooseUs";
import Testemonials from "../components/Home/Testemonials";
import AdvisorCallback from "../components/Home/AdvisorCallback";

export default function Home() {
  const handleCallbackRegistration = (name: string, phone: string) => {
    console.log(`Finsocap: Callback registered for ${name} at ${phone}`);
  };

  return (
    <div className="flex-1 bg-white font-sans text-slate-800 flex flex-col w-full">
      <Hero onRequestCallback={handleCallbackRegistration} />
      <CategoryGrid onRequestCallback={handleCallbackRegistration} />
      <OurPartners />
      <Calculators />
      <WhyChooseUs />
      <Testemonials />
      <AdvisorCallback />
    </div>
  );
}
