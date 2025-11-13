import Analytics from "@/components/pages/home/Analytics";
import FAQSection from "@/components/pages/home/FAQSection";
import Featured from "@/components/pages/home/Featured";
import Guide from "@/components/pages/home/Guide";
import Hero from "@/components/pages/home/Hero";
import Testimonials from "@/components/pages/home/Testimonials";
function Home() {
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