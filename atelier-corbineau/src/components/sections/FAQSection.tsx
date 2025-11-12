import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import Section from '@/components/ui/Section';

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Combien de temps prend la création du tunnel ?",
      answer: "Pack Creator Pro : 7 jours ouvrés. Pack Creator Empire : 14 jours ouvrés. Délais garantis dès réception du brief complet."
    },
    {
      question: "Qu'est-ce qui est inclus exactement dans le design ?",
      answer: "Design moderne et responsive, aux couleurs de ta marque, avec animations subtiles. Tu fournis ton logo et tes couleurs (ou on t'aide à les définir), on crée le reste."
    },
    {
      question: "Je n'ai aucune compétence technique, je peux quand même gérer ma page après ?",
      answer: "Absolument ! On te fournit des tutoriels vidéo personnalisés et 30 jours de support. La plateforme Lovable est très intuitive."
    },
    {
      question: "Est-ce que je peux modifier ma landing page après livraison ?",
      answer: "Oui ! Le Pack Pro inclut 1 modification majeure, le Pack Empire en inclut 3. Tu peux aussi acheter des modifications supplémentaires à l'unité."
    },
    {
      question: "Quels moyens de paiement puis-je intégrer ?",
      answer: "Stripe (cartes bancaires, Apple Pay, Google Pay) est inclus. On peut aussi intégrer PayPal ou d'autres solutions selon tes besoins."
    },
    {
      question: "Ma landing page sera-t-elle optimisée SEO ?",
      answer: "Oui, on optimise les bases SEO (meta-tags, vitesse, structure). Pour un SEO avancé, c'est une prestation complémentaire."
    },
    {
      question: "Puis-je voir des exemples avant de commander ?",
      answer: "Oui ! Contacte-nous sur Instagram @ateliercorbineau ou par mail pour voir notre portfolio de tunnels créés."
    },
    {
      question: "Quelle est votre garantie ?",
      answer: "Si tu n'es pas satisfait(e) du rendu, on s'engage à faire jusqu'à 2 itérations complètes jusqu'à ce que ça te plaise. Ta satisfaction est notre priorité."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Section background="gray" padding="xl" className="bg-gradient-to-b from-gray-50 to-white">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl lg:text-h2-desktop font-extrabold text-neutral-black mb-4">
          Questions Fréquentes
        </h2>
        <p className="text-xl text-neutral-medium-gray">
          Tout ce que tu dois savoir avant de te lancer
        </p>
      </motion.div>

      {/* FAQ Accordion */}
      <div className="max-w-4xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
          >
            <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden">
              {/* Question Button */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="text-lg font-bold text-neutral-black pr-8">
                  {faq.question}
                </span>

                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  {openIndex === index ? (
                    <div className="w-8 h-8 bg-primary-violet text-white rounded-full flex items-center justify-center">
                      <Minus className="w-5 h-5" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 bg-neutral-light-gray text-neutral-black rounded-full flex items-center justify-center">
                      <Plus className="w-5 h-5" />
                    </div>
                  )}
                </motion.div>
              </button>

              {/* Answer */}
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 pt-2">
                      <div className="border-t border-gray-200 pt-4">
                        <p className="text-neutral-medium-gray leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA Below FAQ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="mt-16 text-center"
      >
        <div className="bg-gradient-to-r from-primary-violet/10 to-primary-blue/10 rounded-2xl p-8 max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold text-neutral-black mb-3">
            Tu as d'autres questions ?
          </h3>
          <p className="text-neutral-medium-gray mb-6">
            Notre équipe est là pour répondre à toutes tes interrogations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:contact@ateliercorbineau.fr"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary-blue text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors"
            >
              📧 Envoyer un email
            </a>
            <a
              href="https://instagram.com/ateliercorbineau"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              📱 Instagram DM
            </a>
          </div>
        </div>
      </motion.div>
    </Section>
  );
};

export default FAQSection;
