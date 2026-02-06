
-- Products table
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC(10,2) NOT NULL,
  category TEXT NOT NULL,
  images TEXT[] NOT NULL DEFAULT '{}',
  sizes TEXT[] DEFAULT '{S,M,L}',
  fabric_details TEXT,
  shipping_info TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Products are viewable by everyone"
ON public.products FOR SELECT USING (true);

-- Scanner requests table
CREATE TABLE public.scanner_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  brand TEXT,
  material TEXT,
  garment_type TEXT,
  image_url TEXT,
  input_type TEXT NOT NULL DEFAULT 'manual',
  sustainability_score INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.scanner_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert scanner requests"
ON public.scanner_requests FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can view their scanner requests"
ON public.scanner_requests FOR SELECT USING (true);

-- Storage bucket for scanner uploads
INSERT INTO storage.buckets (id, name, public) VALUES ('scanner_uploads', 'scanner_uploads', true);

CREATE POLICY "Anyone can upload scanner images"
ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'scanner_uploads');

CREATE POLICY "Anyone can view scanner images"
ON storage.objects FOR SELECT USING (bucket_id = 'scanner_uploads');

-- Seed some products
INSERT INTO public.products (name, description, price, category, images, fabric_details, shipping_info) VALUES
('Abito Smeraldo Drappeggiato', 'Abito lungo in seta rigenerata con drappeggio asimmetrico. Tinto con pigmenti naturali.', 890.00, 'emerald-touch', ARRAY['https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=800&fit=crop', 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600&h=800&fit=crop'], 'Seta rigenerata 100%, certificazione GOTS', 'Spedizione carbon-neutral in 3-5 giorni'),
('Vestito Foglia Verde', 'Elegante abito midi con dettagli botanici ricamati a mano.', 720.00, 'emerald-touch', ARRAY['https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&h=800&fit=crop', 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=800&fit=crop'], 'Lino organico e seta riciclata', 'Spedizione green gratuita sopra i 500€'),
('Abito Giardino Mediterraneo', 'Silhouette fluida ispirata ai giardini della costiera. Tessuto biodegradabile.', 950.00, 'emerald-touch', ARRAY['https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=600&h=800&fit=crop', 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&h=800&fit=crop'], 'Viscosa Ecovero™, fibra da legno certificato', 'Consegna in packaging compostabile'),
('Abito Aurora Smeraldo', 'Design scultorale con spalle strutturate. Fibra riciclata post-consumo.', 1150.00, 'emerald-touch', ARRAY['https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&h=800&fit=crop', 'https://images.unsplash.com/photo-1502716119720-b23a1e3b3a34?w=600&h=800&fit=crop'], 'Poliestere riciclato da plastica oceanica', 'Spedizione express sostenibile disponibile'),
('Abito Nero Classico', 'Il classico little black dress reinventato con tessuti sostenibili.', 680.00, 'classics', ARRAY['https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600&h=800&fit=crop', 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=800&fit=crop'], 'Crêpe di seta rigenerata', 'Spedizione standard green inclusa'),
('Abito Avorio Elegante', 'Silhouette minimalista in tonalità avorio. Perfetto per ogni occasione.', 780.00, 'classics', ARRAY['https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=800&fit=crop', 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&h=800&fit=crop'], 'Cotone organico certificato GOTS', 'Consegna in 2-4 giorni lavorativi'),
('Abito Blu Notte', 'Abito da sera in blu profondo con riflessi satinati.', 920.00, 'classics', ARRAY['https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&h=800&fit=crop', 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=600&h=800&fit=crop'], 'Satin di tencel lyocell', 'Spedizione carbon-neutral garantita'),
('Abito Grigio Perla', 'Eleganza discreta in grigio perla. Linea pulita e contemporanea.', 750.00, 'classics', ARRAY['https://images.unsplash.com/photo-1502716119720-b23a1e3b3a34?w=600&h=800&fit=crop', 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&h=800&fit=crop'], 'Lana merino riciclata', 'Packaging zero-waste incluso');
