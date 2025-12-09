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
      whileHover={{ scale: 1.02, rotate: type === "yes" ? 1 : -1 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "w-full p-4 text-left rounded-lg doodle-border transition-colors duration-200",
        "font-body text-base leading-relaxed",
        selected
          ? type === "yes"
            ? "bg-secondary/20 border-secondary"
            : "bg-accent/20 border-accent"
          : "bg-card hover:bg-cream-dark",
        selected && "border-solid border-2"
      )}
    >
      <span className={cn(
        selected && type === "yes" && "text-sage font-medium",
        selected && type === "no" && "text-blush font-medium"
      )}>
        {text}
      </span>
    </motion.button>
  );
};

export default RSVPOption;
