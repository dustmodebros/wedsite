import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import RSVPOption from "./RSVPOption";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Heart, HeartCrack } from "lucide-react";

const yesOptions = [
  "Since my investment in cheese has matured, I have sufficient capital available to escape from Somaliland, and thus will be able to attend the wedding.",
  "My parole officer has granted me a 24-hour furlough, so count me in!",
  "I've successfully bribed the ducks blocking my driveway. I'll be there!",
  "The prophecy has been fulfilled. The stars align. I shall attend.",
  "My time machine repair is complete, and I have confirmed via future-me that I was indeed present. See you there!",
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
        title: "Whoa there, mysterious stranger!",
        description: "We need your name so we know whose plate to lick... er, set.",
        variant: "destructive",
      });
      return;
    }

    if (!selectedOption) {
      toast({
        title: "Pick your destiny!",
        description: "Choose one of the ridiculous options above.",
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
        colors: ["#e07850", "#5d9a7d", "#d4849a"],
      });
      toast({
        title: "HUZZAH! 🎉",
        description: "Your presence has been noted in the sacred scrolls of attendance.",
      });
    } else {
      toast({
        title: "We understand... 💔",
        description: "Your raccoon's health comes first. We'll save you some cake in spirit.",
      });
    }

    setHasSubmitted(true);
    setIsSubmitting(false);
  };

  if (hasSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        {responseType === "yes" ? (
          <>
            <Heart className="w-24 h-24 mx-auto text-coral animate-float" />
            <h2 className="font-display text-5xl mt-6 text-foreground">
              See you there, {name}!
            </h2>
            <p className="text-muted-foreground mt-4 text-lg">
              We're absolutely thrilled you're coming. Don't forget to bring your escaped-from-Somaliland vibes!
            </p>
          </>
        ) : (
          <>
            <HeartCrack className="w-24 h-24 mx-auto text-blush animate-float" />
            <h2 className="font-display text-5xl mt-6 text-foreground">
              We'll miss you, {name}!
            </h2>
            <p className="text-muted-foreground mt-4 text-lg">
              We hope your raccoon makes a full recovery. You'll be there in spirit! 🦝
            </p>
          </>
        )}
        <Button
          variant="outline"
          className="mt-8"
          onClick={() => {
            setHasSubmitted(false);
            setName("");
            setSelectedOption(null);
            setResponseType(null);
          }}
        >
          Submit another response (for a friend who definitely exists)
        </Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-2">
        <label htmlFor="name" className="font-display text-2xl text-foreground">
          Who art thou?
        </label>
        <Input
          id="name"
          type="text"
          placeholder="Your name (or alias, we don't judge)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="text-lg py-6 bg-card"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Yes Options */}
        <div className="space-y-4">
          <h3 className="font-display text-3xl text-sage flex items-center gap-2">
            <Heart className="w-6 h-6" />
            I shall attend!
          </h3>
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
        <div className="space-y-4">
          <h3 className="font-display text-3xl text-blush flex items-center gap-2">
            <HeartCrack className="w-6 h-6" />
            Alas, I cannot...
          </h3>
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
            className="flex justify-center pt-4"
          >
            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="font-display text-2xl px-12 py-6 bg-primary hover:bg-primary/90"
            >
              {isSubmitting ? "Consulting the oracle..." : "Submit My Fate"}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
};

export default RSVPForm;
