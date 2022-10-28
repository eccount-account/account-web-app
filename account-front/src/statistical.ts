import "./css/reset.css";
import "./css/navigation.css";
import "./css/statisticalItem.css";
import { createEl } from "./utile";
import { fetchData } from "./api";

const listItemsEl = document.querySelector(".ListItems") as HTMLSelectElement;
const selectMonthEl = document.querySelector(
    ".selectMonth"
) as HTMLSelectElement;

interface PostOption {
    method: string;
    headers: object | any;
    body: string;
}

class CostItem {
    id: number;
    payedMoney: number;
    payYear: number;
    payMonth: number;
    payDay: number;
    payTime: number;
    classify: string;
    category: string;
    memo: string;

    constructor(
        id: number,
        payedMoney: number,
        payYear: number,
        payMonth: number,
        payDay: number,
        payTime: number,
        classify: string,
        category: string,
        memo: string
    ) {
        this.id = id;
        this.payedMoney = payedMoney;
        this.payYear = payYear;
        this.payMonth = payMonth;
        this.payDay = payDay;
        this.payTime = payTime;
        this.classify = classify;
        this.category = category;
        this.memo = memo;
    }

    //날짜 생성 함수
    getFullDate() {
        return `${this.payYear}-${this.payMonth}-${this.payDay}`;
    }

    createItem() {
        const listItemEl = createEl("tr", "cl-listItem");
        const payedmoneyEl = createEl("td", "cl-payedmoney");
        const payedateEl = createEl("td", "cl-payedate");
        const classifyEl = createEl("td", "cl-classify");
        const categoryEl = createEl("td", "cl-category");
        const memoEl = createEl("td", "cl-memo");

        payedmoneyEl.innerText = `${this.payedMoney.toLocaleString()}원`;
        payedateEl.innerText = this.getFullDate();
        classifyEl.innerText = this.classify;
        categoryEl.innerText = this.category;
        memoEl.innerText = this.memo;

        classifyEl.classList.add(
            `${this.classify === "수입" ? "style-imcome" : "style-expend"}`
        );
        listItemEl.appendChild(classifyEl);
        listItemEl.appendChild(categoryEl);
        listItemEl.appendChild(payedmoneyEl);
        listItemEl.appendChild(memoEl);
        listItemEl.appendChild(payedateEl);

        listItemEl.addEventListener("click", () => {
            this.modifyIncomItem(this.id, this.classify);
        });
        return listItemEl;
    }

