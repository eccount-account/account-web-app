import "../css/reset.css";
import "../css/navigation.css";
import "../css/statistical.css";
import { createEl, cutDateMonth } from "./utile";

// targetEl엘리먼트 유흥비 10000 23111 2
function createTableItem(
    targetEl: HTMLElement,
    categoryName: string,
    categorySum: number,
    categoryCount: number,
    categoryAcc?: number
) {
    console.log(
        "출력",
        targetEl,
        categoryName,
        categoryAcc,
        categorySum,
        categoryCount
    );

    const listItemEl = createEl("tr", "listItem");
    const categoryNameEl = createEl("td", "categoryName");
    const categoryAccEl = createEl("td", "categoryAcc");
    const categoryPercentEl = createEl("td", "ategoryPercent");
    const categoryCountEl = createEl("td", "ategoryPercent");

    categoryNameEl.innerText = categoryName;
    categoryAccEl.innerText = `${categoryAcc.toLocaleString()}원`;
    categoryPercentEl.innerText = `${Math.round(
        (categoryAcc / categorySum) * 100
    )}%`;
    categoryCountEl.innerText = `${categoryCount}건`;

    listItemEl.appendChild(categoryNameEl);
    listItemEl.appendChild(categoryAccEl);
    listItemEl.appendChild(categoryCountEl);
    listItemEl.appendChild(categoryPercentEl);

    targetEl.appendChild(listItemEl);
}

//엘리먼트 23111 7
function createTotalItam(
    targetEl: HTMLElement,
    accSum: number,
    accCount: number
): void {
    console.log("출력!!!@#@!#", targetEl, accSum, accCount);
    targetEl.innerText = "";

    const listItemEl = createEl("tr", "listItem");
    const totalSumEl = createEl("td", "totalSum");
    const totalCountEl = createEl("td", "totalCount");

    totalSumEl.innerText = `${accSum.toLocaleString()}원`;
    totalCountEl.innerText = `${accCount}건`;

    listItemEl.appendChild(totalSumEl);
    listItemEl.appendChild(totalCountEl);

    targetEl.appendChild(listItemEl);
}

function renderReportList(
    targetEl: HTMLElement,
    accData: object,
    accSum: number,
    categoryCount: object
): void {
    targetEl.innerText = "";

    //{식비: 2111, 주거비: 11000, 유흥비: 10000}식비: 2111유흥비: 10000주거비: 11000[[Prototype]]: Object 23111 {식비: 2, 주거비: 3, 유흥비: 2}
    //accData -> {금융소득: 3000}
    console.log("ㄴㄴㄴ", targetEl, accData, accSum, categoryCount);

    for (const [name, acc] of Object.entries(accData)) {
        //console.log("스티링", name, "숫자", acc);
        createTableItem(targetEl, name, accSum, categoryCount[name], acc);
    }
}

interface CalCost {
    category: string;
    classify: string;
    id: number;
    memo: string;
    payDay: number;
    payMonth: number;
    payTime: number;
    payYear: number;
    payedMoney: number;
}

