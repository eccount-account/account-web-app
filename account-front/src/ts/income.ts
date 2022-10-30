import "../css/reset.css";
import "../css/navigation.css";
import "../css/inputBox.css";
import { cutDateFull } from "./utile";

interface PostOption {
    method: string;
    headers: object | any;
    body: string;
}

async function saveInputData(
    payedWay: string,
    payedMoney: number,
    category: string,
    memo: string,
    payYear: number,
    payMonth: number,
    payDay: number,
    payTime: number
) {
    const bodyData = JSON.stringify({
        content: {
            payedMoney: payedMoney,
            category: category,
            memo: memo,
            payYear: payYear,
            payMonth: payMonth,
            payDay: payDay,
            payTime: payTime,
        },
    });

    const requstOption: PostOption = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: bodyData,
    };

    const response = await fetch(
        `/api/${payedWay === "수입" ? "income" : "expend"}`,
        requstOption
    );
    console.log(response.status);

    if (response.status === 200) {
        alert(
            `${payedWay === "수입" ? "수입" : "지출"} 입력이 완료 되었습니다.`
        );
    } else {
        alert(`입력에 실패하였습니다.`);
    }
}

function submitInputData(): void {
    const payedCategoryEl = document.querySelector(
        ".payedCategory"
    ) as HTMLSelectElement;
    const payedMoneyEl = document.querySelector(
        ".payedMoney"
    ) as HTMLSelectElement;
    const payedDateEl = document.querySelector(
        "input[type='date']"
    ) as HTMLSelectElement;
    const payedWayEl = document.querySelector(
        "input[name='payment']:checked"
    ) as HTMLSelectElement;

    const memoEl = document.querySelector(".payedMemo") as HTMLSelectElement;

    const [year, month, day] = cutDateFull(payedDateEl.value);

    let today = new Date();
    let time = `${today.getHours()}${today.getMinutes()}`;

    if (!payedMoneyEl.value || Number(payedMoneyEl.value) === 0) {
        alert("금액을 입력해주세요");
        return;
    }

    saveInputData(
        payedWayEl.value,
        Number(payedMoneyEl.value),
        payedCategoryEl.options[payedCategoryEl.selectedIndex].value,
        memoEl.value,
        year,
        month,
        day,
        Number(time)
    );

    payedMoneyEl.value = "";
    payedDateEl.value = new Date().toISOString().substring(0, 10);
    memoEl.value = "";
}

function changeCategory(selectEL: HTMLSelectElement, classify: string): void {
    const INCOME_SELECT = ["금융소득", "근로소득", "기타", "없음"];
    const EXPEND_SELECT = [
        "식비",
        "교통비",
        "주거비",
        "유흥비",
        "저축",
        "기타",
    ];

    selectEL.innerText = "";

    if (classify === "수입") {
        INCOME_SELECT.forEach((item) => {
            const optionEl = document.createElement("option");
            optionEl.value = item;
            optionEl.innerText = item;
            selectEL.append(optionEl);
        });
    } else {
        EXPEND_SELECT.forEach((item) => {
            const optionEl = document.createElement("option");
            optionEl.value = item;
            optionEl.innerText = item;
            selectEL.append(optionEl);
        });
    }
}

function init(): void {
    const submitBtnEl = document.querySelector(
        ".submitBtn"
    ) as HTMLSelectElement;
    const payedMoneyEl = document.querySelector(
        "input[type='date']"
    ) as HTMLSelectElement;
    payedMoneyEl.value = new Date().toISOString().substring(0, 10);

    const payedWayEl = document.querySelector(
        "input[name='payment']:checked"
    ) as HTMLSelectElement;
    const unPayedWayEl = document.querySelector(
        "input[name='payment']:not(:checked)"
    ) as HTMLSelectElement;

    const selectEL = document.querySelector(
        ".payedCategory"
    ) as HTMLSelectElement;

    payedWayEl.addEventListener("change", () => {
        changeCategory(selectEL, payedWayEl.value);
    });

    unPayedWayEl.addEventListener("change", () => {
        changeCategory(selectEL, unPayedWayEl.value);
    });

    submitBtnEl.addEventListener("click", submitInputData);
}

//윈도우 열리면 바로 init() 함수 실행
window.addEventListener("DOMContentLoaded", init);
