import { motion } from 'framer-motion';
import { FileText, Palette, Wrench, Rocket } from 'lucide-react';
import Section from '@/components/ui/Section';
import Button from '@/components/ui/Button';

const ProcessSection = () => {
  const steps = [
    {
      icon: <FileText className="w-8 h-8" />,
      emoji: "📝",
      number: "01",
      title: "Brief Créatif",
      description: "Tu remplis un questionnaire détaillé sur ton offre, ton audience et ton identité visuelle",
      duration: "Jour 1",
      color: "from-primary-blue to-blue-600"
    },
    {
      icon: <Palette className="w-8 h-8" />,
      emoji: "🎨",
      number: "02",
      title: "Conception & Design",
      description: "Notre équipe crée ta landing page sur-mesure avec Lovable (technologie moderne et performante)",
      duration: "Jours 2-5",
      color: "from-primary-violet to-purple-600"
    },
    {
      icon: <Wrench className="w-8 h-8" />,
      emoji: "🔧",
      number: "03",
      title: "Intégrations & Tests",
      description: "On connecte tous les outils (paiement, analytics, CRM) et on teste chaque élément",
      duration: "Jour 6",
      color: "from-primary-orange to-orange-600"
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      emoji: "🚀",
      number: "04",
      title: "Livraison & Formation",
      description: "Tu reçois ta landing page + tutoriels vidéo pour la gérer en autonomie",
      duration: "Jour 7",
      color: "from-secondary-green to-green-600"
    }
  ];

  return (
    <Section background="gray" padding="xl">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-20"
      >
        <h2 className="text-3xl md:text-4xl lg:text-h2-desktop font-extrabold text-neutral-black mb-4">
          Comment Ça Marche ?
          <br />
          <span className="text-gradient">(C'est Simple)</span>
        </h2>
      </motion.div>

      {/* Timeline - Desktop Horizontal */}
      <div className="hidden lg:block">
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-primary-blue via-primary-violet via-primary-orange to-secondary-green" />

          {/* Steps */}
          <div className="grid grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative"
              >
                {/* Icon Circle */}
                <div className="relative mb-16">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className={`w-20 h-20 mx-auto bg-gradient-to-br ${step.color} rounded-full flex items-center justify-center text-white shadow-xl relative z-10`}
                  >
                    {step.icon}
                  </motion.div>

                  {/* Number Badge */}
                  <div className="absolute -top-2 -right-2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center font-bold text-neutral-black text-sm z-20">
                    {step.number}
                  </div>

                  {/* Pulse Effect */}
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 0, 0.5]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.4
                    }}
                    className={`absolute inset-0 bg-gradient-to-br ${step.color} rounded-full`}
                  />
                </div>

                {/* Content Card */}
                <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                  {/* Duration Badge */}
                  <div className="inline-block bg-gradient-to-r from-neutral-light-gray to-gray-200 px-3 py-1 rounded-full text-xs font-bold text-neutral-black mb-4">
                    {step.duration}
                  </div>

                  <h3 className="text-xl font-bold text-neutral-black mb-3">
                    {step.title}
                  </h3>

                  <p className="text-neutral-medium-gray text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline - Mobile/Tablet Vertical */}
      <div className="lg:hidden space-y-8">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            className="relative"
          >
            {/* Connecting Line */}
            {index < steps.length - 1 && (
              <div className={`absolute left-10 top-20 w-1 h-full bg-gradient-to-b ${step.color}`} />
            )}

            <div className="flex gap-6">
              {/* Icon Circle */}
              <div className="relative flex-shrink-0">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className={`w-20 h-20 bg-gradient-to-br ${step.color} rounded-full flex items-center justify-center text-white shadow-xl relative z-10`}
                >
                  {step.icon}
                </motion.div>

                {/* Number Badge */}
                <div className="absolute -top-2 -right-2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center font-bold text-neutral-black text-sm z-20">
                  {step.number}
                </div>
              </div>

              {/* Content Card */}
              <div className="flex-1 bg-white rounded-xl p-6 shadow-lg">
                {/* Duration Badge */}
                <div className="inline-block bg-gradient-to-r from-neutral-light-gray to-gray-200 px-3 py-1 rounded-full text-xs font-bold text-neutral-black mb-3">
                  {step.duration}
                </div>

                <h3 className="text-xl font-bold text-neutral-black mb-3">
                  {step.title}
                </h3>

                <p className="text-neutral-medium-gray leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8 }}
        className="mt-16 text-center"
      >
        <Button
          variant="primary"
          size="lg"
          onClick={() => {
            const element = document.getElementById('offres');
            if (element) element.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          Je Veux Mon Tunnel Maintenant
        </Button>
        <p className="mt-4 text-neutral-medium-gray text-sm">
          ⚡ Processus simple et transparent, sans surprise
        </p>
      </motion.div>
    </Section>
  );
};

export default ProcessSection;
