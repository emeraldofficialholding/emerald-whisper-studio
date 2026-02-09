import { useState } from "react";
import { Link } from "react-router-dom"; // Import per la navigazione
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { supabase } from "@/supabaseCustom";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Upload, Leaf, ArrowRight, Shirt } from "lucide-react"; // Aggiunta icona Shirt
import ScanningRadar from "@/components/ScanningRadar";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

const EmeraldScanner = () => {
  const [brand, setBrand] = useState("");
  const [material, setMaterial] = useState("");
  const [garmentType, setGarmentType] = useState("");
  const [qualitySlider, setQualitySlider] = useState([50]);
  const [uploading, setUploading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [score, setScore] = useState<number | null>(null);

  const handleManualSubmit = async () => {
    setAnalyzing(true);
    setScore(null);
    await new Promise((r) => setTimeout(r, 2500));
    const mockScore = Math.min(100, Math.floor(qualitySlider[0] * 0.6 + Math.random() * 40));
    const { error } = await supabase.from("scanner_requests").insert({
      brand,
      material,
      garment_type: garmentType,
      input_type: "manual",
      sustainability_score: mockScore,
    });
    setAnalyzing(false);
    if (error) {
      toast.error("Errore durante l'analisi.");
      return;
    }
    setScore(mockScore);
    toast.success(`Punteggio sostenibilità: ${mockScore}/100`);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setAnalyzing(true);
    setScore(null);

    const filePath = `${Date.now()}-${file.name}`;
    const { error: uploadError } = await supabase.storage.from("scanner_uploads").upload(filePath, file);

    if (uploadError) {
      toast.error("Errore durante il caricamento.");
      setUploading(false);
      setAnalyzing(false);
      return;
    }

    const { data: urlData } = supabase.storage.from("scanner_uploads").getPublicUrl(filePath);
    await new Promise((r) => setTimeout(r, 2500));
    const mockScore = Math.floor(Math.random() * 40) + 60;

    await supabase.from("scanner_requests").insert({
      image_url: urlData.publicUrl,
      input_type: "photo",
      sustainability_score: mockScore,
    });

    setUploading(false);
    setAnalyzing(false);
    setScore(mockScore);
    toast.success(`Punteggio sostenibilità: ${mockScore}/100`);
  };

  return (
    <main className="bg-white min-h-screen">
      {/* SEZIONE 1: LO SCANNER (Container Scroll) */}
      <div className="pt-10">
        <ContainerScroll
          titleComponent={
            <div className="flex flex-col items-center gap-6 mb-12">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center"
              >
                <Leaf className="w-8 h-8 text-emerald-600" />
              </motion.div>

              <div className="space-y-2">
                <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-neutral-900">
                  Emerald <span className="text-emerald-600 italic">Scanner</span>
                </h1>
                <p className="text-neutral-500 font-sans text-sm md:text-lg max-w-xl mx-auto leading-relaxed">
                  L'Intelligenza Artificiale al servizio della moda etica. Carica una foto per scoprire il vero impatto
                  di ciò che indossi.
                </p>
              </div>
            </div>
          }
        >
          {/* SCANNER INTERFACE INSIDE THE IPAD SCREEN */}
          <div className="h-full w-full overflow-y-auto p-4 md:p-8 bg-white">
            <div className="max-w-xl mx-auto pt-4">
              <Tabs defaultValue="manual" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-8 bg-neutral-100 p-1 rounded-full">
                  <TabsTrigger
                    value="photo"
                    className="rounded-full data-[state=active]:bg-white data-[state=active]:shadow-sm"
                  >
                    Carica Foto
                  </TabsTrigger>
                  <TabsTrigger
                    value="manual"
                    className="rounded-full data-[state=active]:bg-white data-[state=active]:shadow-sm"
                  >
                    Manuale
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="photo" className="space-y-6">
                  <div className="border-2 border-dashed border-emerald-100 rounded-2xl p-10 text-center bg-emerald-50/30 hover:bg-emerald-50/50 transition-colors">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                      <Upload className="w-6 h-6 text-emerald-600" />
                    </div>
                    <p className="text-sm text-neutral-600 font-sans mb-6 font-medium">
                      Trascina un'immagine o scatta una foto
                    </p>
                    <label className="cursor-pointer">
                      <span className="inline-block bg-neutral-900 text-white px-6 py-3 rounded-full text-xs tracking-[0.15em] uppercase font-bold hover:bg-emerald-800 transition-all shadow-lg hover:shadow-xl">
                        Seleziona File
                      </span>
                      <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
                    </label>
                  </div>
                  {uploading && (
                    <p className="text-sm text-emerald-600 font-medium text-center animate-pulse">
                      Analisi in corso...
                    </p>
                  )}
                </TabsContent>

                <TabsContent value="manual" className="space-y-6">
                  <div className="space-y-5 p-1">
                    <div>
                      <Label htmlFor="brand" className="text-xs tracking-widest uppercase font-sans text-neutral-500">
                        Brand
                      </Label>
                      <Input
                        id="brand"
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                        placeholder="Es. Gucci, Zara, Vintage..."
                        className="mt-1.5 h-12 rounded-lg border-neutral-200 focus:border-emerald-500 focus:ring-emerald-500"
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="material"
                        className="text-xs tracking-widest uppercase font-sans text-neutral-500"
                      >
                        Materiale
                      </Label>
                      <Input
                        id="material"
                        value={material}
                        onChange={(e) => setMaterial(e.target.value)}
                        placeholder="Es. 100% Cotone, Poliestere..."
                        className="mt-1.5 h-12 rounded-lg border-neutral-200 focus:border-emerald-500 focus:ring-emerald-500"
                      />
                    </div>
                    <div>
                      <Label htmlFor="garment" className="text-xs tracking-widest uppercase font-sans text-neutral-500">
                        Tipo di capo
                      </Label>
                      <Input
                        id="garment"
                        value={garmentType}
                        onChange={(e) => setGarmentType(e.target.value)}
                        placeholder="Es. Camicia, Jeans..."
                        className="mt-1.5 h-12 rounded-lg border-neutral-200 focus:border-emerald-500 focus:ring-emerald-500"
                      />
                    </div>
                    <div className="pt-2">
                      <div className="flex justify-between mb-3">
                        <Label className="text-xs tracking-widest uppercase font-sans text-neutral-500">
                          Qualità percepita
                        </Label>
                        <span className="text-xs font-bold text-emerald-600">{qualitySlider[0]}%</span>
                      </div>
                      <Slider
                        value={qualitySlider}
                        onValueChange={setQualitySlider}
                        max={100}
                        step={1}
                        className="py-2"
                      />
                    </div>
                  </div>

                  <div className="pt-2" onClick={handleManualSubmit}>
                    <HoverBorderGradient
                      containerClassName={cn(
                        "rounded-full w-full",
                        (analyzing || !brand) && "opacity-50 pointer-events-none",
                      )}
                      className="bg-[#e4ffec] text-emerald-950 w-full flex justify-center py-3 font-bold tracking-widest uppercase text-sm"
                    >
                      {analyzing ? "Analisi in corso..." : "Calcola Impatto"}
                    </HoverBorderGradient>
                  </div>
                </TabsContent>
              </Tabs>

              {analyzing && (
                <div className="mt-8">
                  <ScanningRadar />
                  <p className="text-center text-xs text-neutral-400 mt-4 uppercase tracking-widest animate-pulse">
                    Consultazione Database...
                  </p>
                </div>
              )}

              {score !== null && !analyzing && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-8 p-8 bg-emerald-50 border border-emerald-100 rounded-2xl text-center shadow-inner"
                >
                  <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                      <Leaf className="w-6 h-6 text-emerald-600" />
                    </div>
                  </div>
                  <p className="text-xs tracking-widest uppercase font-sans text-emerald-600 mb-2 font-bold">
                    Punteggio Sostenibilità
                  </p>
                  <p className="font-serif text-6xl text-emerald-900 mb-2">
                    {score}
                    <span className="text-2xl text-emerald-600/60">/100</span>
                  </p>
                  <p className="text-xs text-neutral-500 max-w-xs mx-auto">
                    Questo punteggio è una stima basata sui dati forniti. Per una certificazione completa, visita i
                    nostri laboratori.
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </ContainerScroll>
      </div>

      {/* SEZIONE 2: LINK A SOSTENIBILITÀ */}
      <section className="py-24 bg-neutral-50 border-t border-neutral-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12 max-w-6xl mx-auto">
            <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">
              <h2 className="font-serif text-4xl md:text-5xl text-neutral-900">Come funziona il punteggio?</h2>
              <p className="text-lg text-neutral-600 font-sans leading-relaxed">
                Il nostro algoritmo si basa sui 4 pilastri della sostenibilità: Recupero, Rigenerazione, Creazione e
                Circolarità. Scopri come trasformiamo le reti da pesca in alta moda.
              </p>
              <div className="flex justify-center md:justify-start">
                <Link to="/sostenibilita">
                  <HoverBorderGradient
                    containerClassName="rounded-full"
                    className="bg-white text-emerald-950 flex items-center gap-2 font-medium"
                  >
                    <Leaf className="w-4 h-4" />
                    IL NOSTRO METODO
                  </HoverBorderGradient>
                </Link>
              </div>
            </div>

            {/* Visual Graphic */}
            <div className="w-full md:w-1/2 flex justify-center">
              <div className="relative w-full max-w-md aspect-square bg-white rounded-full p-8 shadow-xl border border-emerald-50 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border border-dashed border-emerald-200 animate-[spin_10s_linear_infinite]" />
                <div className="text-center space-y-2">
                  <div className="text-5xl font-serif text-emerald-900">100%</div>
                  <div className="text-xs tracking-widest uppercase text-emerald-600">Trasparenza</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEZIONE 3: LINK A COLLEZIONI (Visual Banner) */}
      <section className="relative h-[60vh] w-full overflow-hidden flex items-center justify-center">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop"
            alt="Fashion Collection"
            className="w-full h-full object-cover brightness-[0.6]"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center text-white px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="text-emerald-300 tracking-[0.3em] uppercase text-sm font-bold mb-4 block">
              Shop The Look
            </span>
            <h2 className="font-serif text-5xl md:text-7xl mb-8">Indossa la Trasparenza</h2>
            <div className="flex justify-center">
              <Link to="/collezioni">
                <HoverBorderGradient
                  containerClassName="rounded-full"
                  className="bg-[#e4ffec] text-emerald-950 flex items-center gap-3 px-8 py-4 font-bold tracking-widest uppercase text-sm"
                >
                  Scopri la Collezione
                  <Shirt className="w-4 h-4" />
                </HoverBorderGradient>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default EmeraldScanner;
