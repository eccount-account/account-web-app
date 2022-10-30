export function showModal(): void {
    document.getElementById("modal-overlay").classList.add("active");

    document
        .getElementById("modal-overlay-backgroud")
        .addEventListener("click", () => {
            document.getElementById("modal-overlay").classList.remove("active");
        });
}

export function closeModal(): void {
    document.getElementById("modal-overlay").classList.remove("active");
}
