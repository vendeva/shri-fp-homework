/**
 * @file Домашка по FP ч. 2
 *
 * Подсказки:
 * Метод get у инстанса Api – каррированый
 * GET / https://animals.tech/{id}
 *
 * GET / https://api.tech/numbers/base
 * params:
 * – number [Int] – число
 * – from [Int] – из какой системы счисления
 * – to [Int] – в какую систему счисления
 *
 * Иногда промисы от API будут приходить в состояние rejected, (прямо как и API в реальной жизни)
 * Ответ будет приходить в поле {result}
 */
import {
    allPass,
    compose,
    equals,
    filter,
    reject,
    lte,
    test,
    toString,
    countBy,
    reduce,
    max,
    prop,
    not,
    length,
    values,
    gte,
} from "ramda";

import Api from "../tools/api";

const api = new Api();

const validationValue = allPass([
    test(/[0-9]\./),
    lte(1),
    compose(allPass([gte(10), lte(2)]), length),
]);

const wait = (time) =>
    new Promise((resolve) => {
        setTimeout(resolve, time);
    });

const processSequence = ({ value, writeLog, handleSuccess, handleError }) => {
    writeLog(value);

    // Валидация входных данных
    validationValue(value);

    api.get("https://api.tech/numbers/base", { from: 2, to: 10, number: "01011010101" }).then(
        ({ result }) => {
            writeLog(result);
        }
    );

    wait(2500)
        .then(() => {
            writeLog("SecondLog");

            return wait(1500);
        })
        .then(() => {
            writeLog("ThirdLog");

            return wait(400);
        })
        .then(() => {
            handleSuccess("Done");
        });
};

export default processSequence;
