/**
 * @file Домашка по FP ч. 1
 *
 * Основная задача — написать самому, или найти в FP библиотеках функции anyPass/allPass
 * Эти функции/их аналоги есть и в ramda и в lodash
 *
 * allPass — принимает массив функций-предикатов, и возвращает функцию-предикат, которая
 * вернет true для заданного списка аргументов, если каждый из предоставленных предикатов
 * удовлетворяет этим аргументам (возвращает true)
 *
 * anyPass — то же самое, только удовлетворять значению может единственная функция-предикат из массива.
 *
 * Если какие либо функции написаны руками (без использования библиотек) это не является ошибкой
 */
import {
    anyPass,
    allPass,
    compose,
    equals,
    filter,
    reject,
    lte,
    countBy,
    reduce,
    max,
    prop,
    not,
    length,
    values,
} from "ramda";
import { SHAPES, COLORS } from "../constants";

const { TRIANGLE, SQUARE, CIRCLE, STAR } = SHAPES;
const { RED, BLUE, ORANGE, GREEN, WHITE } = COLORS;

const getTriangle = prop(TRIANGLE);
const getSquare = prop(SQUARE);
const getCircle = prop(CIRCLE);
const getStar = prop(STAR);

const isRed = equals(RED);
const isBlue = equals(BLUE);
const isOrange = equals(ORANGE);
const isGreen = equals(GREEN);
const isWhite = equals(WHITE);

const filterDataByColor = (fn) => (data) => filter(fn, data);

const countItemsByColor = (fn) => compose(length, values, filterDataByColor(fn));

// 1. Красная звезда, зеленый квадрат, все остальные белые.
export const validateFieldN1 = allPass([
    compose(isRed, getStar),
    compose(isGreen, getSquare),
    compose(equals(2), countItemsByColor(isWhite)),
]);

// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = compose(lte(2), countItemsByColor(isGreen));

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = allPass([
    compose(lte(1), countItemsByColor(isBlue)),
    compose(lte(1), countItemsByColor(isRed)),
    (d) => equals(countItemsByColor(isBlue)(d), countItemsByColor(isRed)(d)),
]);

// 4. Синий круг, красная звезда, оранжевый квадрат треугольник любого цвета
export const validateFieldN4 = allPass([
    compose(isBlue, getCircle),
    compose(isRed, getStar),
    compose(isOrange, getSquare),
]);

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 = compose(
    lte(3),
    reduce(max, 0),
    values,
    countBy((d) => d),
    reject(isWhite),
    values
);

// 6. Ровно две зеленые фигуры (одна из зелёных – это треугольник), плюс одна красная. Четвёртая оставшаяся любого доступного цвета, но не нарушающая первые два условия
export const validateFieldN6 = allPass([
    compose(equals(2), countItemsByColor(isGreen)),
    compose(isGreen, getTriangle),
    compose(equals(1), countItemsByColor(isRed)),
]);

// 7. Все фигуры оранжевые.
export const validateFieldN7 = compose(equals(4), countItemsByColor(isOrange));

// 8. Не красная и не белая звезда, остальные – любого цвета.
export const validateFieldN8 = allPass([
    compose(not, isRed, getStar),
    compose(not, isWhite, getStar),
]);

// 9. Все фигуры зеленые.
export const validateFieldN9 = compose(equals(4), countItemsByColor(isGreen));

// 10. Треугольник и квадрат одного цвета (не белого), остальные – любого цвета
export const validateFieldN10 = allPass([
    compose(not, isWhite, getTriangle),
    compose(not, isWhite, getTriangle),
    (d) => equals(getTriangle(d), getSquare(d)),
]);
