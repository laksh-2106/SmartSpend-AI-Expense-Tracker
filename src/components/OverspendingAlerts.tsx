import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, TrendingUp } from "lucide-react";
import { Expense, CategoryBudget, defaultBudgets, getOverspendingAlerts, categoryLabels, categoryIcons } from "@/lib/expense-data";
import { Progress } from "@/components/ui/progress";

interface OverspendingAlertsProps {
  expenses: Expense[];
  budgets?: CategoryBudget[];
}

export function OverspendingAlerts({ expenses, budgets }: OverspendingAlertsProps) {
  const alerts = getOverspendingAlerts(expenses, budgets || defaultBudgets);

  if (alerts.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="glass-card p-5 border-warning/30"
    >
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle className="h-4 w-4 text-warning animate-pulse-glow" />
        <h2 className="text-sm font-semibold text-warning uppercase tracking-wider">Overspending Alerts</h2>
      </div>
      <AnimatePresence>
        <div className="space-y-3">
          {alerts.map((alert, i) => (
            <motion.div
              key={alert.category}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col gap-1.5"
            >
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-1.5">
                  <span>{categoryIcons[alert.category]}</span>
                  <span className="text-foreground font-medium">{categoryLabels[alert.category]}</span>
                </span>
                <span className={alert.percent >= 100 ? "text-destructive font-semibold" : "text-warning font-medium"}>
                  ${alert.spent.toFixed(0)} / ${alert.budget}
                </span>
              </div>
              <div className="relative">
                <Progress
                  value={Math.min(alert.percent, 100)}
                  className="h-1.5 bg-secondary"
                />
                {alert.percent >= 100 && (
                  <div className="absolute right-0 -top-0.5 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3 text-destructive" />
                    <span className="text-[10px] text-destructive font-bold">{alert.percent.toFixed(0)}%</span>
                  </div>
                )}
              </div>
              {alert.percent >= 100 && (
                <p className="text-xs text-destructive/80">
                  ⚠️ You're overspending here! ${(alert.spent - alert.budget).toFixed(0)} over budget.
                </p>
              )}
              {alert.percent >= 80 && alert.percent < 100 && (
                <p className="text-xs text-warning/80">
                  ⚡ Approaching limit — ${(alert.budget - alert.spent).toFixed(0)} remaining.
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </AnimatePresence>
    </motion.div>
  );
}
