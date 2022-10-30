import "../css/reset.css";
import "../css/navigation.css";
import "../css/home.css";
import { createEl, cutDateFull, cutDateMonth } from "./utile";
import { showModal, closeModal } from "./modal";

const listItemsEl = document.querySelector(".ListItems") as HTMLSelectElement;

interface PostOption {
    method: string;
    headers: object | any;
    body: string;
}

interface ModyData {
    id: number;
    payedMoney: number;
    payYear: number;
    payMonth: number;
    payDay: number;
    payTime: number;
    classify: string;
    category: string;
    memo: string;
}

interface FetchData {
    category: string;
    id: number;
    memo: string;
    payDay: number;
    payMonth: number;
    payTime: number;
    payYear: number;
    payedMoney: number;
}

//클라이언트 데이터 서버 전송
//반환 데이터 Promise -> json 반환 [{id: 2, payedMoney: 3000, category: '교통비', memo: '안녕하세요2', payYear: 2022, …}]
async function fetchData(url: string): Promise<FetchData[]> {
    const response = await fetch(url);
    const dataList = await response.json();
    console.log(dataList);

    if (!dataList) {
        return dataList;
    }

    console.log(dataList);
    return dataList;
}

//타입 못줘서 못쓰고있음
//클라이언트에서 서버로 데이터 전송
async function saveData(url: string, bodyData: string, method: string) {
    const requstOption: PostOption = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: bodyData,
    };

    const response = await fetch(url, requstOption);
    console.log(response);
}

//targetEl -> select엘리먼트
function changeCategory(targetEl: HTMLSelectElement, classify: string): void {
    const INCOME_SELECT = ["금융소득", "근로소득", "기타", "없음"];
    const EXPEND_SELECT = [
        "식비",
        "교통비",
        "주거비",
        "유흥비",
        "저축",
        "기타",
    ];

    targetEl.innerText = "";

    if (classify === "수입") {
        INCOME_SELECT.forEach((item) => {
            const optionEl = document.createElement("option");
            optionEl.value = item;
            optionEl.innerText = item;
            targetEl.append(optionEl);
        });
    } else {
        EXPEND_SELECT.forEach((item) => {
            const optionEl = document.createElement("option");
            optionEl.value = item;
            optionEl.innerText = item;
            targetEl.append(optionEl);
        });
    }
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
    getFullDate(): string {
        return `${this.payYear}-${this.payMonth}-${this.payDay}`;
    }

    //반환값 -> listItemEl 엘리먼트
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
            this.viewDetailBoard(this.id, this.classify);
            showModal();
        });
        return listItemEl;
    }

    //반환은 없는듯? promise
    async requestModify(
        id: number,
        money: number,
        categor: string,
        memo: string,
        classify: string,
        year: number,
        month: number,
        day: number
    ): Promise<void> {
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
        renderMonthList(year, month);
    }

    async requestDelete(
        id: number,
        classify: string,
        year: number,
        month: number
    ): Promise<void> {
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
        renderMonthList(year, month);
    }

    async viewDetailBoard(id: number, classify: string): Promise<void> {
        const detailBoardEl = document.querySelector(
            ".detailBoard"
        ) as HTMLSelectElement;

        detailBoardEl.innerHTML = ""; //일단 지움

        const response = await fetchData(
            `/api/${classify === "수입" ? "income" : "expend"}/id/${id}`
        );
        const selectItem = response[0];

        const detailBoardBoxEl = createEl("div", "detailBoardBox");
        const detailBoardMonyEl = createEl("input", "detailBoardMony");
        const detailBoardMonyP = createEl("p", "input-label");

        //셀렉트 박스
        const detailBoardCategoryEl = createEl("select", "detailBoardCategory");
        const detailBoardCategoryP = createEl("p", "input-label");

        const detailBoardDateEl = createEl("input", "dateilBoard");
        const detailBoardDateP = createEl("p", "input-label");
        console.log(detailBoardDateP);

        const detailBoardMomoEl = createEl("input", "detailBoardMomo");
        const detailBoardMomoP = createEl("p", "input-label");

        const boardBtnArea = createEl("div", "boardBtnArea");
        const modifyBtn = createEl("button", "submit");
        const deleteBtn = createEl("button", "submit");

        detailBoardMonyP.innerText = "금액";
        detailBoardCategoryP.innerText = "카테고리";
        detailBoardDateP.innerText = "날짜";
        detailBoardMomoP.innerText = "메모";

        detailBoardMonyEl.value = selectItem.payedMoney;

        changeCategory(detailBoardCategoryEl, classify);

        detailBoardDateEl.setAttribute("type", "date");
        detailBoardDateEl.value = `${selectItem.payYear}-${selectItem.payMonth}-${selectItem.payDay}`; //클릭한 시간 넣어주기
        detailBoardMomoEl.value = selectItem.memo;

        modifyBtn.innerText = `수정`;
        deleteBtn.innerText = `삭제`;

        detailBoardBoxEl.appendChild(detailBoardCategoryP);
        detailBoardBoxEl.appendChild(detailBoardCategoryEl);

        detailBoardBoxEl.appendChild(detailBoardMonyP);
        detailBoardBoxEl.appendChild(detailBoardMonyEl);

        detailBoardBoxEl.appendChild(detailBoardDateP);
        detailBoardBoxEl.appendChild(detailBoardDateEl);

        detailBoardBoxEl.appendChild(detailBoardMomoP);
        detailBoardBoxEl.appendChild(detailBoardMomoEl);

        boardBtnArea.appendChild(modifyBtn);
        boardBtnArea.appendChild(deleteBtn);
        detailBoardBoxEl.appendChild(boardBtnArea);

        modifyBtn.addEventListener("click", () => {
            const [year, month, day] = cutDateFull(detailBoardDateEl.value);
            this.requestModify(
                selectItem.id,
                detailBoardMonyEl.value,
                detailBoardCategoryEl.value,
                detailBoardMomoEl.value,
                classify,
                year,
                month,
                day
            );
            closeModal();
        });
        deleteBtn.addEventListener("click", () => {
            this.requestDelete(
                selectItem.id,
                classify,
                selectItem.payYear,
                selectItem.payMonth
            );
            closeModal();
        });

        detailBoardEl.appendChild(detailBoardBoxEl);
    }
}

