const num = Number(window.prompt('Введіть чісло'));

function isEven(num) {
  const isEven = num % 2 === 0;

  if (isEven) {
    window.alert(`${num} - парне число`);
  } else {
    window.alert(`${num} - непарне число`);
  }
  return isEven;
}

isEven(num);

//====================

// основга программа
const num1 = Number(window.prompt('Введіть перше чісло'));
const num2 = Number(window.prompt('Введіть друге чісло'));

const result = numSubsequenceSum(num1, num2);

if (typeof result === 'number') {
  window.alert(`Cумма: ${result}`);
}

// підпрограмма
function numSubsequenceSum(n1, n) {
  if (isNaN(n1) || isNaN(n)) {
    window.alert(`Введіть чісла!`);
    return;
  }

  if (n1 > n) {
    window.alert(`${n1} повіна бути більше ниж ${n}`);
    return;
  }

  let sum = n1;
  let curNum = n1;

  while (curNum < n) {
    sum += ++curNum;
  }

  return sum;
}

//====================

mediaArray(createRandomArray(100));

function createRandomArray(length) {
  return Array.from({ length }, () => Math.floor(Math.random() * length));
}

function mediaArray(nums) {
  return nums.reduce((a, b) => a + b) / nums.length;
}

//====================

function createRandomArray(length) {
  return Array.from({ length }, () => Math.floor(Math.random() * length));
}

function createRandomMatr(rowLength, columsLength) {
  return Array(rowLength)
    .fill()
    .map(() => createRandomArray(columsLength));
}

function printMatr(matrix) {
  let matrixRepresentation = '';

  matrix.forEach((el) => {
    matrixRepresentation += `${el}\n`;
  });

  console.log(matrixRepresentation);
}

function modifyMatr(matrix) {
  const newMatrix = matrix.map((row) => {
    const first = row.shift();
    const last = row.pop();
    row.push(first);
    row.unshift(last);
    return row;
  });

  return newMatrix;
}

const matrix = createRandomMatr(10, 10);
printMatr(matrix);
const modMatrix = modifyMatr(matrix);
printMatr(modMatrix);
