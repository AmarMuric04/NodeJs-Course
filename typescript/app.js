"use strict";
const num1Element = document.getElementById("num1");
const num2Element = document.getElementById("num2");
const button = document.querySelector("button");
const numResults = [];
const textResults = [];
function add(num1, num2) {
    if (typeof num1 === "number" && typeof num2 === "number")
        return num1 + num2;
    if (typeof num1 === "string" && typeof num2 === "string")
        return num1 + " " + num2;
}
function printResult(resultObj) {
    console.log(resultObj.val);
}
button === null || button === void 0 ? void 0 : button.addEventListener("click", () => {
    const num1 = Number(num1Element === null || num1Element === void 0 ? void 0 : num1Element.value);
    const num2 = Number(num2Element === null || num2Element === void 0 ? void 0 : num2Element.value);
    const result = add(num1, num2);
    numResults.push(result);
    const stringResult = add(String(num1), num2);
    textResults.push(stringResult);
    printResult({ val: result, timestamp: new Date() });
    console.log(numResults, textResults);
});
const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("It worked.");
    }, 1000);
});
myPromise.then((result) => {
    console.log(result.split("w"));
});
