import { motion } from 'framer-motion';
import { Check, Zap, Crown, Gift } from 'lucide-react';
import Section from '@/components/ui/Section';
import Button from '@/components/ui/Button';

const PricingSection = () => {
  const packages = [
    {
      name: "Creator Pro",
      badge: { icon: <Zap className="w-4 h-4" />, text: "POPULAIRE" },
      price: "1 497€",
      originalPrice: "2 997€",
      savings: "Économise 1 500€",
      tagline: "Pour démarrer rapidement",
      features: [
        "Landing page de vente optimisée",
        "Page de capture + lead magnet",
        "Page de remerciement avec upsell",
        "Intégration paiement Stripe",
        "Tracking conversions complet",
        "Design personnalisé à ta marque",
        "30 jours de support",
        "1 modification majeure"
      ],
      bonuses: [
        { icon: "🎁", name: "Templates réseaux sociaux", value: "297€" },
        { icon: "🎁", name: "Guide landing pages", value: "97€" },
        { icon: "🎁", name: "Script vidéo personnalisé", value: "197€" }
      ],
      cta: "Je Démarre Avec Creator Pro",
      deliveryTime: "✨ Livraison en 7 jours ouvrés",
      variant: "default" as const
    },
    {
      name: "Creator Empire",
      badge: { icon: <Crown className="w-4 h-4" />, text: "RECOMMANDÉ" },
      price: "2 997€",
      originalPrice: null,
      savings: null,
      tagline: "Pour scaler ton business",
      features: [
        "Tout du pack Creator Pro",
        "Page de vente long-format",
        "5 emails automatisés (nurturing)",
        "Page témoignages dédiée",
        "Intégration CRM avancée",
        "Split testing A/B",
        "Formation optimisation",
        "60 jours de support VIP",
        "3 modifications majeures",
        "Consultation stratégie 1h"
      ],
      bonuses: [
        { icon: "🎁", name: "Audit réseaux sociaux", value: "497€" },
        { icon: "🎁", name: "Stratégie contenu 30 jours", value: "—" },
        { icon: "🎁", name: "10 templates Canva pro", value: "—" }
      ],
      cta: "Je Passe à l'Empire",
      deliveryTime: "🚀 Livraison en 14 jours ouvrés",
      variant: "gradient" as const,
      highlighted: true
    }
  ];

  return (
    <Section background="white" padding="xl" id="offres">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl lg:text-h2-desktop font-extrabold text-neutral-black mb-4">
          Choisis Le Pack Qui Te Correspond
        </h2>
        <p className="text-xl text-neutral-medium-gray">
          Quel que soit ton niveau, on a LA solution pour lancer ton business en ligne
        </p>
      </motion.div>

      {/* Pricing Cards */}
      <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12">
        {packages.map((pkg, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="relative"
          >
            {/* Card */}
            <div
              className={`relative h-full rounded-2xl p-8 transition-all duration-300 ${
                pkg.highlighted
                  ? 'bg-gradient-to-br from-primary-violet via-purple-600 to-primary-blue shadow-2xl lg:scale-105 hover:scale-110 border-0'
                  : 'bg-white border-2 border-primary-blue shadow-xl hover:shadow-2xl hover:scale-105'
              }`}
            >
              {/* Badge */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold ${
                    pkg.highlighted
                      ? 'bg-primary-orange text-white shadow-lg'
                      : 'bg-primary-blue text-white shadow-lg'
                  }`}
                >
                  {pkg.badge.icon}
                  <span>{pkg.badge.text}</span>
                </div>
              </div>

              {/* Header */}
              <div className={`text-center mb-6 ${pkg.highlighted ? 'text-white' : 'text-neutral-black'}`}>
                <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                <p className={`text-sm ${pkg.highlighted ? 'text-white/80' : 'text-neutral-medium-gray'}`}>
                  {pkg.tagline}
                </p>
              </div>

              {/* Pricing */}
              <div className={`text-center mb-8 ${pkg.highlighted ? 'text-white' : 'text-neutral-black'}`}>
                {pkg.originalPrice && (
                  <div className="mb-2">
                    <span className="text-xl line-through opacity-60">{pkg.originalPrice}</span>
                    <span className="ml-2 text-sm bg-secondary-green text-white px-2 py-1 rounded-full">
                      {pkg.savings}
                    </span>
                  </div>
                )}
                <div className="text-5xl md:text-6xl font-black font-accent mb-2">
                  {pkg.price}
                </div>
                <div className={`text-sm ${pkg.highlighted ? 'text-white/70' : 'text-neutral-medium-gray'}`}>
                  TTC
                </div>
              </div>

              {/* Features */}
              <div className="mb-8">
                <h4 className={`text-sm font-bold mb-4 ${pkg.highlighted ? 'text-white' : 'text-neutral-black'}`}>
                  INCLUS :
                </h4>
                <div className="space-y-3">
                  {pkg.features.map((feature, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + idx * 0.05 }}
                      className="flex items-start gap-3"
                    >
                      <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                        pkg.highlighted ? 'bg-white/20' : 'bg-secondary-green'
                      }`}>
                        <Check className={`w-3 h-3 ${pkg.highlighted ? 'text-white' : 'text-white'}`} />
                      </div>
                      <span className={`text-sm ${pkg.highlighted ? 'text-white' : 'text-neutral-black'}`}>
                        {feature}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Bonuses */}
              <div className="mb-8">
                <h4 className={`text-sm font-bold mb-4 flex items-center gap-2 ${
                  pkg.highlighted ? 'text-white' : 'text-neutral-black'
                }`}>
                  <Gift className="w-4 h-4" />
                  BONUS {pkg.highlighted && 'VIP'} :
                </h4>
                <div className="space-y-2">
                  {pkg.bonuses.map((bonus, idx) => (
                    <div
                      key={idx}
                      className={`flex items-center justify-between text-sm p-2 rounded-lg ${
                        pkg.highlighted ? 'bg-white/10' : 'bg-primary-blue/5'
                      }`}
                    >
                      <span className={pkg.highlighted ? 'text-white' : 'text-neutral-black'}>
                        {bonus.icon} {bonus.name}
                      </span>
                      {bonus.value !== '—' && (
                        <span className={`font-bold ${pkg.highlighted ? 'text-primary-orange' : 'text-primary-blue'}`}>
                          {bonus.value}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <Button
                variant={pkg.variant === 'gradient' ? 'gradient' : 'primary'}
                size="lg"
                className="w-full mb-4"
              >
                {pkg.cta}
              </Button>

              {/* Delivery Time */}
              <p className={`text-center text-sm ${pkg.highlighted ? 'text-white/80' : 'text-neutral-medium-gray'}`}>
                {pkg.deliveryTime}
              </p>

              {/* Glow Effect for Highlighted */}
              {pkg.highlighted && (
                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary-violet to-primary-blue opacity-50 blur-2xl rounded-2xl" />
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Comparison Link */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8 }}
        className="text-center"
      >
        <button className="text-primary-blue hover:text-primary-violet font-semibold underline underline-offset-4 transition-colors">
          Voir le tableau comparatif détaillé →
        </button>
      </motion.div>

      {/* Trust Signals */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 1 }}
        className="mt-16 flex flex-wrap justify-center gap-8 text-sm text-neutral-medium-gray"
      >
        <div className="flex items-center gap-2">
          <span className="text-xl">🔒</span>
          <span>Paiement 100% sécurisé</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xl">✓</span>
          <span>+50 créateurs satisfaits</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xl">⭐</span>
          <span>Note moyenne : 4.9/5</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xl">⚡</span>
          <span>Réponse en moins de 2h</span>
        </div>
      </motion.div>
    </Section>
  );
};

export default PricingSection;
