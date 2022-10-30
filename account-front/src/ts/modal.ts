export function showModal(): void {
    const modalOverlay = document.querySelector(
        "#modal-overlay"
    ) as HTMLSelectElement;
    modalOverlay.classList.add("active");

    const modalOverlayBackgroud = document.querySelector(
        "#modal-overlay-backgroud"
    ) as HTMLSelectElement;

    modalOverlayBackgroud.addEventListener("click", () => {
        modalOverlay.classList.remove("active");
    });
}

export function closeModal(): void {
    const modalOverlay = document.querySelector(
        "#modal-overlay"
    ) as HTMLSelectElement;
    modalOverlay.classList.remove("active");
}
