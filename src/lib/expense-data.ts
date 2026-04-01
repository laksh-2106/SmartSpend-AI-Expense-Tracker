export type Category = "food" | "transport" | "entertainment" | "shopping" | "bills" | "health";

export interface Expense {
  id: string;
  description: string;
  amount: number;
  category: Category;
  date: string;
}

export const categoryLabels: Record<Category, string> = {
  food: "Food & Dining",
  transport: "Transport",
  entertainment: "Entertainment",
  shopping: "Shopping",
  bills: "Bills & Utilities",
  health: "Health",
};

export const categoryIcons: Record<Category, string> = {
  food: "🍔",
  transport: "🚗",
  entertainment: "🎬",
  shopping: "🛍️",
  bills: "💡",
  health: "💊",
};

const categoryKeywords: Record<Category, string[]> = {
  food: ["food", "restaurant", "coffee", "lunch", "dinner", "breakfast", "pizza", "sushi", "burger", "grocery", "groceries", "meal", "snack", "cafe", "bar", "drink", "uber eats", "doordash", "grubhub", "starbucks", "mcdonald"],
  transport: ["uber", "lyft", "gas", "fuel", "parking", "bus", "train", "metro", "taxi", "flight", "airline", "toll", "car wash", "oil change", "tire"],
  entertainment: ["netflix", "spotify", "movie", "concert", "game", "steam", "playstation", "xbox", "hulu", "disney", "theater", "museum", "ticket", "event"],
  shopping: ["amazon", "clothing", "shoes", "electronics", "target", "walmart", "ikea", "furniture", "gadget", "gift", "online order"],
  bills: ["rent", "electricity", "water", "internet", "phone", "insurance", "mortgage", "utility", "cable", "subscription", "gym membership"],
  health: ["pharmacy", "doctor", "hospital", "dentist", "medicine", "vitamin", "therapy", "clinic", "prescription", "lab", "checkup"],
};

export function autoCategorize(description: string): Category {
  const lower = description.toLowerCase();
  for (const [cat, keywords] of Object.entries(categoryKeywords)) {
    if (keywords.some((kw) => lower.includes(kw))) return cat as Category;
  }
  return "shopping";
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

// Generate sample data for demo
export function generateSampleData(): Expense[] {
  const now = new Date();
  const expenses: Expense[] = [];
  const items: [string, number, Category][] = [
    ["Starbucks Coffee", 5.75, "food"],
    ["Uber ride to office", 12.50, "transport"],
    ["Netflix subscription", 15.99, "entertainment"],
    ["Grocery run at Trader Joe's", 87.32, "food"],
    ["Electric bill", 142.00, "bills"],
    ["Amazon order - headphones", 79.99, "shopping"],
    ["Gas station fill up", 52.40, "transport"],
    ["Dinner at Italian place", 64.80, "food"],
    ["Spotify Premium", 10.99, "entertainment"],
    ["Pharmacy - vitamins", 23.50, "health"],
    ["Internet bill", 69.99, "bills"],
    ["Target shopping", 45.67, "shopping"],
    ["Lunch with team", 28.90, "food"],
    ["Movie tickets", 32.00, "entertainment"],
    ["Doctor copay", 40.00, "health"],
    ["Uber Eats delivery", 34.20, "food"],
    ["Parking downtown", 15.00, "transport"],
    ["Gym membership", 49.99, "bills"],
    ["New shoes online", 129.00, "shopping"],
    ["Coffee beans", 18.50, "food"],
    ["Bus pass monthly", 85.00, "transport"],
    ["Concert tickets", 120.00, "entertainment"],
    ["Phone bill", 75.00, "bills"],
    ["Sushi dinner", 52.00, "food"],
    ["Dentist cleaning", 150.00, "health"],
    ["Pizza delivery", 22.50, "food"],
    ["Lyft to airport", 38.00, "transport"],
    ["Steam game sale", 14.99, "entertainment"],
    ["Rent payment", 1800.00, "bills"],
    ["Clothing store", 95.00, "shopping"],
  ];

  items.forEach(([desc, amount, cat], i) => {
    const day = Math.max(1, now.getDate() - Math.floor(i * 1.1));
    const date = new Date(now.getFullYear(), now.getMonth(), day);
    expenses.push({
      id: generateId(),
      description: desc,
      amount,
      category: cat,
      date: date.toISOString().split("T")[0],
    });
  });

  return expenses;
}

export function getCategoryTotal(expenses: Expense[], category: Category): number {
  return expenses.filter((e) => e.category === category).reduce((sum, e) => sum + e.amount, 0);
}

export function getMonthlyTotal(expenses: Expense[]): number {
  return expenses.reduce((sum, e) => sum + e.amount, 0);
}

export interface CategoryBudget {
  category: Category;
  budget: number;
}

export const defaultBudgets: CategoryBudget[] = [
  { category: "food", budget: 400 },
  { category: "transport", budget: 200 },
  { category: "entertainment", budget: 150 },
  { category: "shopping", budget: 300 },
  { category: "bills", budget: 2200 },
  { category: "health", budget: 200 },
];

export function getOverspendingAlerts(expenses: Expense[], budgets: CategoryBudget[]) {
  return budgets
    .map((b) => {
      const spent = getCategoryTotal(expenses, b.category);
      const percent = (spent / b.budget) * 100;
      return { ...b, spent, percent };
    })
    .filter((b) => b.percent > 80)
    .sort((a, b) => b.percent - a.percent);
}

export function getPrediction(expenses: Expense[]): { predictedTotal: number; daysLeft: number; dailyAvg: number } {
  const now = new Date();
  const dayOfMonth = now.getDate();
  const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  const daysLeft = daysInMonth - dayOfMonth;
  const total = getMonthlyTotal(expenses);
  const dailyAvg = dayOfMonth > 0 ? total / dayOfMonth : 0;
  const predictedTotal = total + dailyAvg * daysLeft;
  return { predictedTotal, daysLeft, dailyAvg };
}
