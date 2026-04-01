import { useState } from "react";
import { motion } from "framer-motion";
import { Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Category, CategoryBudget, categoryLabels, categoryIcons } from "@/lib/expense-data";

interface BudgetEditorProps {
  budgets: CategoryBudget[];
  onSave: (budgets: CategoryBudget[]) => void;
}

export function BudgetEditor({ budgets, onSave }: BudgetEditorProps) {
  const [open, setOpen] = useState(false);
  const [edited, setEdited] = useState<CategoryBudget[]>(budgets);

  const handleChange = (category: Category, value: string) => {
    setEdited((prev) =>
      prev.map((b) => (b.category === category ? { ...b, budget: parseFloat(value) || 0 } : b))
    );
  };

  const handleSave = () => {
    onSave(edited);
    setOpen(false);
  };

  if (!open) {
    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => { setEdited(budgets); setOpen(true); }}
        className="text-muted-foreground hover:text-foreground gap-1.5"
      >
        <Settings2 className="h-4 w-4" />
        Edit Budgets
      </Button>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="glass-card p-5"
    >
      <h2 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wider">Monthly Budgets</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {edited.map((b) => (
          <div key={b.category} className="flex flex-col gap-1">
            <label className="text-xs text-muted-foreground flex items-center gap-1">
              {categoryIcons[b.category]} {categoryLabels[b.category]}
            </label>
            <Input
              type="number"
              value={b.budget}
              onChange={(e) => handleChange(b.category, e.target.value)}
              className="bg-secondary/50 border-border/50 h-9"
            />
          </div>
        ))}
      </div>
      <div className="flex gap-2 mt-4">
        <Button onClick={handleSave} size="sm" className="gradient-primary text-primary-foreground font-semibold">
          Save Budgets
        </Button>
        <Button onClick={() => setOpen(false)} variant="ghost" size="sm" className="text-muted-foreground">
          Cancel
        </Button>
      </div>
    </motion.div>
  );
}
