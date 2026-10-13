import Header from './components/Header';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Works from './components/Works';
import Collections from './components/Collections';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-[#fafafa] text-black overflow-x-hidden">
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Works />
        <Collections />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
