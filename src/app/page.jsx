import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Clients from "@/components/Clients";
import Differentials from "@/components/Differentials";
import Services from "@/components/Services";
import Metrics from "@/components/Metrics";
import Portal from "@/components/Portal";
import Cases from "@/components/Cases";
import Mission from "@/components/Mission";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Metrics />
        <Differentials />
        <Services />
        <Portal />
        <Cases />
        <Clients />
        <Mission />
        <Contact />
      </main>
      <Footer />
    </>
  );
}