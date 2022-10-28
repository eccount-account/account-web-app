import _ from "lodash";
import { add } from "./calc"; // 런타임시 타입스크립트로 돌아가지 않음, 그렇다고 js를 쓰지는 않음 -> 확장자 안 씀 -> 번들러에게 알려주기
import sample from "./img/sample.png"; // 웹팩에서 처리한다고 타입스크립트에게 알려주기
import "./css/reset.css";
import "./css/navigation.css";

const divEl = document.createElement("div");
divEl.textContent = _.join(
    ["hello~~!~!~!~!~!~!~!~!!~", "webpack", add(2, 3)],
    " "
);
document.body.append(divEl);

const image = new Image();
image.src = sample;
document.body.append(image);
