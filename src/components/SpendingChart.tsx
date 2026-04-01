import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Expense, Category, categoryLabels, categoryIcons, getCategoryTotal } from "@/lib/expense-data";

interface SpendingChartProps {
  expenses: Expense[];
}

const COLORS: Record<Category, string> = {
  food: "hsl(0, 72%, 55%)",
  transport: "hsl(200, 80%, 55%)",
  entertainment: "hsl(280, 70%, 60%)",
  shopping: "hsl(32, 95%, 55%)",
  bills: "hsl(160, 84%, 44%)",
  health: "hsl(340, 70%, 55%)",
};

export function SpendingChart({ expenses }: SpendingChartProps) {
  const categories: Category[] = ["food", "transport", "entertainment", "shopping", "bills", "health"];
  const data = categories
    .map((cat) => ({
      name: categoryLabels[cat],
      value: getCategoryTotal(expenses, cat),
      icon: categoryIcons[cat],
      category: cat,
    }))
    .filter((d) => d.value > 0)
    .sort((a, b) => b.value - a.value);

  const total = data.reduce((s, d) => s + d.value, 0);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2 }}
      className="glass-card p-5"
    >
      <h2 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wider">Spending Breakdown</h2>
      <div className="flex items-center gap-6">
        <div className="w-40 h-40 flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={70}
                paddingAngle={3}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry) => (
                  <Cell key={entry.category} fill={COLORS[entry.category]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: "hsl(222, 41%, 10%)",
                  border: "1px solid hsl(222, 30%, 18%)",
                  borderRadius: "8px",
                  color: "hsl(210, 40%, 96%)",
                  fontSize: "12px",
                }}
                formatter={(value: number) => [`$${value.toFixed(2)}`, ""]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex-1 space-y-2">
          {data.map((item) => (
            <div key={item.category} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: COLORS[item.category] }} />
                <span className="text-muted-foreground">{item.icon} {item.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">${item.value.toFixed(0)}</span>
                <span className="text-xs text-muted-foreground">{((item.value / total) * 100).toFixed(0)}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
