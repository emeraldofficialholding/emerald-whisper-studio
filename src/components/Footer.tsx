import { Link } from "react-router-dom";
import { Instagram, Facebook, Linkedin, ArrowUpRight, Mail, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#051c14] text-emerald-50 pt-20 pb-10 border-t border-emerald-900/30">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Griglia Principale */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* COLONNA 1: Brand & Vision */}
          <div className="md:col-span-1 space-y-6">
            <h3 className="font-serif text-2xl tracking-[0.1em] text-white">EMERALDRESS</h3>
            <p className="text-sm text-emerald-100/60 leading-relaxed font-sans max-w-xs">
              Ridefiniamo il lusso attraverso la sostenibilità e l'artigianato italiano. Ogni capo è una promessa al
              pianeta e un omaggio alla bellezza.
            </p>
            <div className="flex items-center gap-4">
              <SocialIcon icon={<Instagram className="w-5 h-5" />} href="https://instagram.com" />
              <SocialIcon icon={<Facebook className="w-5 h-5" />} href="https://facebook.com" />
              <SocialIcon icon={<Linkedin className="w-5 h-5" />} href="https://linkedin.com" />
            </div>
          </div>

          {/* COLONNA 2: Esplora */}
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase font-bold text-white mb-6">Esplora</h4>
            <ul className="space-y-4">
              <FooterLink to="/collezioni" label="Collezioni" />
              <FooterLink to="/sostenibilita" label="Sostenibilità" />
              <FooterLink to="/emeraldscanner" label="Emerald Scanner" />
              <FooterLink to="/chisiamo" label="Chi Siamo" />
            </ul>
          </div>

          {/* COLONNA 3: Supporto & Legal */}
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase font-bold text-white mb-6">Supporto</h4>
            <ul className="space-y-4">
              <FooterLink to="/faq" label="FAQ & Spedizioni" />
              <FooterLink to="/resi" label="Politica di Reso" />
              <FooterLink to="/privacy" label="Privacy Policy" />
              <FooterLink to="/termini" label="Termini e Condizioni" />
            </ul>
          </div>

          {/* COLONNA 4: Contatti Rapidi */}
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase font-bold text-white mb-6">Atelier</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3 group cursor-pointer">
                <MapPin className="w-5 h-5 text-emerald-600 mt-0.5 group-hover:text-emerald-400 transition-colors" />
                <p className="text-sm text-emerald-100/60 font-sans group-hover:text-white transition-colors">
                  Via della Spiga, 15
                  <br />
                  20121 Milano, Italia
                </p>
              </div>
              <div className="flex items-center gap-3 group cursor-pointer">
                <Mail className="w-5 h-5 text-emerald-600 group-hover:text-emerald-400 transition-colors" />
                <a
                  href="mailto:info@emeraldress.it"
                  className="text-sm text-emerald-100/60 font-sans group-hover:text-white transition-colors"
                >
                  info@emeraldress.it
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-emerald-900/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="text-xs text-emerald-100/40 font-sans tracking-wide">
            © {currentYear} EMERALDRESS. Tutti i diritti riservati.
          </p>

          <div className="flex items-center gap-6">
            <span className="text-xs text-emerald-100/40 font-sans">
              Designed by{" "}
              <span className="text-emerald-400 font-bold hover:text-white transition-colors cursor-pointer">
                @KREA
              </span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Componente Helper per i Link
const FooterLink = ({ to, label }: { to: string; label: string }) => (
  <li>
    <Link
      to={to}
      className="group flex items-center gap-2 text-sm text-emerald-100/60 hover:text-white transition-colors font-sans"
    >
      <span className="w-0 group-hover:w-2 h-px bg-emerald-400 transition-all duration-300"></span>
      {label}
    </Link>
  </li>
);

// Componente Helper per le Icone Social
const SocialIcon = ({ icon, href }: { icon: React.ReactNode; href: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="w-10 h-10 rounded-full bg-emerald-900/30 border border-emerald-800 flex items-center justify-center text-emerald-400 hover:bg-emerald-400 hover:text-emerald-950 hover:border-emerald-400 transition-all duration-300"
  >
    {icon}
  </a>
);

export default Footer;
