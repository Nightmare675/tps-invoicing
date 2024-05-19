const fs = require("fs");
const faker = require("@faker-js/faker");
const ExcelJS = require("exceljs");

function shuffleArray(_array) {
  const array = [..._array];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

function getName() {
  const prob = Math.random();
  if (prob < 0.15) {
    return `${faker.fakerES_MX.person.firstName(
      "female"
    )} ${faker.fakerES_MX.person.lastName("female")}`;
  } else {
    return `${faker.fakerES_MX.person.firstName(
      "male"
    )} ${faker.fakerES_MX.person.lastName("male")}`;
  }
}

const target = 1346065;

const products = [
  {
    name: "THE COMPLETE GUIDE TO BECOMING A SOFTWARE ARCHITECT",
    value: 15590,
  },
  {
    name: "HOW TO BECOME AN OUTSTANDING SOLUTION ARCHITECT",
    value: 13590,
  },
  {
    name: "DESIGN MICROSERVICES ARCHITECTURE WITH PATTERNS & PRINCIPLES",
    value: 14590,
  },
  {
    name: "SOFTWARE ARCHITECTURE & TECHNOLOGY OF LARGE-SCALE SYSTEMS",
    value: 14590,
  },
];

function addUp(target) {
  if (target < 0) {
    return null;
  }
  if (target < 500) {
    return [];
  }
  for (const product of shuffleArray(products)) {
    const subresult = addUp(target - product.value);
    if (subresult !== null) {
      return [product, ...subresult];
    }
  }
  return null;
}

const result = addUp(target);
console.log((target - result.reduce((a, b) => a + b.value, 0)) / 100);

fs.writeFileSync(
  "./result.csv",
  result
    .map((item) => `${getName()},${item.name},${(item.value / 100).toFixed(2)}`)
    .join("\n"),
  {
    encoding: "utf8",
  }
);

const workbook = new ExcelJS.Workbook();
const worksheet = workbook.addWorksheet();
workbook
  .addWorksheet()
  .addRows(
    result.map((item) => [
      getName(),
      item.name,
      Number.parseFloat((item.value / 100).toFixed(2)),
    ])
  );
workbook.xlsx.writeFile("./asd.xlsx");
