import { motion } from 'framer-motion';
import { Palette, TrendingUp, HeadphonesIcon, Check } from 'lucide-react';
import Section from '@/components/ui/Section';

const SolutionSection = () => {
  const benefits = [
    {
      icon: <Palette className="w-8 h-8 text-primary-violet" />,
      title: "Design Qui Reflète Ton Univers",
      description: "Une landing page moderne et professionnelle aux couleurs de ta marque, qui donne envie d'acheter dès la première seconde",
      features: [
        "Responsive (parfait sur mobile)",
        "Temps de chargement ultra-rapide",
        "Animations subtiles qui captent l'attention"
      ],
      imagePosition: "left"
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-primary-blue" />,
      title: "Optimisée Pour La Conversion",
      description: "Chaque élément est pensé pour maximiser tes ventes grâce aux techniques de copywriting éprouvées",
      features: [
        "Tracking complet (Meta Pixel + Google Analytics)",
        "Formulaires optimisés psychologiquement",
        "CTA stratégiquement positionnés"
      ],
      imagePosition: "right"
    },
    {
      icon: <HeadphonesIcon className="w-8 h-8 text-primary-orange" />,
      title: "Support et Formation Inclus",
      description: "Tu n'es jamais seul(e). On t'accompagne pour que tu saches utiliser et optimiser ton tunnel",
      features: [
        "30 jours de support technique",
        "Tutoriels vidéo personnalisés",
        "Modifications incluses"
      ],
      imagePosition: "left"
    }
  ];

  return (
    <Section background="white" padding="xl" className="bg-gradient-to-b from-blue-50/30 to-purple-50/30">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-20"
      >
        <h2 className="text-3xl md:text-4xl lg:text-h2-desktop font-extrabold text-neutral-black mb-6">
          <span className="text-gradient">Atelier Corbineau Creator Edition</span>
          <br />
          Ton Tunnel de Vente Clé en Main
        </h2>
        <p className="text-xl text-neutral-medium-gray max-w-3xl mx-auto">
          Nous créons pour toi une machine à convertir optimisée pour les créateurs de contenu
        </p>
      </motion.div>

      {/* Benefits Blocks - Alternating Layout */}
      <div className="space-y-24">
        {benefits.map((benefit, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: index * 0.2 }}
            className={`grid lg:grid-cols-2 gap-12 items-center ${
              benefit.imagePosition === "right" ? "lg:grid-flow-dense" : ""
            }`}
          >
            {/* Text Content */}
            <div className={benefit.imagePosition === "right" ? "lg:col-start-1" : ""}>
              {/* Icon */}
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-violet/10 to-primary-blue/10 rounded-2xl mb-6"
              >
                {benefit.icon}
              </motion.div>

              {/* Title */}
              <h3 className="text-2xl md:text-3xl font-bold text-neutral-black mb-4">
                {benefit.title}
              </h3>

              {/* Description */}
              <p className="text-lg text-neutral-medium-gray mb-6 leading-relaxed">
                {benefit.description}
              </p>

              {/* Features List */}
              <div className="space-y-3">
                {benefit.features.map((feature, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + idx * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className="flex-shrink-0 w-6 h-6 bg-secondary-green rounded-full flex items-center justify-center mt-0.5">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-neutral-black">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Image/Mockup Placeholder */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className={`relative ${
                benefit.imagePosition === "right" ? "lg:col-start-2" : ""
              }`}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                {/* Mockup based on benefit type */}
                {index === 0 && (
                  // Design Mockup
                  <div className="bg-gradient-to-br from-primary-violet to-primary-blue p-8 aspect-[4/3]">
                    <div className="bg-white rounded-xl p-6 h-full flex flex-col justify-between">
                      <div>
                        <div className="h-8 bg-gradient-to-r from-primary-violet to-primary-blue rounded mb-4"></div>
                        <div className="space-y-2">
                          <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                          <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                          <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg"></div>
                        <div className="h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg"></div>
                      </div>
                      <div className="h-12 bg-primary-orange rounded-lg"></div>
                    </div>
                  </div>
                )}

                {index === 1 && (
                  // Analytics Dashboard Mockup
                  <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 aspect-[4/3]">
                    <div className="space-y-4">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="bg-gradient-to-br from-primary-blue to-blue-600 rounded-xl p-4">
                          <div className="text-white/60 text-xs mb-1">Conversions</div>
                          <div className="text-white text-2xl font-bold">7.2%</div>
                        </div>
                        <div className="bg-gradient-to-br from-secondary-green to-green-600 rounded-xl p-4">
                          <div className="text-white/60 text-xs mb-1">Visitors</div>
                          <div className="text-white text-2xl font-bold">2.4K</div>
                        </div>
                        <div className="bg-gradient-to-br from-primary-orange to-orange-600 rounded-xl p-4">
                          <div className="text-white/60 text-xs mb-1">Revenue</div>
                          <div className="text-white text-2xl font-bold">8.2K€</div>
                        </div>
                      </div>
                      <div className="bg-white/10 backdrop-blur rounded-xl p-4 h-32">
                        <div className="flex items-end justify-between h-full gap-2">
                          {[40, 65, 45, 80, 55, 90, 70].map((height, i) => (
                            <div
                              key={i}
                              className="bg-primary-blue rounded-t flex-1"
                              style={{ height: `${height}%` }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {index === 2 && (
                  // Support Illustration
                  <div className="bg-gradient-to-br from-primary-orange to-orange-600 p-8 aspect-[4/3] flex items-center justify-center">
                    <div className="bg-white rounded-2xl p-6 max-w-sm">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary-violet to-primary-blue rounded-full"></div>
                        <div className="flex-1">
                          <div className="h-3 bg-gray-200 rounded w-3/4 mb-2"></div>
                          <div className="h-2 bg-gray-100 rounded w-1/2"></div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="bg-gray-100 rounded-2xl rounded-bl-none p-3">
                          <div className="h-2 bg-gray-300 rounded w-full mb-2"></div>
                          <div className="h-2 bg-gray-300 rounded w-4/5"></div>
                        </div>
                        <div className="bg-primary-blue text-white rounded-2xl rounded-br-none p-3 ml-auto w-4/5">
                          <div className="h-2 bg-white/50 rounded w-full mb-2"></div>
                          <div className="h-2 bg-white/50 rounded w-3/5"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Floating Badge */}
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute -top-4 -right-4 bg-white rounded-full px-4 py-2 shadow-lg border-2 border-primary-orange"
                >
                  <span className="text-sm font-bold text-primary-orange">✨ Pro</span>
                </motion.div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -z-10 -bottom-4 -right-4 w-32 h-32 bg-primary-violet/20 rounded-full blur-3xl" />
              <div className="absolute -z-10 -top-4 -left-4 w-24 h-24 bg-primary-blue/20 rounded-full blur-2xl" />
            </motion.div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

export default SolutionSection;
