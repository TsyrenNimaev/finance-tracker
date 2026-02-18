export interface ReportFilters {
  startDate: string;
  endDate: string;
  categoryLevel2Id?: string;
  categoryLevel3Id?: string;
}

export interface ReportResult {
  totalAmount: number;
  transactions: Array<{
    id: string;
    amount: number;
    description: string;
    date: string;
    categoryName: string;
    categoryPath: string; // "Расходы -> Продукты -> Огурцы"
  }>;
  byCategory: Record<string, number>; // Сумма по каждой категории
}
