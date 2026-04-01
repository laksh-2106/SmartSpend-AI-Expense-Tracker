import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Category, categoryLabels, categoryIcons, autoCategorize, generateId, Expense } from "@/lib/expense-data";

interface AddExpenseDialogProps {
  open: boolean;
  onClose: () => void;
  onAdd: (expense: Expense) => void;
}

export function AddExpenseDialog({ open, onClose, onAdd }: AddExpenseDialogProps) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState<Category>("shopping");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [autoDetected, setAutoDetected] = useState(false);

  useEffect(() => {
    if (description.length > 2) {
      const detected = autoCategorize(description);
      if (detected !== category) {
        setCategory(detected);
        setAutoDetected(true);
        setTimeout(() => setAutoDetected(false), 2000);
      }
    }
  }, [description]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !amount) return;
    onAdd({
      id: generateId(),
      description,
      amount: parseFloat(amount),
      category,
      date,
    });
    setDescription("");
    setAmount("");
    setCategory("shopping");
    onClose();
  };

  const categories: Category[] = ["food", "transport", "entertainment", "shopping", "bills", "health"];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="glass-card p-6 w-full max-w-md relative z-10 glow-primary"
          >
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold font-display">Add Expense</h2>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label className="text-xs text-muted-foreground">Description</Label>
                <Input
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g., Starbucks coffee"
                  className="mt-1 bg-secondary/50 border-border/50"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs text-muted-foreground">Amount ($)</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="mt-1 bg-secondary/50 border-border/50"
                  />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Date</Label>
                  <Input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="mt-1 bg-secondary/50 border-border/50"
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <Label className="text-xs text-muted-foreground">Category</Label>
                  {autoDetected && (
                    <motion.span
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-[10px] text-primary flex items-center gap-1 font-medium"
                    >
                      <Sparkles className="h-3 w-3" /> Auto-detected
                    </motion.span>
                  )}
                </div>
                <Select value={category} onValueChange={(v) => setCategory(v as Category)}>
                  <SelectTrigger className="mt-1 bg-secondary/50 border-border/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {categoryIcons[cat]} {categoryLabels[cat]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full gradient-primary text-primary-foreground font-semibold glow-primary">
                Add Expense
              </Button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
