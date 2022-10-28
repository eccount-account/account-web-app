import "./css/reset.css";
import "./css/navigation.css";
import "./css/statisticalItem.css";
import { createEl } from "./utile";
import { fetchData } from "./api";

const listItemsEl = document.querySelector(".ListItems") as HTMLSelectElement;

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
        const listItemEl = createEl("li", "cl-listItem");
        const payedmoneyEl = createEl("div", "cl-payedmoney");
        const payedateEl = createEl("div", "cl-payedate");
        const classifyEl = createEl("div", "cl-classify");
        const categoryEl = createEl("div", "cl-category");
        const memoEl = createEl("div", "cl-memo");

        payedmoneyEl.innerText = `${this.payedMoney.toLocaleString()}원`;
        payedateEl.innerText = this.getFullDate();
        classifyEl.innerText = this.classify;
        categoryEl.innerText = this.category;
        memoEl.innerText = this.memo;

        listItemEl.appendChild(payedmoneyEl);
        listItemEl.appendChild(payedateEl);
        listItemEl.appendChild(classifyEl);
        listItemEl.appendChild(categoryEl);
        listItemEl.appendChild(memoEl);

        listItemEl.addEventListener("click", (event) => {
            console.log("클릭 id", this.id, this, event);
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

        const data = await response.json();
        console.log(data);
    }

    async requestDelete(id, classify) {
        const response = await fetch(
            `/api/${classify === "수입" ? "income" : "expend"}/id/${id}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        const data = await response.json();
        console.log(data);
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

        // const TEST_DATA = {
        //     id: 1,
        //     payedMoney: 20000,
        //     payYear: 2022,
        //     payMonth: 3,
        //     payDay: 2,
        //     payTime: 10,
        //     classify: "수입",
        //     category: "근로소득",
        //     memo: "치킨먹었음",
        // };

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
            this.requestDelete(selectExpendOne[0].id, selectExpendOne.classify);
        });

        mdidyInputEl.appendChild(modifyAreaEl);
    }
}

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
}

function renderStatisticExpense(data) {
    const targetEl = document.querySelector(
        ".monyExpense"
    ) as HTMLSelectElement;
    targetEl.innerText = `${sumExpenseCost(data).toLocaleString()}원`;
}

async function renderMonthCostList() {
    listItemsEl.innerText = "";
    //api 대신 가져오기
    // const TEST_ITEM = [
    //     {
    //         id: 1,
    //         payedMoney: 2000,
    //         payYear: 2022,
    //         payMonth: 10,
    //         payDay: 25,
    //         payTime: 1100,
    //         classify: "수입",
    //         category: "금융소득",
    //         memo: "안녕하세요1",
    //     },
    //     {
    //         id: 1,
    //         payedMoney: 2000,
    //         payYear: 2022,
    //         payMonth: 10,
    //         payDay: 25,
    //         payTime: 1100,
    //         classify: "지출",
    //         category: "식비",
    //         memo: "안녕하세요1",
    //     },
    //     {
    //         id: 2,
    //         payedMoney: 3000,
    //         payYear: 2022,
    //         payMonth: 3,
    //         payDay: 2,
    //         payTime: 10,
    //         classify: "수입",
    //         category: "근로소득",
    //         memo: "월급",
    //     },
    //     {
    //         id: 2,
    //         payedMoney: 3000,
    //         payYear: 2022,
    //         payMonth: 1,
    //         payDay: 3,
    //         payTime: 11,
    //         classify: "지출",
    //         category: "교통비",
    //         memo: "교통비",
    //     },
    //     {
    //         id: 3,
    //         payedMoney: 3000,
    //         payYear: 2022,
    //         payMonth: 1,
    //         payDay: 3,
    //         payTime: 11,
    //         classify: "수입",
    //         category: "근로소득",
    //         memo: "교통비",
    //     },
    //     {
    //         id: 4,
    //         payedMoney: 200,
    //         payYear: 2022,
    //         payMonth: 1,
    //         payDay: 3,
    //         payTime: 11,
    //         classify: "지출",
    //         category: "교통비",
    //         memo: "교통비",
    //     },
    // ];

    const response = await fetch(`/api/monthtotal`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            content: {
                payMonth: 10,
                payYear: 2022,
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
    submitBtnEl.addEventListener("click", renderMonthCostList);
}

//윈도우 열리면 바로 init() 함수 실행
window.addEventListener("DOMContentLoaded", init);
