import { motion } from "framer-motion";
import RSVPForm from "@/components/RSVPForm";

const Index = () => {
  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg mb-2"
          >
            You are cordially (and chaotically) invited to
          </motion.p>
          
          <h1 className="font-display text-6xl md:text-8xl text-foreground mb-4">
            <span className="squiggle-underline">The Wedding</span>
          </h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="font-display text-3xl md:text-4xl text-coral"
          >
            of Two Absolute Legends
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, type: "spring" }}
            className="mt-8 inline-block"
          >
            <div className="doodle-border rounded-lg p-4 bg-card inline-block">
              <p className="text-muted-foreground">
                Please respond so we know how many snacks to hoard
              </p>
            </div>
          </motion.div>
        </motion.header>

        {/* RSVP Form */}
        <motion.main
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="bg-card rounded-2xl p-6 md:p-10 doodle-border"
        >
          <RSVPForm />
        </motion.main>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-12 text-muted-foreground"
        >
          <p className="font-display text-xl">
            Made with questionable decisions & love 💕
          </p>
          <p className="text-sm mt-2">
            dustmodebros.me
          </p>
        </motion.footer>
      </div>
    </div>
  );
};

export default Index;
