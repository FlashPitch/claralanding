import { motion, useScroll, useTransform } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';
import Button from '@/components/ui/Button';
import { useRef } from 'react';

const HeroSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const benefits = [
    "Landing page professionnelle livrée en 7 jours",
    "Design moderne qui reflète ton identité",
    "Optimisée pour convertir ton trafic TikTok/Instagram"
  ];

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-violet via-purple-600 to-primary-blue"
    >
      {/* Parallax Background Effect */}
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(255,255,255,0.05),transparent)]" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-20 md:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-medium mb-6"
            >
              <Sparkles className="w-4 h-4 text-primary-orange" />
              <span>🔥 Offre de lancement - Places limitées</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-h1-desktop font-extrabold text-white mb-6 leading-tight"
            >
              Transforme Ton Audience en Clients Payants Avec Un Tunnel de Vente Qui Convertit 24/7
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed"
            >
              La solution complète pour les créateurs de contenu qui veulent enfin monétiser leur expertise sans stress technique
            </motion.p>

            {/* Benefits List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-4 mb-10"
            >
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="flex items-start gap-3 text-white"
                >
                  <div className="flex-shrink-0 w-6 h-6 bg-secondary-green rounded-full flex items-center justify-center mt-0.5">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-lg">{benefit}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button
                variant="primary"
                size="lg"
                onClick={() => scrollToSection('offres')}
                className="text-base md:text-lg"
              >
                Obtenir Mon Tunnel Maintenant
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => scrollToSection('social-proof')}
                className="text-base md:text-lg"
              >
                Voir Des Exemples
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Column - Mockup Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotateY: [0, 5, 0]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative"
            >
              {/* MacBook Mockup Placeholder */}
              <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-3 shadow-2xl">
                <div className="bg-white rounded-lg overflow-hidden">
                  <div className="h-4 bg-gray-100 border-b border-gray-200 flex items-center px-2 gap-1">
                    <div className="w-2 h-2 rounded-full bg-red-400"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                    <div className="w-2 h-2 rounded-full bg-green-400"></div>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="h-8 bg-gradient-to-r from-primary-violet to-primary-blue rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="h-24 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg"></div>
                      <div className="h-24 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg"></div>
                    </div>
                    <div className="h-10 bg-primary-orange rounded-lg mt-6"></div>
                  </div>
                </div>
              </div>

              {/* iPhone Mockup - Floating */}
              <motion.div
                animate={{
                  y: [0, -15, 0],
                  rotate: [-2, 2, -2]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -bottom-8 -right-8 w-32 bg-black rounded-3xl p-2 shadow-2xl"
              >
                <div className="bg-white rounded-2xl overflow-hidden h-48">
                  <div className="h-full bg-gradient-to-b from-primary-violet to-primary-blue p-3">
                    <div className="h-2 bg-white/30 rounded-full w-1/3 mx-auto mb-3"></div>
                    <div className="space-y-2">
                      <div className="h-3 bg-white/80 rounded"></div>
                      <div className="h-3 bg-white/80 rounded w-4/5"></div>
                      <div className="h-16 bg-white/90 rounded-lg mt-3"></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Floating Elements */}
            <motion.div
              animate={{
                y: [0, -20, 0],
                rotate: [0, 360]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute -top-6 -left-6 w-16 h-16 bg-primary-orange rounded-full opacity-20 blur-xl"
            />
            <motion.div
              animate={{
                y: [0, 20, 0],
                rotate: [360, 0]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute -bottom-6 left-1/2 w-20 h-20 bg-white rounded-full opacity-10 blur-xl"
            />
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2"
        >
          <div className="w-1 h-2 bg-white/50 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
