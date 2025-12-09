import { motion } from "framer-motion";
import RSVPForm from "@/components/RSVPForm";

const Index = () => {
  return (
    <div className="min-h-screen bg-background py-16 px-4">
      <div className="max-w-3xl mx-auto">
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
            className="font-body text-sm tracking-widest uppercase text-muted-foreground mb-6"
          >
            The Honour of Your Presence is Requested
          </motion.p>
          
          <h1 className="font-display text-5xl md:text-7xl text-foreground mb-6 tracking-tight">
            Wedding Invitation
          </h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="font-display text-2xl md:text-3xl text-gold italic"
          >
            A Most Distinguished Affair
          </motion.p>

          <div className="divider my-10" />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="font-body text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed"
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
          className="bg-card p-8 md:p-12 formal-border"
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
          <p className="font-body text-sm tracking-widest uppercase text-muted-foreground">
            dustmodebros.me
          </p>
        </motion.footer>
      </div>
    </div>
  );
};

export default Index;
