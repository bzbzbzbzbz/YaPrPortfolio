/*
 * Задача 2: «FizzBuzz»
 *
 * Напишите функцию fizzBuzz(n), принимающую как аргумент натуральное число.
 * Функция должна выводить в консоль числа от 1 до n, заменяя числа:
 *
 * • кратные трём — на fizz;
 * • кратные пяти — на buzz;
 * • кратные и трём, и пяти одновременно — на fizzbuzz.
 *
*/

function fizzBuzz(num) {
    for (let i = 1; i <= num; i++) {
      if (Number.isInteger(i / 3) && Number.isInteger(i / 5)) {
        console.log("fizzbuzz");
      } else if (Number.isInteger(i / 3)) {
        console.log("fizz");
      } else if (Number.isInteger(i / 5)) {
        console.log("buzz");
      } else {
        console.log(i);
      }
    }
}

// Протестируйте решение, вызывая функцию с разными аргументами:

/*REVIEW. Можно лучше. Нижеследующий вызов fizzBuzz через console.log выведет в консоль undefined, поскольку в fizzBuzz
нет инструкции return с каким-либо возвращаемым значением (такие функции и возвращают undefined). Поэтому вызов fizzBuzz
нужно делать непосредственно: fizzBuzz(15), а не внутри сonsole.log */
console.log(fizzBuzz(15));

/* REVIEW. Задание принято. */