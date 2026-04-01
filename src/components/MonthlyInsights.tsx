import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { Lightbulb } from "lucide-react";
import { Expense, Category, categoryLabels, getCategoryTotal, getMonthlyTotal } from "@/lib/expense-data";

interface MonthlyInsightsProps {
  expenses: Expense[];
}

export function MonthlyInsights({ expenses }: MonthlyInsightsProps) {
  const categories: Category[] = ["food", "transport", "entertainment", "shopping", "bills", "health"];
  const total = getMonthlyTotal(expenses);

  const data = categories.map((cat) => ({
    name: categoryLabels[cat].split(" ")[0],
    amount: getCategoryTotal(expenses, cat),
  }));

  const topCategory = [...data].sort((a, b) => b.amount - a.amount)[0];
  const topPercent = total > 0 ? ((topCategory?.amount || 0) / total * 100).toFixed(0) : "0";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35 }}
      className="glass-card p-5"
    >
      <div className="flex items-center gap-2 mb-4">
        <Lightbulb className="h-4 w-4 text-warning" />
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Monthly Insights</h2>
      </div>
      <div className="h-36 mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="name" tick={{ fontSize: 10, fill: "hsl(215, 20%, 55%)" }} axisLine={false} tickLine={false} />
            <YAxis hide />
            <Tooltip
              contentStyle={{
                background: "hsl(222, 41%, 10%)",
                border: "1px solid hsl(222, 30%, 18%)",
                borderRadius: "8px",
                color: "hsl(210, 40%, 96%)",
                fontSize: "12px",
              }}
              formatter={(value: number) => [`$${value.toFixed(2)}`, "Spent"]}
            />
            <Bar dataKey="amount" fill="hsl(160, 84%, 44%)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="space-y-2 text-sm">
        <div className="bg-secondary/30 rounded-lg p-3 border border-border/30">
          <p className="text-muted-foreground">
            💡 <strong className="text-foreground">{topCategory?.name}</strong> is your biggest expense at{" "}
            <strong className="text-warning">{topPercent}%</strong> of total spending.
          </p>
        </div>
        <div className="bg-secondary/30 rounded-lg p-3 border border-border/30">
          <p className="text-muted-foreground">
            📊 You've made <strong className="text-foreground">{expenses.length}</strong> transactions this month,
            averaging <strong className="text-primary">${(total / Math.max(expenses.length, 1)).toFixed(0)}</strong> per transaction.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
