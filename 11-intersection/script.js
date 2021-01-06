/*
 * Задача 11: «Пересечения массивов»
 *
 * Напишите функцию intersection(arr1, arr2). Она должна принимать
 * на вход два массива целых чисел. Функция должна вернуть новый
 * массив чисел, содержащихся в обоих исходных массивах.
 *
*/

function intersection(arr1, arr2) {
    let a = arr1.length;
    let newarr = [];
    for (let i = 0; i < a - 1; i++) {
      if (arr2.includes(arr1[i])) {
        newarr.push(arr1[i]);
      }
    }
    return newarr = [...new Set(newarr)];
  }

  // Протестируйте решение, вызывая функцию с разными аргументами:

  console.log(intersection([1, 5, 4, 2], [8, 91, 4, 1, 3])); // [4, 1]
  console.log(intersection([1, 5, 4, 2], [7, 12])); // []
  console.log(intersection([1, 1, 5, 4, 2], [8, 91, 4, 1, 1, 3])); // []
/* REVIEW. Задание принято.*/