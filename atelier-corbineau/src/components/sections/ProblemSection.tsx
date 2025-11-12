import { motion } from 'framer-motion';
import { DollarSign, Clock, Frown } from 'lucide-react';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';

const ProblemSection = () => {
  const problems = [
    {
      icon: <DollarSign className="w-12 h-12 text-secondary-red" />,
      emoji: "💸",
      title: "Trafic Sans Conversion",
      description: "Tu as des milliers de vues sur TikTok/Instagram mais tu ne sais pas comment transformer ton audience en clients payants"
    },
    {
      icon: <Clock className="w-12 h-12 text-primary-orange" />,
      emoji: "⏰",
      title: "Temps Perdu",
      description: "Tu passes des heures à essayer de créer une page de vente avec des outils compliqués et le résultat ne te satisfait pas"
    },
    {
      icon: <Frown className="w-12 h-12 text-secondary-yellow" />,
      emoji: "😰",
      title: "Syndrome de l'Imposteur",
      description: "Tu ne te sens pas légitime pour vendre à des prix premium, alors que ton expertise le mérite"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, 0.01, -0.05, 0.95] as [number, number, number, number]
      }
    }
  };

  return (
    <Section background="gray" padding="xl">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl lg:text-h2-desktop font-extrabold text-neutral-black mb-4">
          Tu Crées Du Contenu Viral...
          <br />
          <span className="text-gradient">Mais Ton Compte En Banque Ne Suit Pas ? 😔</span>
        </h2>
      </motion.div>

      {/* Problem Cards Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {problems.map((problem, index) => (
          <motion.div key={index} variants={itemVariants}>
            <Card variant="hover" className="h-full">
              {/* Icon/Emoji */}
              <div className="mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-neutral-light-gray to-gray-200 rounded-2xl flex items-center justify-center text-4xl">
                  {problem.emoji}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-neutral-black mb-4">
                {problem.title}
              </h3>

              {/* Description */}
              <p className="text-neutral-medium-gray leading-relaxed">
                {problem.description}
              </p>

              {/* Decorative Line */}
              <div className="mt-6 h-1 w-16 bg-gradient-to-r from-primary-violet to-primary-blue rounded-full" />
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Additional Emphasis */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mt-16 text-center"
      >
        <p className="text-xl text-neutral-medium-gray max-w-3xl mx-auto">
          Ces problèmes sont <span className="font-bold text-neutral-black">normaux</span>, mais ils ne doivent pas <span className="font-bold text-primary-violet">t'empêcher de réussir</span>.
          Il existe une solution simple et efficace...
        </p>
      </motion.div>
    </Section>
  );
};

export default ProblemSection;
