import "./css/reset.css";
import "./css/navigation.css";
import { createEl } from "./utile";

function init() {
    console.log("home");
}

//윈도우 열리면 바로 init() 함수 실행
window.addEventListener("DOMContentLoaded", init);
