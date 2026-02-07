import { useState } from "react";
import { useProducts } from "@/hooks/useProducts";
import ButterflyLoader from "@/components/ButterflyLoader";
import { motion } from "framer-motion";
import { Filter, ChevronDown, Heart } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"; // Assicurati di avere il componente Sheet, altrimenti usa un div normale

// --- COMPONENTE CARD SPECIFICO (Stile Valentine) ---
const CollectionCard = ({ product, index }: { product: any; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group cursor-pointer flex flex-col gap-3"
    >
      {/* 1. Immagine (Aspect Ratio Alto 3:4 o più slanciato) */}
      <div className="relative w-full aspect-[3/4.2] overflow-hidden bg-neutral-100">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Hover: Seconda immagine (se esiste) */}
        {product.images[1] && (
          <img
            src={product.images[1]}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          />
        )}

        {/* Icona Wishlist (Cuore in alto a destra) */}
        <button className="absolute top-3 right-3 p-2 rounded-full hover:bg-white/80 transition-colors text-neutral-800">
          <Heart className="w-5 h-5 stroke-[1.5]" />
        </button>

        {/* Badge "Nuovo" (Opzionale) */}
        {product.is_new_arrival && (
          <span className="absolute top-4 left-4 text-[10px] uppercase tracking-widest font-bold text-white bg-emerald-900/80 px-2 py-1 backdrop-blur-sm">
            Nuovo
          </span>
        )}
      </div>

      {/* 2. Meta Info (Sotto l'immagine) */}
      <div className="flex flex-col gap-1 px-1">
        {/* Riga Colori e Label */}
        <div className="flex justify-between items-center mb-1">
          {/* Mockup pallini colori (Simuliamo i colori disponibili) */}
          <div className="flex gap-1.5">
            <div className="w-3.5 h-3.5 rounded-full border border-neutral-200 bg-black" title="Nero"></div>
            {/* Se è Emerald Touch, mostriamo anche il verde */}
            {product.category === "emerald-touch" && (
              <div className="w-3.5 h-3.5 rounded-full border border-neutral-200 bg-emerald-700" title="Smeraldo"></div>
            )}
            {product.category === "classics" && (
              <div className="w-3.5 h-3.5 rounded-full border border-neutral-200 bg-[#F5F5DC]" title="Crema"></div>
            )}
          </div>
          <span className="text-[10px] text-neutral-400 uppercase tracking-wide">
            {product.category === "emerald-touch" ? "2 Colori" : "1 Colore"}
          </span>
        </div>

        {/* Titolo Prodotto */}
        <h3 className="font-sans text-sm text-neutral-900 font-medium leading-tight group-hover:underline decoration-1 underline-offset-4 decoration-neutral-300">
          {product.name}
        </h3>

        {/* Prezzo */}
        <p className="font-sans text-xs text-neutral-500 mt-0.5">
          {new Intl.NumberFormat("it-IT", {
            style: "currency",
            currency: "EUR",
          }).format(product.price)}
        </p>
      </div>
    </motion.div>
  );
};

// --- PAGINA PRINCIPALE ---
const Collezioni = () => {
  const [activeFilter, setActiveFilter] = useState<string | undefined>(undefined);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Hook dati
  const { data: products, isLoading } = useProducts(activeFilter);

  // Titolo dinamico basato sul filtro
  const pageTitle = !activeFilter
    ? "TUTTE LE COLLEZIONI"
    : activeFilter === "emerald-touch"
      ? "EMERALD TOUCH"
      : "I CLASSICI";

  return (
    <main className="pt-24 pb-20 min-h-screen bg-white">
      {/* 1. Header & Title (Centrato come nella foto) */}
      <div className="text-center mb-12 md:mb-16 container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
          <span className="text-xs font-bold tracking-[0.2em] text-emerald-600 uppercase">Autunno / Inverno 2024</span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-neutral-950">{pageTitle}</h1>
        </motion.div>
      </div>

      {/* 2. Control Bar (Filtro Sx - Ordina Dx) */}
      <div className="sticky top-[70px] z-30 bg-white/95 backdrop-blur-sm border-b border-neutral-100 mb-8 py-3">
        <div className="container mx-auto px-4 lg:px-8 flex justify-between items-center">
          {/* SINISTRA: Filtro (Apre Sheet o Menu) */}
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-9 px-4 rounded-none border-neutral-200 hover:bg-neutral-50 font-sans text-xs uppercase tracking-widest gap-2"
                >
                  <Filter className="w-3.5 h-3.5" /> Filtro
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48 bg-white rounded-none border-neutral-100">
                <DropdownMenuItem
                  onClick={() => setActiveFilter(undefined)}
                  className="cursor-pointer font-sans text-xs uppercase py-3"
                >
                  Tutto
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setActiveFilter("emerald-touch")}
                  className="cursor-pointer font-sans text-xs uppercase py-3"
                >
                  Emerald Touch
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setActiveFilter("classics")}
                  className="cursor-pointer font-sans text-xs uppercase py-3"
                >
                  Classici
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Counter Prodotti (Visibile solo desktop) */}
            {!isLoading && (
              <span className="hidden md:inline-block text-[10px] text-neutral-400 font-sans uppercase tracking-widest">
                {products?.length} Prodotti
              </span>
            )}
          </div>

          {/* DESTRA: Ordinamento */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-9 px-3 hover:bg-transparent font-sans text-xs uppercase tracking-widest gap-1 text-neutral-600 hover:text-black"
              >
                Ordinare <ChevronDown className="w-3.5 h-3.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40 bg-white rounded-none border-neutral-100">
              <DropdownMenuItem onClick={() => setSortOrder("asc")} className="cursor-pointer font-sans text-xs">
                Prezzo: Crescente
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortOrder("desc")} className="cursor-pointer font-sans text-xs">
                Prezzo: Decrescente
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* 3. Product Grid (4 Colonne Desktop - Stile Foto) */}
      <div className="container mx-auto px-4 lg:px-8">
        {isLoading ? (
          <div className="flex justify-center py-20">
            <ButterflyLoader />
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-16">
            {products?.map((product, i) => (
              <CollectionCard key={product.id} product={product} index={i} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && products?.length === 0 && (
          <div className="text-center py-32">
            <p className="font-serif text-xl text-neutral-400">Nessun prodotto trovato in questa collezione.</p>
            <Button variant="link" onClick={() => setActiveFilter(undefined)} className="mt-4 text-emerald-600">
              Vedi tutto
            </Button>
          </div>
        )}
      </div>

      {/* WhatsApp Floating Button (Come in foto in basso a dx) */}
      <div className="fixed bottom-6 right-6 z-40">
        <button className="bg-[#25D366] hover:bg-[#20bd5a] text-white p-3.5 rounded-full shadow-lg transition-transform hover:scale-110 flex items-center justify-center">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
        </button>
      </div>
    </main>
  );
};

export default Collezioni;
