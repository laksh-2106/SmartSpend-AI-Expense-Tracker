import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, DollarSign, Calendar } from "lucide-react";
import { Expense, getMonthlyTotal, getPrediction } from "@/lib/expense-data";

interface OverviewCardsProps {
  expenses: Expense[];
}

export function OverviewCards({ expenses }: OverviewCardsProps) {
  const total = getMonthlyTotal(expenses);
  const prediction = getPrediction(expenses);
  const avgPerDay = prediction.dailyAvg;

  const cards = [
    {
      label: "This Month",
      value: `$${total.toLocaleString("en-US", { minimumFractionDigits: 2 })}`,
      icon: DollarSign,
      accent: "text-primary",
    },
    {
      label: "Daily Average",
      value: `$${avgPerDay.toFixed(0)}`,
      icon: Calendar,
      accent: "text-chart-transport",
    },
    {
      label: "Predicted Total",
      value: `$${prediction.predictedTotal.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`,
      icon: TrendingUp,
      accent: "text-warning",
    },
    {
      label: "Days Left",
      value: `${prediction.daysLeft}`,
      icon: TrendingDown,
      accent: "text-accent-foreground",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {cards.map((card, i) => (
        <motion.div
          key={card.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="glass-card p-4"
        >
          <div className="flex items-center gap-2 mb-2">
            <card.icon className={`h-4 w-4 ${card.accent}`} />
            <span className="text-xs text-muted-foreground">{card.label}</span>
          </div>
          <p className="text-xl font-bold font-display">{card.value}</p>
        </motion.div>
      ))}
    </div>
  );
}
