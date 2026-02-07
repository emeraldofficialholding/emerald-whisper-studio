import HeroSection from "@/components/HeroSection";
import EmeraldTouchSection from "@/components/EmeraldTouchSection";
import ClassicsSection from "@/components/ClassicsSection";
import ManifestoSection from "@/components/ManifestoSection";
// CORREZIONE: Importiamo il componente "default" (senza le parentesi graffe {})
import TrustMarquee from "@/components/TrustMarquee";

const Index = () => {
  return (
    <main>
      <HeroSection />
      <EmeraldTouchSection />
      <ClassicsSection />
      <ManifestoSection />

      {/* Ora usiamo il componente "TrustMarquee" che abbiamo appena costruito.
         Contiene già al suo interno la logica dello stop al mouse, 
         la velocità lenta (0.5) e l'effetto zoom.
         Non serve passare parametri qui.
      */}
      <TrustMarquee />
    </main>
  );
};

export default Index;
