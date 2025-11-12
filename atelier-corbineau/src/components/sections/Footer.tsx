import { motion } from 'framer-motion';
import { Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    offers: [
      { label: "Pack Creator Pro", href: "#offres" },
      { label: "Pack Creator Empire", href: "#offres" },
      { label: "Services sur-mesure", href: "#" },
      { label: "Portfolio", href: "#social-proof" }
    ],
    resources: [
      { label: "Blog", href: "#" },
      { label: "Études de cas", href: "#social-proof" },
      { label: "Guide gratuit", href: "#" },
      { label: "FAQ", href: "#faq" }
    ],
    legal: [
      { label: "CGV", href: "#" },
      { label: "Mentions légales", href: "#" },
      { label: "Politique de confidentialité", href: "#" }
    ]
  };

  const socialLinks = [
    { icon: <Instagram className="w-5 h-5" />, href: "https://instagram.com/ateliercorbineau", label: "Instagram" },
    { icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>, href: "https://tiktok.com/@ateliercorbineau", label: "TikTok" },
    { icon: <Linkedin className="w-5 h-5" />, href: "https://linkedin.com/company/ateliercorbineau", label: "LinkedIn" }
  ];

  return (
    <footer className="bg-neutral-black text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Column 1: Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6">
              <h3 className="text-2xl font-black text-gradient mb-2">
                Atelier Corbineau
              </h3>
              <p className="text-lg font-semibold text-white/90">
                Creator Edition
              </p>
            </div>
            <p className="text-white/70 mb-6 leading-relaxed">
              Tunnels de vente pour créateurs de contenu
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 bg-white/10 hover:bg-gradient-to-br hover:from-primary-violet hover:to-primary-blue rounded-full flex items-center justify-center transition-all"
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Column 2: Offres */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-lg font-bold mb-6">Offres</h4>
            <ul className="space-y-3">
              {footerLinks.offers.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-white/70 hover:text-white hover:translate-x-1 inline-block transition-all"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Ressources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-lg font-bold mb-6">Ressources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-white/70 hover:text-white hover:translate-x-1 inline-block transition-all"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 4: Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="text-lg font-bold mb-6">Contact</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:contact@ateliercorbineau.fr"
                  className="flex items-start gap-3 text-white/70 hover:text-white transition-colors group"
                >
                  <Mail className="w-5 h-5 mt-0.5 group-hover:scale-110 transition-transform" />
                  <span>contact@ateliercorbineau.fr</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+33630154807"
                  className="flex items-start gap-3 text-white/70 hover:text-white transition-colors group"
                >
                  <Phone className="w-5 h-5 mt-0.5 group-hover:scale-110 transition-transform" />
                  <span>06 30 15 48 07</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-white/70">
                <MapPin className="w-5 h-5 mt-0.5" />
                <span>Cholet, France</span>
              </li>
            </ul>

            {/* Contact Form Link */}
            <a
              href="#"
              className="mt-6 inline-block px-4 py-2 bg-primary-violet hover:bg-primary-blue rounded-lg text-sm font-semibold transition-colors"
            >
              Formulaire de contact
            </a>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-white/60 text-sm"
            >
              © {currentYear} Atelier Corbineau. Tous droits réservés.
            </motion.p>

            {/* Legal Links */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex flex-wrap justify-center gap-6 text-sm"
            >
              {footerLinks.legal.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Decorative Bottom Gradient */}
      <div className="h-1 bg-gradient-to-r from-primary-violet via-primary-blue to-primary-orange" />
    </footer>
  );
};

export default Footer;