    async requestModify(id, money, categor, memo, classify, year, month, day) {
        const response = await fetch(
            `/api/${classify === "수입" ? "income" : "expend"}/id/${id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    content: {
                        payedMoney: money,
                        category: categor,
                        memo: memo,
                        payYear: year,
                        payMonth: month,
                        payDay: day,
                    },
                }),
            }
        );

        const data = await response.status;
        console.log(data);
        renderMonthCostList();
    }

    async requestDelete(id, classify) {
        console.log("삭제 id -> ", id, "분류 -> ", classify);
        const response = await fetch(
            `/api/${classify === "수입" ? "income" : "expend"}/id/${id}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        const data = await response.status;
        console.log(data);
        renderMonthCostList();
    }

    async modifyIncomItem(id, classify) {
        console.log("수정 id -> ", id, "분류 -> ", classify);
        const mdidyInputEl = document.querySelector(
            ".mdidyInput"
        ) as HTMLSelectElement;

        mdidyInputEl.innerHTML = ""; //일단 지움

        //api 요청
        const selectExpendOne = await fetchData(
            `/api/${classify === "수입" ? "income" : "expend"}/id/${id}`
        );
        console.log(
            "수출 특정 아이디 한개 데이터 가져오기",
            selectExpendOne[0]
        );

        const modifyAreaEl = createEl("div", "modifyArea");
        const modifypayedMoneyEl = createEl("input", "modifypayedMoney");
        const modifycategorEl = createEl("input", "modifycategor");
        const modifydateEl = createEl("input", "modifydate");
        const modifymemoEl = createEl("input", "modifymemo");
        const modifyBtn = createEl("button", "submit");
        const deleteBtn = createEl("button", "submit");

        modifypayedMoneyEl.value = selectExpendOne[0].payedMoney;
        modifycategorEl.value = selectExpendOne[0].category;
        modifydateEl.value = `${selectExpendOne[0].payYear}-${selectExpendOne[0].payMonth}-${selectExpendOne[0].payDay}`;
        modifymemoEl.value = selectExpendOne[0].memo;

        modifyBtn.innerText = `수정`;
        deleteBtn.innerText = `삭제`;

        modifyAreaEl.appendChild(modifypayedMoneyEl);
        modifyAreaEl.appendChild(modifycategorEl);
        modifyAreaEl.appendChild(modifymemoEl);
        modifyAreaEl.appendChild(modifydateEl);
        modifyAreaEl.appendChild(modifyBtn);
        modifyAreaEl.appendChild(deleteBtn);

        modifyBtn.addEventListener("click", () => {
            const [year, month, day] = modifydateEl.value.split("-");
            this.requestModify(
                selectExpendOne[0].id,
                modifypayedMoneyEl.value,
                modifycategorEl.value,
                modifymemoEl.value,
                classify,
                year,
                month,
                day
            );
        });
        deleteBtn.addEventListener("click", () => {
            this.requestDelete(selectExpendOne[0].id, classify);
        });

        mdidyInputEl.appendChild(modifyAreaEl);
    }
}
const categor = {
    imcome: ["금융소득", "근로소득", "기타", "없음"],
    expend: ["식비", "교통비", "주거비", "유흥비", "저축", "기타"],
};
class Modal {}

function sumAllCost(data) {
    return data.reduce(
        (acc, item) =>
            (acc += item.payedMoney * (item.classify === "수입" ? 1 : -1)),
        0
    );
}

function sumIncomeCost(data) {
    let sumCost = 0;
    data.forEach((item) => {
        if (item.classify === "수입") {
            sumCost += item.payedMoney;
        }
    });

    return sumCost;
}

function sumExpenseCost(data) {
    let sumCost = 0;
    data.forEach((item) => {
        if (item.classify === "지출") {
            sumCost -= item.payedMoney;
        }
    });

    return sumCost;
}

function renderStatisticAll(data) {
    const targetEl = document.querySelector(".monySum") as HTMLSelectElement;
    targetEl.innerText = `${sumAllCost(data).toLocaleString()}원`;
}

function renderStatisticIncome(data) {
    const targetEl = document.querySelector(".monyIncome") as HTMLSelectElement;
    targetEl.innerText = `${sumIncomeCost(data).toLocaleString()}원`;
    targetEl.classList.add("style-imcome");
}

function renderStatisticExpense(data) {
    const targetEl = document.querySelector(
        ".monyExpense"
    ) as HTMLSelectElement;
    targetEl.innerText = `${sumExpenseCost(data).toLocaleString()}원`;
    targetEl.classList.add("style-expend");
}

async function renderMonthCostList(date?) {
    const [year, month] = date.value.split("-");
    listItemsEl.innerText = "";

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
    console.log(data);

    data.map(
        ({
            id,
            payedMoney,
            payYear,
            payMonth,
            payDay,
            payTime,
            classify,
            category,
            memo,
        }) => {
            const costItem = new CostItem(
                id,
                payedMoney,
                payYear,
                payMonth,
                payDay,
                payTime,
                classify,
                category,
                memo
            );
            listItemsEl.appendChild(costItem.createItem());
        }
    );

    renderStatisticAll(data);
    renderStatisticIncome(data);
    renderStatisticExpense(data);
}

function init() {
    const submitBtnEl = document.querySelector(
        ".submitBtn"
    ) as HTMLSelectElement;
    submitBtnEl.addEventListener("click", () => {
        renderMonthCostList(selectMonthEl);
    });
}

//윈도우 열리면 바로 init() 함수 실행
window.addEventListener("DOMContentLoaded", init);
