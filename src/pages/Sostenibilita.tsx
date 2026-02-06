import { motion } from "framer-motion";

const Sostenibilita = () => (
  <main className="pt-24 pb-16">
    <div className="container mx-auto px-4 lg:px-8 min-h-[60vh] flex items-center justify-center">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
        <h1 className="font-serif text-4xl mb-4">Sostenibilità</h1>
        <p className="text-muted-foreground font-sans tracking-widest text-sm uppercase">Coming Soon</p>
      </motion.div>
    </div>
  </main>
);

export default Sostenibilita;
