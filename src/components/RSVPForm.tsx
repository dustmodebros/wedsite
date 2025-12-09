import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import RSVPOption from "./RSVPOption";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const yesOptions = [
  "Since my investment in cheese has matured, I have sufficient capital available to escape from Somaliland, and thus will be able to attend the wedding.",
  "My parole officer has granted me a 24-hour furlough, so count me in.",
  "I've successfully bribed the ducks blocking my driveway. I shall be in attendance.",
  "The prophecy has been fulfilled. The stars align. I shall attend.",
  "My time machine repair is complete, and I have confirmed via future-me that I was indeed present.",
  "I've concluded my negotiations with the squirrel mafia. Wedding attendance: approved.",
];

const noOptions = [
  "My raccoon is scheduled to contract hepatitis on that day so I am sadly unable to attend.",
  "I am legally obligated to supervise my houseplant's therapy session that weekend.",
  "The Council of Elders has denied my travel permit to the realm of matrimony.",
  "I'm stuck in an infinite loop of answering wedding RSVPs and cannot attend any actual weddings.",
  "My evil twin has already RSVP'd yes and we cannot both be in the same place due to the laws of physics.",
  "I've been chosen to guard the sacred sandwich. My duty is clear.",
];

const RSVPForm = () => {
  const [name, setName] = useState("");
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [responseType, setResponseType] = useState<"yes" | "no" | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleOptionSelect = (option: string, type: "yes" | "no") => {
    setSelectedOption(option);
    setResponseType(type);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast({
        title: "A Name is Required",
        description: "We must know how to address you in the registry.",
        variant: "destructive",
      });
      return;
    }

    if (!selectedOption) {
      toast({
        title: "Please Select Your Response",
        description: "Kindly choose one of the distinguished options above.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call - will be replaced with Supabase later
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (responseType === "yes") {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#d4a853", "#f0d78c", "#a68932"],
      });
      toast({
        title: "Most Excellent",
        description: "Your attendance has been recorded in the official registry.",
      });
    } else {
      toast({
        title: "We Understand",
        description: "Your regrets have been noted with appropriate solemnity.",
      });
    }

    setHasSubmitted(true);
    setIsSubmitting(false);
  };

  if (hasSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-16"
      >
        {responseType === "yes" ? (
          <>
            <span className="font-script text-6xl text-gold gold-glow">❦</span>
            <h2 className="font-display text-3xl md:text-4xl mt-8 gold-shimmer">
              We Await Your Arrival
            </h2>
            <p className="font-heading text-lg text-muted-foreground mt-6 max-w-md mx-auto leading-relaxed">
              {name}, your presence shall grace our celebration.
            </p>
          </>
        ) : (
          <>
            <span className="font-script text-6xl text-muted-foreground">❦</span>
            <h2 className="font-display text-3xl md:text-4xl mt-8 text-foreground">
              You Shall Be Missed
            </h2>
            <p className="font-heading text-lg text-muted-foreground mt-6 max-w-md mx-auto leading-relaxed">
              {name}, we understand. Your spirit shall be with us.
            </p>
          </>
        )}
        <Button
          variant="outline"
          className="mt-10 font-heading text-xs tracking-wide-formal uppercase border-gold/50 text-gold hover:bg-gold/10 hover:text-gold"
          onClick={() => {
            setHasSubmitted(false);
            setName("");
            setSelectedOption(null);
            setResponseType(null);
          }}
        >
          Submit Another Response
        </Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      <div className="space-y-4 text-center">
        <label htmlFor="name" className="font-display text-xl md:text-2xl gold-shimmer block">
          Your Distinguished Name
        </label>
        <Input
          id="name"
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="text-center font-heading text-lg py-6 bg-background border-border/50 focus:border-gold max-w-md mx-auto"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Yes Options */}
        <div className="space-y-6">
          <h3 className="font-display text-xl md:text-2xl text-gold text-center tracking-wide">
            I Shall Attend
          </h3>
          <div className="divider mb-6">
            <span className="font-script text-lg text-gold px-2">✦</span>
          </div>
          <div className="space-y-3">
            {yesOptions.map((option) => (
              <RSVPOption
                key={option}
                text={option}
                type="yes"
                selected={selectedOption === option}
                onClick={() => handleOptionSelect(option, "yes")}
              />
            ))}
          </div>
        </div>

        {/* No Options */}
        <div className="space-y-6">
          <h3 className="font-display text-xl md:text-2xl text-muted-foreground text-center tracking-wide">
            Regretfully, I Cannot
          </h3>
          <div className="divider mb-6">
            <span className="font-script text-lg text-muted-foreground px-2">✦</span>
          </div>
          <div className="space-y-3">
            {noOptions.map((option) => (
              <RSVPOption
                key={option}
                text={option}
                type="no"
                selected={selectedOption === option}
                onClick={() => handleOptionSelect(option, "no")}
              />
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedOption && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="flex justify-center pt-6"
          >
            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="font-heading text-sm tracking-wide-formal uppercase px-12 py-6 bg-gold text-charcoal hover:bg-gold/90 border-0"
            >
              {isSubmitting ? "Recording..." : "Confirm Response"}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
};

export default RSVPForm;
