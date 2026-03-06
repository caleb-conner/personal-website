import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Experience from '@/components/Experience';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Education from '@/components/Education';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="App">
      <Navigation />
      <Hero />
      <Experience />
      <Skills />
      <Projects />
      <Education />
      <Footer />
    </div>
  );
}
