//유틸함수
export function createEl<K extends keyof HTMLElementTagNameMap>(
    elKind: K,
    className: string
): HTMLElementTagNameMap[K] {
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
