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
    lte,
    test,
    tap,
    __,
    modulo,
    otherwise,
    andThen,
    prop,
    length,
    replace,
    gte,
    ifElse,
} from "ramda";

import Api from "../tools/api";

const api = new Api();

const validationValue = allPass([
    test(/^[0-9]+(\.)?[0-9]+$/),
    lte(1),
    compose(allPass([gte(9), lte(3)]), length),
]);

const processSequence = ({ value, writeLog, handleSuccess, handleError }) => {
    writeLog(value);

    ifElse(
        validationValue,
        compose(
            andThen(
                ifElse(
                    test(/^[0-1]+$/),
                    compose(
                        otherwise(compose(tap(writeLog), (error) => `Ошибка запроса: ${error}`)),
                        andThen(compose(handleSuccess, prop("result"))),
                        api.get(__, {}),
                        replace("{id}", __, `https://animals.tech/{id}`),
                        tap(writeLog),
                        modulo(__, 3),
                        tap(writeLog),
                        (number) => number ** 2,
                        tap(writeLog),
                        length,
                        tap(writeLog)
                    ),
                    tap(writeLog)
                )
            ),
            otherwise((error) => `Ошибка запроса: ${error}`),
            andThen(prop("result")),
            api.get("https://api.tech/numbers/base"),
            (n) => ({ from: 10, to: 2, number: n }),
            tap(writeLog),
            Math.round,
            Number
        ),
        () => handleError("ValidationError")
    )(value);
};

export default processSequence;
