/*
 * Задача 4: «С большой буквы»
 *
 * Напишите функцию capitalize(str). Функция должна возвращать новую
 * строку каждое слово в которой начинается с прописной буквы.
 *
*/

function capitalize(str) {
    str = str.split(' ');
    let cap = '';
    str.forEach(function() {
      for (let i = 0; i < str.length; i++) {
        cap = str[i];
        cap = cap.charAt(0).toUpperCase() + cap.substr(1);
        str[i] = cap;
      }
    })
    return str = str.join(' ');
  }

  // Протестируйте решение, вызывая функцию с разными аргументами:

  console.log(capitalize('молодость всё простит')); // "Молодость Всё Простит"

/* REVIEW. Задание принято. Для доступа в символу строки правильно использован метод charAt*/