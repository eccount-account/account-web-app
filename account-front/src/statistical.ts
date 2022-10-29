import "./css/reset.css";
import "./css/navigation.css";
import "./css/home.css";
import { createEl } from "./utile";

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

    //Object.values(data).forEach((item) => console.log(item));

    // for (let item in data) {
    //     console.log(data[item]);
    //     console.log(data[item].classify);
    //     if (data[item].classify === "수입") {
    //         console.log(data[item].payedMoney);
    //     } else {
    //         console.log(data[item].payedMoney);
    //     }
    // }
}

function init() {
    renderMonthList(2022, 10);
}

//윈도우 열리면 바로 init() 함수 실행
window.addEventListener("DOMContentLoaded", init);
