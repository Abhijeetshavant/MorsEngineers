import React from "react";
import { motion } from "framer-motion";

const TrustSection = () => {
  // Companies with multiple reliable logo sources
  const clients = [
    {
      name: "Tata Steel",
      logo: "https://logo.clearbit.com/tatasteel.com",
      fallback:
        "https://ui-avatars.com/api/?name=Tata+Steel&background=1a233a&color=FF5722&size=80&font-size=0.4&bold=true",
    },
    {
      name: "Reliance",
      logo: "https://logo.clearbit.com/reliance.com",
      fallback:
        "https://ui-avatars.com/api/?name=Reliance&background=1a233a&color=00E5FF&size=80&font-size=0.4&bold=true",
    },
    {
      name: "Adani Group",
      logo: "https://logo.clearbit.com/adani.com",
      fallback:
        "https://ui-avatars.com/api/?name=Adani+Group&background=1a233a&color=FF5722&size=80&font-size=0.4&bold=true",
    },
    {
      name: "Larsen & Toubro",
      logo: "https://logo.clearbit.com/larsentoubro.com",
      fallback:
        "https://ui-avatars.com/api/?name=L%26T&background=1a233a&color=00E5FF&size=80&font-size=0.4&bold=true",
    },
    {
      name: "Mahindra",
      logo: "https://logo.clearbit.com/mahindra.com",
      fallback:
        "https://ui-avatars.com/api/?name=Mahindra&background=1a233a&color=FF5722&size=80&font-size=0.4&bold=true",
    },
    {
      name: "Godrej",
      logo: "https://logo.clearbit.com/godrej.com",
      fallback:
        "https://ui-avatars.com/api/?name=Godrej&background=1a233a&color=00E5FF&size=80&font-size=0.4&bold=true",
    },
    {
      name: "Siemens",
      logo: "https://logo.clearbit.com/siemens.com",
      fallback:
        "https://ui-avatars.com/api/?name=Siemens&background=1a233a&color=FF5722&size=80&font-size=0.4&bold=true",
    },
    {
      name: "BHEL",
      logo: "https://logo.clearbit.com/bhel.com",
      fallback:
        "https://ui-avatars.com/api/?name=BHEL&background=1a233a&color=00E5FF&size=80&font-size=0.4&bold=true",
    },
    {
      name: "Hindustan Unilever",
      logo: "https://logo.clearbit.com/hul.co.in",
      fallback:
        "https://ui-avatars.com/api/?name=HUL&background=1a233a&color=FF5722&size=80&font-size=0.4&bold=true",
    },
    {
      name: "BPCL",
      logo: "https://logo.clearbit.com/bharatpetroleum.com",
      fallback:
        "https://ui-avatars.com/api/?name=BPCL&background=1a233a&color=00E5FF&size=80&font-size=0.4&bold=true",
    },
    {
      name: "Hindalco",
      logo: "https://logo.clearbit.com/hindalco.com",
      fallback:
        "https://ui-avatars.com/api/?name=Hindalco&background=1a233a&color=FF5722&size=80&font-size=0.4&bold=true",
    },
    {
      name: "ACC",
      logo: "https://logo.clearbit.com/acclimited.com",
      fallback:
        "https://ui-avatars.com/api/?name=ACC&background=1a233a&color=00E5FF&size=80&font-size=0.4&bold=true",
    },
  ];

  const doubledClients = [...clients, ...clients];

  return (
    <section className="section-padding bg-dark-slate/50 border-y border-white/5">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Trusted By <span className="gradient-text">Industries</span> Across
            India
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Partnering with leading companies across manufacturing, automotive,
            pharma, and infrastructure sectors.
          </p>
        </motion.div>

        <div className="relative overflow-hidden">
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-dark-slate to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-dark-slate to-transparent z-10" />

          <motion.div
            className="flex gap-16 py-4"
            animate={{
              x: ["0%", "-50%"],
            }}
            transition={{
              duration: 35,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {doubledClients.map((client, index) => (
              <div
                key={index}
                className="flex-shrink-0 flex flex-col items-center justify-center min-w-[160px]"
              >
                <div className="w-[160px] h-[80px] flex items-center justify-center bg-dark-slate/30 rounded-xl border border-white/10 hover:border-secondary-orange/40 transition-all duration-300 group">
                  <img
                    src={client.logo}
                    alt={`${client.name} Logo`}
                    className="max-h-12 w-auto object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500 group-hover:scale-110"
                    loading="lazy"
                    onError={(e) => {
                      // If logo fails, use UI Avatars fallback
                      e.target.onerror = null;
                      e.target.src = client.fallback;
                      e.target.className =
                        "max-h-12 w-auto object-contain transition-all duration-500 group-hover:scale-110";
                    }}
                  />
                </div>
                <span className="text-xs text-text-secondary/60 mt-2 font-medium group-hover:text-text-primary transition-colors">
                  {client.name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
