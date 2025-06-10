import Faqs from "@/components/landing/faqs";
import Footer from "@/components/landing/footer";
import Guarantees from "@/components/landing/guarantees";
import Included from "@/components/landing/included";
import Services from "@/components/landing/services";
import TestEmail from "@/components/landing/test-email";
import Testimonials from "@/components/landing/testimonials";

import Billing from "../components/landing/billing";
import Hero from "../components/landing/hero";
import Navbar from "../components/landing/landing-navbar";
import Solutions from "../components/landing/solutions";

const landing = () => {
  return (
    <div className="bg-gray-100">
      <Navbar />
      <Hero />
      <Solutions />
      <Billing />
      <Included />
      <TestEmail />
      <Guarantees />
      <Services />
      <Faqs />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default landing;