interface RetrnData {
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

function calculateCategoryCost(data: CalCost): RetrnData {
    console.log("calculateCategoryCost", data);
    //[{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
    // category: "식비"
    // classify: "지출"
    // id: 5
    // memo: "안녕하세요5"payDay: 25
    // payMonth: 10
    // payTime: 1101
    // payYear: 2022
    // payedMoney: 2000

    const incomeObj = {};
    const expendObj = {};
    const incomeCategoryObj = {};
    const expendCetegoryObj = {};

    let allMonthCost = 0;
    let incomeMonthTotal = 0;
    let expendMonthTotal = 0;
    let incomeCount = 0;
    let expendCount = 0;

    //통계 관련 데이터 뽑아내기
    for (let item in data) {
        if (data[item].classify === "수입") {
            incomeCount += 1;
            allMonthCost += data[item].payedMoney;
            incomeMonthTotal += data[item].payedMoney;

            if (!incomeObj[data[item].category]) {
                incomeObj[data[item].category] = data[item].payedMoney;
            } else {
                incomeObj[data[item].category] += data[item].payedMoney;
            }

            if (!incomeCategoryObj[data[item].category]) {
                incomeCategoryObj[data[item].category] = 1;
            } else {
                incomeCategoryObj[data[item].category] += 1;
            }
        } else {
            expendCount += 1;
            allMonthCost -= data[item].payedMoney;
            expendMonthTotal += data[item].payedMoney;

            if (!expendObj[data[item].category]) {
                expendObj[data[item].category] = data[item].payedMoney;
            } else {
                expendObj[data[item].category] += data[item].payedMoney;
            }

            if (!expendCetegoryObj[data[item].category]) {
                expendCetegoryObj[data[item].category] = 1;
            } else {
                expendCetegoryObj[data[item].category] += 1;
            }
        }
    }

    const sendData: RetrnData = {
        totalAcc: allMonthCost,
        incomeCategoryAcc: incomeObj,
        expendCategoryAcc: expendObj,
        incomeMonthTotal: incomeMonthTotal,
        expendMonthTotal: expendMonthTotal,
        incomeCount: incomeCount,
        expendCount: expendCount,
        incomeCategoryObj: incomeCategoryObj,
        expendCetegoryObj: expendCetegoryObj,
    };

    return sendData;
}

interface ExpendCategoryAcc {
    expendCategoryAcc: object;
    expendCetegoryObj: object;
    expendCount: number;
    expendMonthTotal: number;
    incomeCategoryAcc: object;
    incomeCategoryObj: object;
    incomeCount: number;
    incomeMonthTotal: number;
    totalAcc: number;
}

function renderIncomeReport(
    incomeReportEl: HTMLElement,
    incomeTotalReortEl: HTMLElement,
    accData: ExpendCategoryAcc
) {
    renderReportList(
        incomeReportEl,
        accData.incomeCategoryAcc,
        accData.incomeMonthTotal,
        accData.incomeCategoryObj
    );

    createTotalItam(
        incomeTotalReortEl,
        accData.incomeMonthTotal,
        accData.incomeCount
    );
}

function expendIncomeReport(
    expendseReortEl: HTMLElement,
    expendTotalReortEl: HTMLElement,
    accData: ExpendCategoryAcc
) {
    renderReportList(
        expendseReortEl,
        accData.expendCategoryAcc,
        accData.expendMonthTotal,
        accData.expendCetegoryObj
    );

    createTotalItam(
        expendTotalReortEl,
        accData.expendMonthTotal,
        accData.expendCount
    );
}

async function renderMonthList(year: number, month: number) {
    const incomeReportEl = document.querySelector(
        ".incomeReort"
    ) as HTMLSelectElement;
    const expendseReortEl = document.querySelector(
        ".expendseReort"
    ) as HTMLSelectElement;

    const incomeTotalReortEl = document.querySelector(
        ".incomeTotalReort"
    ) as HTMLSelectElement;
    const expendTotalReortEl = document.querySelector(
        ".expendTotalReort"
    ) as HTMLSelectElement;

    const response = await fetch(`/api/monthtotal`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            content: {
                payMonth: month,
                payYear: year,
            },
        }),
    });

    const data = await response.json();
    if (!data) {
        return;
    }

    const accData = calculateCategoryCost(data); //api로 계산된 기격 받아오기
    console.log("데이터 ㅜㅜ", accData);

    //지출 카테고리 내역 렌더링
    renderIncomeReport(incomeReportEl, incomeTotalReortEl, accData);
    expendIncomeReport(expendseReortEl, expendTotalReortEl, accData);
}

function init(): void {
    const selectMonthEl = document.querySelector(
        'input[type="month"]'
    ) as HTMLSelectElement;
    selectMonthEl.value = new Date().toISOString().slice(0, 7);
    const [intYear, initMonth] = cutDateMonth(selectMonthEl.value);

    renderMonthList(intYear, initMonth);

    selectMonthEl.addEventListener("change", () => {
        const [year, month] = cutDateMonth(selectMonthEl.value);
        renderMonthList(year, month);
    });
}

//윈도우 열리면 바로 init() 함수 실행
window.addEventListener("DOMContentLoaded", init);
