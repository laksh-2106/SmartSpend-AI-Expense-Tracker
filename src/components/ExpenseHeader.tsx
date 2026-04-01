import { motion } from "framer-motion";
import { Brain, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ExpenseHeaderProps {
  onAddClick: () => void;
}

export function ExpenseHeader({ onAddClick }: ExpenseHeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-between py-6"
    >
      <div className="flex items-center gap-3">
        <div className="gradient-primary p-2.5 rounded-xl glow-primary">
          <Brain className="h-6 w-6 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-2xl font-bold font-display gradient-text">SmartSpend</h1>
          <p className="text-xs text-muted-foreground">AI-Powered Expense Tracker</p>
        </div>
      </div>
      <Button onClick={onAddClick} size="sm" className="gradient-primary text-primary-foreground font-semibold gap-1.5 glow-primary">
        <Plus className="h-4 w-4" />
        Add Expense
      </Button>
    </motion.header>
  );
}
