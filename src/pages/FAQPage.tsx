import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FAQ from "@/components/FAQ";
import { useTheme } from "@/hooks/useTheme";

const FAQPage = () => {
  const { theme } = useTheme();
  
  return (
    <div 
      className="min-vh-100" 
      style={{ backgroundColor: theme === 'dark' ? '#000000' : 'var(--bs-body-bg)' }}
    >
      <Header />
      <FAQ />
      <Footer />
    </div>
  );
};

export default FAQPage;