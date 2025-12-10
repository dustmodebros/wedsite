import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import RSVPOption from "./RSVPOption";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Heart, HeartCrack } from "lucide-react";

const yesOptions = [
  "Since my investment in cheese has matured, I have sufficient capital available to escape from Somaliland, and thus will be able to attend the wedding.",
  "yes option 2 Lorem ipsum dolor sit amet, consecteur adipiscing elit.",
  "yes option 3 Lorem ipsum dolor sit amet, consecteur adipiscing elit.",
  "yes option 4 Lorem ipsum dolor sit amet, consecteur adipiscing elit.",
  "yes option 5 Lorem ipsum dolor sit amet, consecteur adipiscing elit.",
  "yes option 6 Lorem ipsum dolor sit amet, consecteur adipiscing elit.",
];

const noOptions = [
  "My raccoon is scheduled to contract hepatitis on that day so I am sadly unable to attend.",
  "no option 2 Lorem ipsum dolor sit amet, consecteur adipiscing elit.",
  "no option 3 Lorem ipsum dolor sit amet, consecteur adipiscing elit.",
  "no option 4 Lorem ipsum dolor sit amet, consecteur adipiscing elit.",
  "no option 5 Lorem ipsum dolor sit amet, consecteur adipiscing elit.",
  "no option 6 Lorem ipsum dolor sit amet, consecteur adipiscing elit.",
];

