import { useParams } from "react-router-dom";
import { useState } from "react";
import { useProduct } from "@/hooks/useProducts";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import ButterflyLoader from "@/components/ButterflyLoader";
import ImageFallback from "@/components/ImageFallback";
import { toast } from "sonner";
import { motion } from "framer-motion";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading } = useProduct(id || "");
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState(0);

  if (isLoading) return <div className="pt-24"><ButterflyLoader /></div>;
  if (!product) return <div className="pt-24 text-center py-20"><p className="text-muted-foreground">Prodotto non trovato.</p></div>;

  const sizes = product.sizes || ["S", "M", "L"];

  const handleAddToCart = () => {
    if (!selectedSize) return;
    addItem({
      id: product.id,
      name: product.name,
      price: Number(product.price),
      size: selectedSize,
      image: product.images[0],
    });
    toast.success("Aggiunto al carrello");
  };

  return (
    <main className="pt-24 pb-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="aspect-[3/4] bg-muted overflow-hidden mb-4">
              <ImageFallback
                src={product.images[activeImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`w-16 h-20 overflow-hidden border-2 transition-colors ${
                      activeImage === i ? "border-foreground" : "border-transparent"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col"
          >
            <h1 className="font-serif text-2xl md:text-3xl mb-2">{product.name}</h1>
            <p className="text-xl font-sans mb-6">€{Number(product.price).toFixed(2)}</p>
            <p className="text-muted-foreground text-sm leading-relaxed font-sans mb-8">
              {product.description}
            </p>

            <div className="mb-8">
              <p className="text-xs tracking-[0.15em] uppercase font-sans mb-3">Taglia</p>
              <div className="flex gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 border text-sm font-sans transition-all ${
                      selectedSize === size
                        ? "border-foreground bg-foreground text-background"
                        : "border-border hover:border-foreground"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <Button
              size="lg"
              disabled={!selectedSize}
              onClick={handleAddToCart}
              className="w-full mb-8"
            >
              {selectedSize ? "Aggiungi al carrello" : "Seleziona una taglia"}
            </Button>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="fabric">
                <AccordionTrigger className="text-sm font-sans tracking-wide">Dettagli Tessuto</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground font-sans">
                  {product.fabric_details || "Informazioni non disponibili."}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="shipping">
                <AccordionTrigger className="text-sm font-sans tracking-wide">Spedizione</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground font-sans">
                  {product.shipping_info || "Spedizione standard in 3-5 giorni lavorativi."}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetail;
