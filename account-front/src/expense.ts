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

    const response = await fetch("/api/expend", requstOption);
    console.log(response.status);
}

const submitBtnEl = document.querySelector(".submitBtn");

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

submitBtnEl?.addEventListener("click", submitInputData);
