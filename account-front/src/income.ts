import "./css/reset.css";
import "./css/navigation.css";
import "./css/inputBox.css";
import "./css/button.css";

interface PostOption {
    method: string;
    headers: object | any;
    body: string;
}

async function saveInputData(
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

    const response = await fetch("/api/income", requstOption);
    console.log(response.status);

    if (response.status === 200) {
        alert("입력이 완료되었습니다.");
    }
}

function submitInputData(): any {
    const payedCategoryEl = document.querySelector(
        ".payedCategory"
    ) as HTMLSelectElement;
    const payedMoneyEl = document.querySelector(
        ".payedMoney"
    ) as HTMLSelectElement;
    const payedDateEl = document.querySelector(
        "input[type='date']"
    ) as HTMLSelectElement;
    const memoEl = document.querySelector(".payedMemo") as HTMLSelectElement;

    const [year, month, day] = payedDateEl.value.split("-");

    let today = new Date();
    let time = `${today.getHours()}${today.getMinutes()}`;

    saveInputData(
        Number(payedMoneyEl.value),
        payedCategoryEl.options[payedCategoryEl.selectedIndex].value,
        memoEl.value,
        Number(year),
        Number(month),
        Number(day),
        Number(time)
    );
}

function init() {
    const submitBtnEl = document.querySelector(
        ".submitBtn"
    ) as HTMLSelectElement;
    const payedMoneyEl = document.querySelector(
        "input[type='date']"
    ) as HTMLSelectElement;
    payedMoneyEl.value = new Date().toISOString().substring(0, 10);

    submitBtnEl.addEventListener("click", submitInputData);
}

//윈도우 열리면 바로 init() 함수 실행
window.addEventListener("DOMContentLoaded", init);
