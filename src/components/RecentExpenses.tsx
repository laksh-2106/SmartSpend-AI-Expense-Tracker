import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import { Expense, categoryIcons, categoryLabels } from "@/lib/expense-data";
import { Button } from "@/components/ui/button";

interface RecentExpensesProps {
  expenses: Expense[];
  onDelete: (id: string) => void;
}

export function RecentExpenses({ expenses, onDelete }: RecentExpensesProps) {
  const sorted = [...expenses].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 10);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="glass-card p-5"
    >
      <h2 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wider">Recent Expenses</h2>
      <div className="space-y-1">
        {sorted.map((expense, i) => (
          <motion.div
            key={expense.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.05 * i }}
            className="flex items-center justify-between py-2.5 px-2 rounded-lg hover:bg-secondary/40 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <span className="text-lg">{categoryIcons[expense.category]}</span>
              <div>
                <p className="text-sm font-medium">{expense.description}</p>
                <p className="text-xs text-muted-foreground">{categoryLabels[expense.category]} · {expense.date}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold font-display">-${expense.amount.toFixed(2)}</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
                onClick={() => onDelete(expense.id)}
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
