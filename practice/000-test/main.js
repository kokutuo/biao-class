/* 间歇调用 */
// var num = 0;
// var max = 10;
// var intervalId = null;

// function incrementNumber() {
//   num++;
//   if (num == max) {
//     clearInterval(intervalId);
//     alert('Done');
//   }
// }

// intervalId = setInterval(incrementNumber, 500);


/* 超时调用 模拟 间歇调用 */
// var num = 0;
// var max = 10;

// function incrementNumber() {
//   num++;
//   console.log(num);
//   if (num < max) {
//     setTimeout(incrementNumber, 500);
//   } else {
//     alert('Done');
//   }
// }

// incrementNumber();