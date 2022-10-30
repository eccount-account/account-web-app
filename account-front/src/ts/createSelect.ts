const INCOME_SELECT = ["금융소득", "근로소득", "기타", "없음"];
const EXPEND_SELECT = ["식비", "교통비", "주거비", "유흥비", "저축", "기타"];

export function changeCategory(
    selectEL: HTMLSelectElement,
    classify: string
): void {
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
