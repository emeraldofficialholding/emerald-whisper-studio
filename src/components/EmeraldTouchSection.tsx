import { useProducts } from "@/hooks/useProducts";
import ProductCard from "./ProductCard";
import ButterflyLoader from "./ButterflyLoader";
import { motion } from "framer-motion";

const EmeraldTouchSection = () => {
  const { data: products, isLoading } = useProducts("emerald-touch");

  return (
    <section className="py-20 px-4 lg:px-8">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground font-sans mb-2">Collezione</p>
          <h2 className="font-serif text-3xl md:text-4xl">Emerald Touch</h2>
        </motion.div>

        {isLoading ? (
          <ButterflyLoader />
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {products?.slice(0, 4).map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default EmeraldTouchSection;
