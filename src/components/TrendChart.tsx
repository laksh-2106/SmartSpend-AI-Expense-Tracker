import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, Area, AreaChart } from "recharts";
import { TrendingUp } from "lucide-react";
import { Expense } from "@/lib/expense-data";

interface TrendChartProps {
  expenses: Expense[];
}

export function TrendChart({ expenses }: TrendChartProps) {
  // Aggregate expenses by date
  const byDate: Record<string, number> = {};
  expenses.forEach((e) => {
    byDate[e.date] = (byDate[e.date] || 0) + e.amount;
  });

  const data = Object.entries(byDate)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, amount]) => {
      const d = new Date(date);
      return {
        date: `${d.getMonth() + 1}/${d.getDate()}`,
        amount: parseFloat(amount.toFixed(2)),
      };
    });

  // Cumulative data
  let cumulative = 0;
  const cumulativeData = data.map((d) => {
    cumulative += d.amount;
    return { ...d, cumulative: parseFloat(cumulative.toFixed(2)) };
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25 }}
      className="glass-card p-5"
    >
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="h-4 w-4 text-primary" />
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Spending Trend</h2>
      </div>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={cumulativeData}>
            <defs>
              <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(160, 84%, 44%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(160, 84%, 44%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="date"
              tick={{ fontSize: 10, fill: "hsl(215, 20%, 55%)" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 10, fill: "hsl(215, 20%, 55%)" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `$${v}`}
            />
            <Tooltip
              contentStyle={{
                background: "hsl(222, 41%, 10%)",
                border: "1px solid hsl(222, 30%, 18%)",
                borderRadius: "8px",
                color: "hsl(210, 40%, 96%)",
                fontSize: "12px",
              }}
              formatter={(value: number) => [`$${value.toFixed(2)}`, "Cumulative"]}
            />
            <Area
              type="monotone"
              dataKey="cumulative"
              stroke="hsl(160, 84%, 44%)"
              strokeWidth={2}
              fill="url(#trendGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-between text-xs text-muted-foreground mt-2 px-1">
        <span>Daily spending over time</span>
        <span>Cumulative: ${cumulative.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>
      </div>
    </motion.div>
  );
}
