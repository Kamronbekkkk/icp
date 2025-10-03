// app/page.tsx
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ServicesSection from '@/components/Sections/Services';
import Comments from '@/components/Comments';
import AboutSection from '@/components/Sections/About';
import PortfolioSection from '@/components/Sections/Portfolio';
import TeamSection from '@/components/Sections/Team';

export default function Home() {
  // Bosh sahifa (One-Page) faqat turli bo'limlarni render qiladi.
  return (
    // Body klassi app/layout.tsx da boshqariladi
    <main>

      <Header />
      
      {/* Asosiy kontent bo'limlari */}
      <AboutSection />
      
      <ServicesSection />

      <TeamSection />
      
      <PortfolioSection />
      
      <Comments />

      <Footer />
    </main>
  );
}
