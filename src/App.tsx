import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Marquee } from "./components/Marquee";
import { Portfolio } from "./components/Portfolio";
import { Workflow } from "./components/Workflow";
import { Tools } from "./components/Tools";
import { About } from "./components/About";
import { Faq } from "./components/Faq";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { Background, ScrollProgress } from "./components/Background";

export default function App() {
  return (
    <div className="relative min-h-screen bg-ink text-white antialiased">
      <Background />
      <div className="noise" aria-hidden />
      <ScrollProgress />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <Marquee />
        <Portfolio />
        <Workflow />
        <Tools />
        <About />
        <Faq />
        <Contact />
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
