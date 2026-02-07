import { motion } from "framer-motion";
import { Timeline } from "@/components/ui/timeline";
import ScrollExpandMedia from "@/components/ui/scroll-expansion-hero";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { Instagram } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.8 },
  viewport: { once: true },
};

const timelineData = [
  {
    title: "Le Origini",
    content: (
      <div>
        <p className="text-muted-foreground text-sm md:text-base font-normal mb-8">
          Tutto inizia nelle acque cristalline della Costa Smeralda. Ispirati dalla bellezza incontaminata della
          Sardegna, abbiamo deciso di creare un brand che unisse l'estetica del "Lusso Lento" con una missione urgente:
          proteggere il nostro mare.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <img
            src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2070&auto=format&fit=crop"
            alt="Costa Smeralda"
            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-md"
          />
          <img
            src="https://images.unsplash.com/photo-1516834474-48c0abc2a902?q=80&w=2073&auto=format&fit=crop"
            alt="Sketching"
            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-md"
          />
        </div>
      </div>
    ),
  },
  {
    title: "La Svolta",
    content: (
      <div>
        <p className="text-muted-foreground text-sm md:text-base font-normal mb-8">
          Non bastava essere belli. Dovevamo essere puliti. Abbiamo introdotto l'uso esclusivo di fibre rigenerate da
          reti da pesca recuperate, trasformando un rifiuto in seta tecnologica.
        </p>
        <img
          src="https://images.unsplash.com/photo-1532667449560-72a95c8d381b?q=80&w=2070&auto=format&fit=crop"
          alt="Textile Process"
          className="rounded-lg object-cover h-40 md:h-64 w-full shadow-md"
        />
      </div>
    ),
  },
  {
    title: "Oggi",
    content: (
      <div>
        <p className="text-muted-foreground text-sm md:text-base font-normal mb-4">
          Con il lancio dell'Emerald Scanner, portiamo la trasparenza totale nelle mani del cliente. Ogni capo ha una
          storia digitale, ogni acquisto è un atto di consapevolezza.
        </p>
      </div>
    ),
  },
];

const ChiSiamo = () => {
  return (
    <main className="pt-0 bg-white">
      <ScrollExpandMedia
        mediaType="video"
        mediaSrc="https://jtmbnmpggzbucmgglisw.supabase.co/storage/v1/object/public/emerald-asset/HERO.mp4"
        bgImageSrc="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop"
        title="Emerald Dress"
        scrollToExpand="Scorri per esplorare"
        textBlend
      >
        <div className="pt-16">
          {/* Header Description */}
          <motion.div {...fadeUp} className="container mx-auto px-4 lg:px-8 max-w-2xl mb-20">
            <p className="text-xs tracking-[0.2em] uppercase text-emerald-600 font-sans mb-2 text-center">
              La nostra storia
            </p>
            <h1 className="font-serif text-5xl mb-6 text-center md:text-7xl text-neutral-900">Chi Siamo</h1>
            <p className="text-neutral-600 font-sans leading-relaxed text-center text-lg">
              Dalla Costa Smeralda al mondo. EMERALDRESS nasce dalla visione di unire l'artigianato sardo con
              l'innovazione tessile sostenibile, creando capi che rispettano la Terra senza compromessi sull'eleganza.
            </p>
          </motion.div>

          {/* Animated Timeline */}
          <Timeline data={timelineData} />

          {/* SOCIAL DRESS SECTION (New Replacement for Founders) */}
          <section className="py-24 bg-[#F9FAF9] overflow-hidden relative">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-20">
                {/* Text Content (Left Side) */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="w-full md:w-1/2 relative z-10 text-center md:text-left"
                >
                  <div className="inline-block relative">
                    <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-tight text-neutral-900 mb-6">
                      Social <br />
                      <span className="text-emerald-600 italic">DRESS</span>
                    </h2>
                    {/* Decorative Scribble Arrow */}
                    <svg
                      className="absolute -right-12 -top-8 w-24 h-24 text-pink-500 hidden md:block transform rotate-12"
                      viewBox="0 0 100 100"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M10,50 Q50,10 90,50" strokeDasharray="5,5" />
                      <path d="M80,40 L90,50 L80,60" />
                    </svg>
                  </div>

                  <p className="text-lg text-neutral-600 font-sans mb-10 max-w-md mx-auto md:mx-0">
                    Il lusso non è solo un abito, è una community. Segui il nostro viaggio quotidiano, scopri i
                    backstage e lasciati ispirare dallo stile di vita Emeraldress.
                  </p>

                  <div className="flex justify-center md:justify-start items-center gap-4">
                    {/* SVG Arrow pointing to button */}
                    <span className="font-handwriting text-pink-500 transform -rotate-12 text-sm hidden lg:block">
                      Join the club!
                    </span>
                    <a href="https://instagram.com/emeraldress_" target="_blank" rel="noopener noreferrer">
                      <HoverBorderGradient
                        containerClassName="rounded-full"
                        as="button"
                        className="bg-[#e4ffec] text-emerald-950 flex items-center gap-2 px-8 py-4 font-bold tracking-widest"
                      >
                        <Instagram className="w-5 h-5" />
                        @emeraldress_
                      </HoverBorderGradient>
                    </a>
                  </div>
                </motion.div>

                {/* Phone Mockup (Right Side) */}
                <motion.div
                  initial={{ opacity: 0, x: 50, rotate: 5 }}
                  whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="w-full md:w-1/2 flex justify-center md:justify-end relative"
                >
                  {/* Phone Frame */}
                  <div className="relative w-[300px] h-[600px] bg-neutral-900 rounded-[3rem] border-[8px] border-neutral-800 shadow-2xl overflow-hidden">
                    {/* Dynamic Notch */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-20"></div>

                    {/* Screen Content (Instagram Mockup) */}
                    <div className="w-full h-full bg-white relative">
                      {/* Insta Header */}
                      <div className="h-20 bg-white border-b border-neutral-100 flex items-end pb-2 px-4 justify-between z-10 relative">
                        <span className="font-bold text-sm">emeraldress_</span>
                        <Instagram className="w-5 h-5 text-neutral-800" />
                      </div>

                      {/* Insta Story/Feed Image */}
                      <div className="w-full h-[calc(100%-80px)] relative">
                        <img
                          src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop"
                          alt="Instagram Feed"
                          className="w-full h-full object-cover"
                        />

                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6 text-white">
                          <div className="flex gap-2 items-center mb-2">
                            <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md border border-white"></div>
                            <span className="text-xs font-bold">emeraldress_</span>
                          </div>
                          <p className="text-sm font-light">
                            Lusso, rinato. La nuova collezione è ora disponibile online. #Emeraldress #SustainableLuxury
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Floating Elements/Stickers */}
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                    className="absolute -right-4 top-20 bg-white p-3 shadow-lg rounded-lg rotate-12 hidden lg:block"
                  >
                    <span className="text-2xl">✨</span>
                  </motion.div>

                  <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                    className="absolute -left-8 bottom-40 bg-[#e4ffec] text-emerald-900 px-4 py-2 shadow-lg rounded-full -rotate-6 hidden lg:block font-serif italic"
                  >
                    New Collection
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </section>
        </div>
      </ScrollExpandMedia>
    </main>
  );
};

export default ChiSiamo;
