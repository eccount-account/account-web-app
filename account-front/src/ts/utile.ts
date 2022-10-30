//유틸함수
export function createEl(elKind: any, className = "") {
    const el = document.createElement(elKind);
    el.className = className;
    return el;
}

export function cutDateFull(date: string) {
    const [year, month, day] = date.split("-");
    return [Number(year), Number(month), Number(day)];
}

export function cutDateMonth(date: string) {
    const [year, month] = date.split("-");
    return [Number(year), Number(month)];
}