const RSVPForm = () => {
  const [name, setName] = useState("");
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [responseType, setResponseType] = useState<"yes" | "no" | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  // Debug: Check if environment variable is loaded on mount
  useEffect(() => {
    const googleSheetsUrl = import.meta.env.VITE_GOOGLE_SHEETS_URL;
    const logToTerminal = async (message: string, data?: any) => {
      try {
        await fetch('/api/rsvp-log', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message, data, timestamp: new Date().toISOString() }),
        });
      } catch (e) {
        // Silently fail - this is just for debugging
      }
    };
    
    console.log('🔧 Component mounted. Google Sheets URL configured?', !!googleSheetsUrl);
    if (googleSheetsUrl) {
      console.log('✅ URL found:', googleSheetsUrl.substring(0, 50) + '...');
      logToTerminal('🔧 RSVP Form Component Loaded', { 
        urlConfigured: true,
        urlPreview: googleSheetsUrl.substring(0, 50) + '...'
      });
    } else {
      console.warn('⚠️ URL not found. Make sure:');
      console.warn('  1. .env file exists with VITE_GOOGLE_SHEETS_URL=...');
      console.warn('  2. Dev server was restarted after creating .env');
      logToTerminal('⚠️ RSVP Form Component Loaded - URL NOT configured', {
        urlConfigured: false
      });
    }
  }, []);

  const handleOptionSelect = (option: string, type: "yes" | "no") => {
    setSelectedOption(option);
    setResponseType(type);
  };

  const validateName = (nameValue: string): boolean => {
    const trimmedName = nameValue.trim();
    
    // Check if name starts with "="
    if (trimmedName.startsWith('=')) {
      return false;
    }
    
    // Check if name contains a URL/link
    // Match common URL patterns: http://, https://, www., or domain patterns like .com, .org, etc.
    const urlPattern = /(https?:\/\/|www\.|[a-zA-Z0-9-]+\.[a-zA-Z]{2,})/i;
    if (urlPattern.test(trimmedName)) {
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Helper to log to terminal via Vite dev server
    const logToTerminal = async (message: string, data?: any) => {
      try {
        await fetch('/api/rsvp-log', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message, data, timestamp: new Date().toISOString() }),
        });
      } catch (e) {
        // Silently fail - this is just for debugging
      }
    };
    
    await logToTerminal('🚀 RSVP Form Submitted!');
    console.log('🚀 Form submitted!');
    
    if (!name.trim()) {
      console.log('❌ Validation failed: name is empty');
      toast({
        title: "Whoa there, mysterious stranger!",
        description: "We need your name so we know who to save a seat for!",
        variant: "destructive",
      });
      return;
    }

    // Validate name for security (prevent formula injection and links)
    if (!validateName(name)) {
      console.log('❌ Validation failed: name contains invalid characters');
      toast({
        title: "Nice try",
        description: "are you really trying to pen-test a wedding RSVP form...? I admire your commitment!",
        variant: "destructive",
      });
      return;
    }

    if (!selectedOption) {
      console.log('❌ Validation failed: no option selected');
      toast({
        title: "Pick your response!",
        description: "Choose one of the options above.",
        variant: "destructive",
      });
      return;
    }

    await logToTerminal('✅ Validation passed, starting submission...');
    console.log('✅ Validation passed, starting submission...');
    setIsSubmitting(true);

    try {
      // Send data to Google Sheets - exactly matching test-rsvp.js
      const googleSheetsUrl = import.meta.env.VITE_GOOGLE_SHEETS_URL;
      
      await logToTerminal('🔍 Checking Google Sheets URL...', { 
        urlExists: !!googleSheetsUrl,
        urlPreview: googleSheetsUrl ? googleSheetsUrl.substring(0, 50) + '...' : 'undefined'
      });
      console.log('🔍 Checking Google Sheets URL...');
      console.log('URL exists?', !!googleSheetsUrl);
      console.log('URL value:', googleSheetsUrl ? googleSheetsUrl.substring(0, 50) + '...' : 'undefined');
      
      if (!googleSheetsUrl || googleSheetsUrl === 'your_web_app_url_here') {
        await logToTerminal('⚠️ Google Sheets URL not configured', { 
          name: name.trim(), 
          responseType, 
          selectedOption 
        });
        console.warn('⚠️ Google Sheets URL not configured. Set VITE_GOOGLE_SHEETS_URL in .env file');
        console.log('RSVP Response (not saved):', { name: name.trim(), responseType, selectedOption });
        // Continue without saving - don't block the user experience
      } else {
        // Prepare data exactly like test script
        const rsvpData = {
          name: name.trim(),
          responseType,
          selectedOption,
        };

        await logToTerminal('📤 Sending RSVP data to Google Sheets', rsvpData);
        console.log('📤 Sending RSVP data:', rsvpData);
        console.log('🔗 URL:', googleSheetsUrl);
        
        // Google Apps Script often blocks CORS; always use no-cors to ensure data sends.
        try {
          await fetch(googleSheetsUrl, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(rsvpData),
          });

          await logToTerminal('✅ RSVP sent (no-cors mode - cannot verify response)');
          console.log('✅ RSVP sent using no-cors mode');
          console.log('⚠️ Cannot verify response due to CORS, but data should be saved');
          console.log('💡 Check your Google Sheet to confirm the entry was added');
        } catch (noCorsError) {
          await logToTerminal('❌ Failed to send RSVP (no-cors)', { error: String(noCorsError) });
          throw noCorsError;
        }
      }
    } catch (error) {
      await logToTerminal('❌ Failed to send RSVP data', { 
        error: error instanceof Error ? error.message : String(error) 
      });
      console.error('❌ Failed to send RSVP data:', error);
      console.error('Error details:', error instanceof Error ? error.message : String(error));
      toast({
        title: "Oops!",
        description: "There seems to have been an error and we couldn't save your response, please try again or contact us directly.",
        variant: "destructive",
      });
      // Continue anyway - don't block the user experience
    }

    if (responseType === "yes") {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#e07850", "#5d9a7d", "#d4849a"],
      });
      toast({
        title: "Yippee! 🎉",
        description: "We're so excited to have you there!",
      });
    } else {
      toast({
        title: "We understand... 💔",
        description: "We'll save you some cake in spirit!",
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
              We're absolutely thrilled you're coming!
            </p>
          </>
        ) : (
          <>
            <HeartCrack className="w-24 h-24 mx-auto text-blush animate-float" />
            <h2 className="font-display text-5xl mt-6 text-foreground">
              We'll miss you, {name}!
            </h2>
            <p className="text-muted-foreground mt-4 text-lg">
              That's a shame. Hope to see you soon!
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
          Submit another response
        </Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-2">
        <label htmlFor="name" className="font-display text-2xl text-foreground">
          Who might you be?
        </label>
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="Someone interesting, we hope:"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="text-lg py-6 bg-card"
          autoComplete="name"
          maxLength={100}
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
            Alas, I cannot, because...
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
              {isSubmitting ? "Submitting..." : "Submit My Response"}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
};

export default RSVPForm;
