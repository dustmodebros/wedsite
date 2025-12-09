import { motion } from "framer-motion";
import RSVPForm from "@/components/RSVPForm";

const Index = () => {
  return (
    <div className="min-h-screen bg-background py-20 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Decorative Top */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="text-center mb-8"
        >
          <span className="font-script text-5xl md:text-6xl text-gold gold-glow animate-float inline-block">
            ✦
          </span>
        </motion.div>

        {/* Header */}
        <motion.header
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="text-center mb-16"
        >
          <div className="ornament mb-8" />
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="font-heading text-xs md:text-sm tracking-wide-formal uppercase text-muted-foreground mb-8"
          >
            The Honour of Your Presence is Requested
          </motion.p>
          
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl gold-shimmer mb-6 tracking-wide leading-tight">
            Wedding Invitation
          </h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="font-script text-3xl md:text-5xl text-gold gold-glow"
          >
            A Most Distinguished Affair
          </motion.p>

          <div className="divider my-12">
            <span className="font-script text-2xl text-gold px-4">❦</span>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="font-heading text-base md:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed tracking-wide"
          >
            Your timely response is respectfully requested, that we may ensure 
            adequate provisions for all distinguished guests.
          </motion.p>
        </motion.header>

        {/* RSVP Form */}
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="bg-card p-8 md:p-14 formal-border-double"
        >
          <RSVPForm />
        </motion.main>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-center mt-16"
        >
          <div className="ornament mb-6" />
          <p className="font-script text-2xl text-gold gold-glow mb-2">
            With Warmest Regards
          </p>
          <p className="font-heading text-xs tracking-wide-formal uppercase text-muted-foreground">
            dustmodebros.me
          </p>
        </motion.footer>
      </div>
    </div>
  );
};

export default Index;
