import Analytics from "@/components/pages/home/Analytics";
import FAQSection from "@/components/pages/home/FAQSection";
import Featured from "@/components/pages/home/Featured";
import Guide from "@/components/pages/home/Guide";
import Hero from "@/components/pages/home/Hero";
import Testimonials from "@/components/pages/home/Testimonials";
import { HomeSkeleton } from "@/components/pages/home/HomeSkeleton";
import { useState, useEffect } from "react";

let hasLoaded = false;

function Home() {
  const [isLoading, setIsLoading] = useState(!hasLoaded);

  useEffect(() => {
    if (!hasLoaded) {
      const timer = setTimeout(() => {
        setIsLoading(false);
        hasLoaded = true;
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  if (isLoading) {
    return <HomeSkeleton />;
  }

  return (
    <div>
      <Hero/>
      <Analytics/>
      <Featured />
      <Guide/>
      <Testimonials/>
      <FAQSection/>
    </div>
  );
}

export default Home;