function sumAllCost(data: ModyData[]): number {
    return data.reduce(
        (acc, item) =>
            (acc += item.payedMoney * (item.classify === "수입" ? 1 : -1)),
        0
    );
}

function sumIncomeCost(data: ModyData[]): number {
    let sumCost = 0;
    data.forEach((item) => {
        if (item.classify === "수입") {
            sumCost += item.payedMoney;
        }
    });
    return sumCost;
}

function sumExpenseCost(data: ModyData[]): number {
    let sumCost = 0;
    data.forEach((item) => {
        if (item.classify === "지출") {
            sumCost -= item.payedMoney;
        }
    });
    return sumCost;
}

function renderStatisticAll(data: ModyData[], flag: boolean): void {
    const targetEl = document.querySelector(".monySum") as HTMLSelectElement;
    targetEl.innerText = "";

    if (!flag) {
        targetEl.innerText = `${(sumAllCost(data) * -1).toLocaleString()}원`;
        return;
    }
    targetEl.innerText = `${sumAllCost(data).toLocaleString()}원`;
}

function renderStatisticIncome(data: ModyData[]): void {
    const targetEl = document.querySelector(".monyIncome") as HTMLSelectElement;
    targetEl.innerText = "";
    targetEl.innerText = `${sumIncomeCost(data).toLocaleString()}원`;
    targetEl.classList.add("style-imcome");
}

function renderStatisticExpense(data: ModyData[]): void {
    const targetEl = document.querySelector(
        ".monyExpense"
    ) as HTMLSelectElement;
    targetEl.innerText = "";
    targetEl.innerText = `${sumExpenseCost(data).toLocaleString()}원`;
    targetEl.classList.add("style-expend");
}

async function renderAllList(selectClassify: string): Promise<void> {
    listItemsEl.innerText = "";

    const response = await fetch(`/api/${selectClassify}`);

    const monyList: ModyData[] = await response.json();
    if (!monyList) {
        return;
    }

    monyList.map((item) => {
        const costItem = new CostItem(
            item.id,
            item.payedMoney,
            item.payYear,
            item.payMonth,
            item.payDay,
            item.payTime,
            selectClassify === "income" ? "수입" : "지출",
            item.category,
            item.memo
        );
        listItemsEl.appendChild(costItem.createItem());
    });

    //monyList 객체 반환
    renderStatisticAll(monyList, false);
    renderStatisticIncome(monyList);
    renderStatisticExpense(monyList);
}

async function renderMonthList(year: number, month: number): Promise<void> {
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

    const data: ModyData[] = await response.json();
    if (!data) {
        return;
    }

    data.map((item) => {
        const costItem = new CostItem(
            item.id,
            item.payedMoney,
            item.payYear,
            item.payMonth,
            item.payDay,
            item.payTime,
            item.classify,
            item.category,
            item.memo
        );
        listItemsEl.appendChild(costItem.createItem());
    });

    renderStatisticAll(data, true);
    renderStatisticIncome(data);
    renderStatisticExpense(data);
}

function init(): void {
    const selectMonthEl = document.querySelector(
        'input[type="month"]'
    ) as HTMLSelectElement;

    const selectAllIncomeEl = document.querySelector(
        ".allIncomeHistory"
    ) as HTMLSelectElement;

    const selectAllExpendEl = document.querySelector(
        ".allExpendHistory"
    ) as HTMLSelectElement;

    selectMonthEl.value = new Date().toISOString().slice(0, 7);
    const [intYear, initMonth] = cutDateMonth(selectMonthEl.value);
    renderMonthList(intYear, initMonth);

    selectMonthEl.addEventListener("change", () => {
        const [year, month] = cutDateMonth(selectMonthEl.value);
        renderMonthList(year, month);
    });

    selectMonthEl.addEventListener("change", () => {
        const [year, month] = cutDateMonth(selectMonthEl.value);
        renderMonthList(year, month);
    });

    selectAllIncomeEl.addEventListener("click", () => {
        renderAllList("income");
    });

    selectAllExpendEl.addEventListener("click", () => {
        renderAllList("expend");
    });
}

//윈도우 열리면 바로 init() 함수 실행
window.addEventListener("DOMContentLoaded", init);
