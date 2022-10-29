import "../css/reset.css";
import "../css/navigation.css";
import "../css/statistical.css";
import { createEl } from "./utile";

function createTableHeader() {}

function createTableItem(targetEl, categoryName, categoryAcc, categorySum) {
    const listItemEl = createEl("tr", "listItem");
    const categoryNameEl = createEl("td", "categoryName");
    const categoryAccEl = createEl("td", "categoryAcc");
    const categoryPercentEl = createEl("td", "ategoryPercent");

    categoryNameEl.innerText = categoryName;
    categoryAccEl.innerText = `${categoryAcc.toLocaleString()}원`;
    categoryPercentEl.innerText = `${Math.ceil(
        (categoryAcc / categorySum) * 100
    )}%`;

    listItemEl.appendChild(categoryNameEl);
    listItemEl.appendChild(categoryAccEl);
    listItemEl.appendChild(categoryPercentEl);

    targetEl.appendChild(listItemEl);
}

function renderReport(targetEl, accData, accSum) {
    targetEl.innerText = "";
    for (const [name, acc] of Object.entries(accData)) {
        createTableItem(targetEl, name, acc, accSum);
    }
}

function calculateCategoryCost(data) {
    const incomeObj = {};
    const expendObj = {};
    let allMonthCost = 0;
    let incomeMonthTotal = 0;
    let expendMonthTotal = 0;

    for (let item in data) {
        if (data[item].classify === "수입") {
            allMonthCost += data[item].payedMoney;
            incomeMonthTotal += data[item].payedMoney;

            if (!incomeObj[data[item].category]) {
                incomeObj[data[item].category] = data[item].payedMoney;
            } else {
                incomeObj[data[item].category] += data[item].payedMoney;
            }
        } else {
            allMonthCost -= data[item].payedMoney;
            expendMonthTotal += data[item].payedMoney;

            if (!expendObj[data[item].category]) {
                expendObj[data[item].category] = data[item].payedMoney;
            } else {
                expendObj[data[item].category] += data[item].payedMoney;
            }
        }
    }

    return {
        totalAcc: allMonthCost,
        incomeCategoryAcc: incomeObj,
        expendCategoryAcc: expendObj,
        incomeMonthTotal: incomeMonthTotal,
        expendMonthTotal: expendMonthTotal,
    };
}

async function renderMonthList(year, month) {
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

    const incomeReportEl = document.querySelector(
        ".incomeReort"
    ) as HTMLSelectElement;
    const expendseReortEl = document.querySelector(
        ".expendseReort"
    ) as HTMLSelectElement;
    const accData = calculateCategoryCost(data);

    renderReport(
        incomeReportEl,
        accData.incomeCategoryAcc,
        accData.incomeMonthTotal
    );
    renderReport(
        expendseReortEl,
        accData.expendCategoryAcc,
        accData.expendMonthTotal
    );
}

function init() {
    const selectMonthEl = document.querySelector(
        'input[type="month"]'
    ) as HTMLSelectElement;
    selectMonthEl.value = new Date().toISOString().slice(0, 7);
    const [intYear, initMonth] = selectMonthEl.value.split("-");
    renderMonthList(intYear, initMonth);

    selectMonthEl.addEventListener("change", () => {
        const [year, month] = selectMonthEl.value.split("-");
        renderMonthList(year, month);
    });
}

//윈도우 열리면 바로 init() 함수 실행
window.addEventListener("DOMContentLoaded", init);
