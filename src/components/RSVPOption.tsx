import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface RSVPOptionProps {
  text: string;
  type: "yes" | "no";
  selected: boolean;
  onClick: () => void;
}

const RSVPOption = ({ text, type, selected, onClick }: RSVPOptionProps) => {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className={cn(
        "w-full p-5 text-left border transition-all duration-300",
        "font-heading text-sm leading-relaxed tracking-wide",
        selected
          ? "border-gold bg-gold/10 shadow-[0_0_20px_hsl(45_90%_55%/0.2)]"
          : "border-border/50 bg-card/50 hover:border-gold/50 hover:bg-gold/5"
      )}
    >
      <span className={cn(
        "text-foreground/80",
        selected && "text-gold"
      )}>
        {text}
      </span>
    </motion.button>
  );
};

export default RSVPOption;
