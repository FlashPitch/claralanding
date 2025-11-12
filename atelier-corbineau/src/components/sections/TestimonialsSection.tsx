import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Sarah M.",
      role: "Coach nutrition - 45K abonnés",
      avatar: "👩‍💼",
      rating: 5,
      text: "J'avais 45 000 abonnés sur Instagram mais je ne vendais rien. Depuis que j'ai mon tunnel d'Atelier Corbineau, je fais 8 000€/mois en vente de programmes. Le ROI a été immédiat !",
      result: "+8K€/mois",
      resultColor: "from-secondary-green to-green-600"
    },
    {
      name: "Lucas D.",
      role: "Coach fitness - 120K TikTok",
      avatar: "👨‍🏫",
      rating: 5,
      text: "La landing page est tellement bien faite que mon taux de conversion est passé de 1% à 7%. L'équipe a compris exactement ce dont j'avais besoin. Process ultra pro !",
      result: "x7 conversions",
      resultColor: "from-primary-blue to-blue-600"
    },
    {
      name: "Emma L.",
      role: "Formatrice marketing",
      avatar: "👩‍💻",
      rating: 5,
      text: "J'ai enfin une page de vente qui me représente vraiment. Le design est moderne, ça charge vite, et surtout : ça convertit. En 3 semaines j'ai récupéré mon investissement !",
      result: "ROI en 3 semaines",
      resultColor: "from-primary-orange to-orange-600"
    }
  ];

  return (
    <Section background="white" padding="xl" id="social-proof">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl lg:text-h2-desktop font-extrabold text-neutral-black mb-4">
          Ils Ont Transformé Leur Audience
          <br />
          <span className="text-gradient">en Business Rentable</span>
        </h2>
      </motion.div>

      {/* Testimonials Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
          >
            <Card variant="hover" className="h-full relative overflow-hidden">
              {/* Quote Icon */}
              <div className="absolute top-4 right-4 opacity-10">
                <Quote className="w-16 h-16 text-primary-violet" />
              </div>

              {/* Avatar & Info */}
              <div className="relative mb-6">
                {/* Polaroid-style frame */}
                <div className="inline-block bg-white shadow-lg p-2 rotate-[-2deg] hover:rotate-0 transition-transform">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary-violet to-primary-blue rounded-lg flex items-center justify-center text-4xl">
                    {testimonial.avatar}
                  </div>
                </div>

                <div className="mt-4">
                  <h4 className="text-xl font-bold text-neutral-black">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-neutral-medium-gray">
                    {testimonial.role}
                  </p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-secondary-yellow text-secondary-yellow" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-neutral-black leading-relaxed mb-6 relative z-10">
                "{testimonial.text}"
              </p>

              {/* Result Badge */}
              <div className={`inline-block bg-gradient-to-r ${testimonial.resultColor} text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg`}>
                ✨ {testimonial.result}
              </div>

              {/* Decorative Element */}
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-gradient-to-br from-primary-violet/10 to-primary-blue/10 rounded-full blur-2xl" />
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Stats Bar */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
      >
        {[
          { number: "50+", label: "Créateurs accompagnés" },
          { number: "4.9/5", label: "Note moyenne" },
          { number: "7j", label: "Délai de livraison" },
          { number: "100%", label: "Clients satisfaits" }
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 + index * 0.1 }}
            className="text-center"
          >
            <div className="text-3xl md:text-4xl font-black text-gradient mb-2 font-accent">
              {stat.number}
            </div>
            <div className="text-sm text-neutral-medium-gray">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Trust Elements */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1 }}
        className="mt-16 text-center"
      >
        <p className="text-neutral-medium-gray mb-4">Ils nous font confiance :</p>
        <div className="flex flex-wrap justify-center gap-8 items-center opacity-60">
          {["Instagram", "TikTok", "YouTube", "LinkedIn"].map((platform, i) => (
            <div key={i} className="text-2xl font-bold text-neutral-dark-gray">
              {platform}
            </div>
          ))}
        </div>
      </motion.div>
    </Section>
  );
};

export default TestimonialsSection;
