import { useState } from "react";
import { ExpenseHeader } from "@/components/ExpenseHeader";
import { OverviewCards } from "@/components/OverviewCards";
import { SpendingChart } from "@/components/SpendingChart";
import { OverspendingAlerts } from "@/components/OverspendingAlerts";
import { PredictionCard } from "@/components/PredictionCard";
import { MonthlyInsights } from "@/components/MonthlyInsights";
import { RecentExpenses } from "@/components/RecentExpenses";
import { AddExpenseDialog } from "@/components/AddExpenseDialog";
import { TrendChart } from "@/components/TrendChart";
import { BudgetEditor } from "@/components/BudgetEditor";
import { Expense, CategoryBudget, defaultBudgets, generateSampleData } from "@/lib/expense-data";

const Index = () => {
  const [expenses, setExpenses] = useState<Expense[]>(generateSampleData);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [budgets, setBudgets] = useState<CategoryBudget[]>(defaultBudgets);

  const addExpense = (expense: Expense) => setExpenses((prev) => [expense, ...prev]);
  const deleteExpense = (id: string) => setExpenses((prev) => prev.filter((e) => e.id !== id));

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <div className="flex items-center justify-between">
          <ExpenseHeader onAddClick={() => setDialogOpen(true)} />
        </div>

        <div className="space-y-5">
          <OverviewCards expenses={expenses} />
          <TrendChart expenses={expenses} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <SpendingChart expenses={expenses} />
            <OverspendingAlerts expenses={expenses} budgets={budgets} />
          </div>

          <BudgetEditor budgets={budgets} onSave={setBudgets} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <MonthlyInsights expenses={expenses} />
            <PredictionCard expenses={expenses} />
          </div>

          <RecentExpenses expenses={expenses} onDelete={deleteExpense} />
        </div>
      </div>

      <AddExpenseDialog open={dialogOpen} onClose={() => setDialogOpen(false)} onAdd={addExpense} />
    </div>
  );
};

export default Index;