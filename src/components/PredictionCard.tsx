import { motion } from "framer-motion";
import { TrendingUp, Zap } from "lucide-react";
import { Expense, getPrediction, getMonthlyTotal } from "@/lib/expense-data";

interface PredictionCardProps {
  expenses: Expense[];
}

export function PredictionCard({ expenses }: PredictionCardProps) {
  const prediction = getPrediction(expenses);
  const total = getMonthlyTotal(expenses);
  const projectedIncrease = prediction.predictedTotal - total;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="glass-card p-5 glow-primary"
    >
      <div className="flex items-center gap-2 mb-4">
        <Zap className="h-4 w-4 text-primary" />
        <h2 className="text-sm font-semibold text-primary uppercase tracking-wider">AI Prediction</h2>
      </div>
      <div className="space-y-4">
        <div>
          <p className="text-3xl font-bold font-display gradient-text">
            ${prediction.predictedTotal.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
          </p>
          <p className="text-xs text-muted-foreground mt-1">Predicted end-of-month total</p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-secondary/50 rounded-lg p-3">
            <p className="text-xs text-muted-foreground">Daily Burn Rate</p>
            <p className="text-lg font-semibold font-display">${prediction.dailyAvg.toFixed(0)}</p>
          </div>
          <div className="bg-secondary/50 rounded-lg p-3">
            <p className="text-xs text-muted-foreground">Projected Additional</p>
            <p className="text-lg font-semibold font-display flex items-center gap-1">
              <TrendingUp className="h-3.5 w-3.5 text-warning" />
              ${projectedIncrease.toFixed(0)}
            </p>
          </div>
        </div>
        <div className="bg-secondary/30 rounded-lg p-3 border border-border/30">
          <p className="text-xs text-muted-foreground flex items-center gap-1.5">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary animate-pulse-glow" />
            AI Insight
          </p>
          <p className="text-sm mt-1 text-foreground/80">
            {prediction.dailyAvg > 100
              ? "Your daily spending is high. Consider cutting back on non-essentials to stay within budget."
              : prediction.dailyAvg > 60
              ? "Moderate spending pace. You're on track but watch entertainment & dining categories."
              : "Great spending habits! You're well within your typical monthly range."}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
