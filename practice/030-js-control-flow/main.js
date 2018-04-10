var ageElement = document.querySelector('#age');
var nameElement = document.querySelector('#name');

ageElement.addEventListener('change', function () {
    var age = ageElement.value;
    age = parseInt(age);

    if (!age && age !== 0) {
        console.log('年龄不能为空');
    } else if (age < 1) {
        console.log('are u kiding me?');
    } else if (age < 18) {
        console.log('年龄小于18');
    } else if (age == 18) {
        console.log('刚成年');
    } else if (age < 30) {
        console.log('青年');
    } else {
        console.log('yo');
    }
});

nameElement.addEventListener('change', function () {
    var name = nameElement.value;
    name = name.trim();
    console.log(name);

    if (!name) {
        console.log('姓名不能为空');
    } else {
        console.log(`${name}, 泥猴~`);
    }
});