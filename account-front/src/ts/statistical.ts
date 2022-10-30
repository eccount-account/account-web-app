import "../css/reset.css";
import "../css/navigation.css";
import "../css/statistical.css";
import { createEl, cutDateMonth } from "./utile";

function createTableItem(
    targetEl,
    categoryName,
    categoryAcc,
    categorySum,
    categoryCount
) {
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

function createTotalItam(targetEl, accSum, accCount) {
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

function renderReportList(targetEl, accData, accSum, categoryCount) {
    targetEl.innerText = "";

    console.log(categoryCount);

    for (const [name, acc] of Object.entries(accData)) {
        createTableItem(targetEl, name, acc, accSum, categoryCount[name]);
    }
}

function calculateCategoryCost(data) {
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

    return {
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
}

function renderIncomeReport(incomeReportEl, incomeTotalReortEl, accData) {
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

function expendIncomeReport(expendseReortEl, expendTotalReortEl, accData) {
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

    //지출 카테고리 내역 렌더링
    renderIncomeReport(incomeReportEl, incomeTotalReortEl, accData);
    expendIncomeReport(expendseReortEl, expendTotalReortEl, accData);
}

function init() {
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
