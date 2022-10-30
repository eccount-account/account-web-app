export interface EssentialData {
    id: number;
    payedMoney: number;
    category: string;
    payYear: number;
    payMonth: number;
    payDay: number;
    payTime: number;
    memo: string;
}

export interface CostFullData extends EssentialData {
    classify: string;
}

export interface ReportAllData {
    totalAcc: number;
    incomeCategoryAcc: object;
    expendCategoryAcc: object;
    incomeMonthTotal: number;
    expendMonthTotal: number;
    incomeCount: number;
    expendCount: number;
    incomeCategoryObj: object;
    expendCetegoryObj: object;
}
