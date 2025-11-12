import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lock, CheckCircle, Clock } from 'lucide-react';
import Section from '@/components/ui/Section';
import Button from '@/components/ui/Button';

const FinalCTASection = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Calculate end of month
    const calculateTimeLeft = () => {
      const now = new Date();
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
      const difference = endOfMonth.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const placesLeft = 3; // Dynamic value

  return (
    <Section background="gradient-orange" padding="xxl" className="relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-1/2 -left-1/2 w-full h-full bg-white/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-white/5 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight">
            Prêt(e) à Transformer Ton Audience
            <br />
            en Clients ?
          </h2>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
            Rejoins les créateurs qui monetisent enfin leur expertise
          </p>
        </motion.div>

        {/* Countdown Timer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto mb-12"
        >
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/20">
            <div className="flex items-center justify-center gap-2 mb-6 text-white">
              <Clock className="w-5 h-5" />
              <span className="text-lg font-semibold">
                Offre de lancement : Plus que {placesLeft} places ce mois-ci
              </span>
            </div>

            <div className="grid grid-cols-4 gap-4">
              {[
                { value: timeLeft.days, label: 'Jours' },
                { value: timeLeft.hours, label: 'Heures' },
                { value: timeLeft.minutes, label: 'Minutes' },
                { value: timeLeft.seconds, label: 'Secondes' }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="bg-white rounded-xl p-4 mb-2 shadow-xl">
                    <div className="text-3xl md:text-4xl font-black text-gradient font-accent">
                      {String(item.value).padStart(2, '0')}
                    </div>
                  </div>
                  <div className="text-sm text-white/80 font-medium">
                    {item.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col gap-4 max-w-2xl mx-auto mb-12"
        >
          <Button
            variant="primary"
            size="lg"
            className="w-full bg-white text-primary-violet hover:bg-gray-100 text-lg md:text-xl py-6 shadow-2xl"
          >
            Je Choisis Creator Pro - 1 497€
          </Button>
          <Button
            variant="gradient"
            size="lg"
            className="w-full text-lg md:text-xl py-6 shadow-2xl"
          >
            Je Choisis Creator Empire - 2 997€
          </Button>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="flex flex-col md:flex-row items-center justify-center gap-6 mb-12 text-white"
        >
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-secondary-green" />
            <span>Paiement sécurisé Stripe</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-secondary-green" />
            <span>Livraison garantie sous 7-14 jours</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-secondary-green" />
            <span>Support inclus</span>
          </div>
        </motion.div>

        {/* Reassurance Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
          className="flex flex-wrap justify-center gap-6"
        >
          <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full flex items-center gap-2 text-white border border-white/30">
            <Lock className="w-5 h-5" />
            <span className="font-semibold">Paiement 100% sécurisé</span>
          </div>
          <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full flex items-center gap-2 text-white border border-white/30">
            <CheckCircle className="w-5 h-5" />
            <span className="font-semibold">Satisfait ou modifié</span>
          </div>
        </motion.div>

        {/* Urgency Message */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.2 }}
          className="mt-12 text-center"
        >
          <p className="text-white/90 text-sm md:text-base max-w-2xl mx-auto">
            ⚠️ <span className="font-bold">Attention :</span> Nous limitons le nombre de projets par mois pour garantir une qualité optimale.
            Ne rate pas cette opportunité de transformer ton audience en business rentable !
          </p>
        </motion.div>
      </div>

      {/* Floating Particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-white rounded-full opacity-30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2
          }}
        />
      ))}
    </Section>
  );
};

export default FinalCTASection;
