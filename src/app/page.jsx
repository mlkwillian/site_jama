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
import Equipment from "@/components/Machines"

export default function Home() {
  return (
    <>
      <Header scrolled />
      <main>
        <Hero />
        <Metrics />
        <Differentials />
        <Services />
        <Portal />
        <Cases />
        <Equipment/>
        <Clients />
        <Mission />
        <Contact />
      </main>
      <Footer />
    </>
  );
}