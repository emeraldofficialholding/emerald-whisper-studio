import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { ArrowRight, Leaf, Sparkles, CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/supabaseCustom"; // Adjust path if using @/integrations/supabase/client

const ManifestoSection = () => {
  // Form State
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefono: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Validation
    if (!formData.nome || !formData.email || !formData.telefono) {
      toast.error("Per favore, compila tutti i campi obbligatori.");
      return;
    }

    setIsSubmitting(true);

    try {
      // 2. Send to Supabase
      const { error } = await supabase.from("newsletter_leads").insert([
        {
          full_name: formData.nome,
          email: formData.email,
          phone: formData.telefono,
          source: "manifesto_home",
        },
      ]);

      if (error) throw error;

      // 3. Success Feedback
      toast.success("Benvenuto nell'Inner Circle di Emeraldress.");
      setFormData({ nome: "", email: "", telefono: "" });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Si è verificato un errore. Riprova più tardi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* --- SEZIONE 1: IL MANIFESTO (Visual Hero) --- */}
      <section className="relative py-40 overflow-hidden flex items-center justify-center min-h-[85vh]">
        {/* Background Parallax Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?q=80&w=2000&auto=format&fit=crop"
            alt="Emeraldress Manifesto"
            className="w-full h-full object-cover brightness-[0.4] scale-105"
          />
          <div className="absolute inset-0 bg-emerald-950/40 mix-blend-multiply" />
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <span className="text-emerald-300 tracking-[0.3em] uppercase text-xs font-bold mb-6 block">
              La nostra Filosofia
            </span>

            <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl leading-tight tracking-tight mb-10 drop-shadow-lg">
              "La moda non deve <br /> costare la Terra."
            </h2>

            <div className="flex justify-center">
              <Link to="/chisiamo">
                <HoverBorderGradient
                  containerClassName="rounded-full"
                  className="bg-white/10 backdrop-blur-md text-white border-white/20 flex items-center gap-3 px-10 py-4 font-bold tracking-widest uppercase text-sm hover:bg-white hover:text-emerald-950 transition-all duration-500"
                >
                  Scopri la nostra storia
                  <ArrowRight className="w-4 h-4" />
                </HoverBorderGradient>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- SEZIONE 2: VISION & DETTAGLI (White/Clean) --- */}
      <section className="py-28 bg-white relative">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Immagine descrittiva */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/5] overflow-hidden rounded-sm shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1612462766564-9ca9505877f2?q=80&w=1200&auto=format&fit=crop"
                  alt="Texture Seta"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-[1.5s]"
                />
              </div>
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -right-6 bg-[#e4ffec] p-8 shadow-xl border border-emerald-100 max-w-[240px] hidden md:block">
                <p className="font-serif text-emerald-900 text-xl leading-tight italic">
                  "Ogni filo racconta una storia di rinascita."
                </p>
              </div>
            </motion.div>

            {/* Contenuto Testuale */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-emerald-500" />
                  <span className="text-sm font-bold tracking-[0.2em] text-neutral-400 uppercase">Oltre il design</span>
                </div>
                <h3 className="font-serif text-4xl md:text-6xl text-neutral-900 leading-tight mb-6">
                  Lusso Rigenerato, <br /> Anima Italiana.
                </h3>
              </div>

              <p className="text-neutral-600 text-lg font-sans leading-relaxed">
                Emeraldress non è solo un brand, è un movimento. Utilizziamo esclusivamente <strong>ECONYL®</strong>, un
                nylon rigenerato infinite volte da reti da pesca recuperate, lavorato dalle mani sapienti dei nostri
                sarti in Italia. Uniamo l'estetica della Riviera alla tecnologia del futuro.
              </p>

              <ul className="space-y-4 pt-4">
                {[
                  "100% Filiera Tracciabile con Blockchain",
                  "Packaging privo di plastica e riutilizzabile",
                  "Garanzia di riparazione a vita",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-neutral-800 font-medium group">
                    <span className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- SEZIONE 3: NEWSLETTER FORM (Dark Luxury) --- */}
      <section className="py-24 bg-[#051c14] relative overflow-hidden border-t border-emerald-900/30">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-900/20 rounded-full blur-[150px] pointer-events-none -translate-y-1/2 translate-x-1/3" />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <Leaf className="w-10 h-10 text-emerald-400 mx-auto mb-6" />
            <h3 className="font-serif text-4xl md:text-5xl text-white mb-6">Entra nell'Inner Circle</h3>
            <p className="text-emerald-100/60 font-sans text-lg max-w-xl mx-auto">
              Ricevi inviti esclusivi per le sfilate, accesso anticipato ai drop limitati e contenuti riservati sulla
              sostenibilità.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <form onSubmit={handleSubmit} className="flex flex-col gap-10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                {/* INPUT NOME */}
                <div className="group relative">
                  <input
                    type="text"
                    name="nome"
                    id="nome"
                    value={formData.nome}
                    onChange={handleInputChange}
                    className="block w-full bg-transparent border-b border-emerald-800/50 py-4 text-emerald-50 text-lg placeholder-transparent focus:border-emerald-400 focus:outline-none transition-colors peer"
                    placeholder="Nome Completo"
                    required
                  />
                  <label
                    htmlFor="nome"
                    className="absolute left-0 -top-3.5 text-emerald-400 text-xs transition-all peer-placeholder-shown:text-lg peer-placeholder-shown:text-emerald-700 peer-placeholder-shown:top-4 peer-focus:-top-3.5 peer-focus:text-emerald-400 peer-focus:text-xs uppercase tracking-widest"
                  >
                    Nome Completo
                  </label>
                </div>

                {/* INPUT EMAIL */}
                <div className="group relative">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="block w-full bg-transparent border-b border-emerald-800/50 py-4 text-emerald-50 text-lg placeholder-transparent focus:border-emerald-400 focus:outline-none transition-colors peer"
                    placeholder="Indirizzo Email"
                    required
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-0 -top-3.5 text-emerald-400 text-xs transition-all peer-placeholder-shown:text-lg peer-placeholder-shown:text-emerald-700 peer-placeholder-shown:top-4 peer-focus:-top-3.5 peer-focus:text-emerald-400 peer-focus:text-xs uppercase tracking-widest"
                  >
                    Indirizzo Email
                  </label>
                </div>

                {/* INPUT TELEFONO */}
                <div className="group relative">
                  <input
                    type="tel"
                    name="telefono"
                    id="telefono"
                    value={formData.telefono}
                    onChange={handleInputChange}
                    className="block w-full bg-transparent border-b border-emerald-800/50 py-4 text-emerald-50 text-lg placeholder-transparent focus:border-emerald-400 focus:outline-none transition-colors peer"
                    placeholder="Numero di Telefono"
                    required
                  />
                  <label
                    htmlFor="telefono"
                    className="absolute left-0 -top-3.5 text-emerald-400 text-xs transition-all peer-placeholder-shown:text-lg peer-placeholder-shown:text-emerald-700 peer-placeholder-shown:top-4 peer-focus:-top-3.5 peer-focus:text-emerald-400 peer-focus:text-xs uppercase tracking-widest"
                  >
                    Numero di Telefono
                  </label>
                </div>
              </div>

              <div className="flex justify-center pt-8">
                <HoverBorderGradient
                  as="button"
                  type="submit"
                  disabled={isSubmitting}
                  containerClassName="rounded-full"
                  className="bg-[#e4ffec] text-emerald-950 flex items-center gap-3 px-12 py-4 font-bold tracking-widest uppercase text-sm w-full md:w-auto justify-center min-w-[200px]"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Registrazione...
                    </>
                  ) : (
                    "Iscriviti Ora"
                  )}
                </HoverBorderGradient>
              </div>

              <p className="text-center text-xs text-emerald-800/60 mt-0">
                I tuoi dati sono al sicuro. Non inviamo spam, solo eccellenza.
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ManifestoSection;
