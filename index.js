const fs = require("fs");
const faker = require("@faker-js/faker");
const { probFemale, probUSA, products, target } = require("./values");

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
  const fakerModule =
    Math.random() < probUSA ? faker.fakerEN : faker.fakerES_MX;
  if (Math.random() < probFemale) {
    return `${fakerModule.person.firstName(
      "female"
    )} ${fakerModule.person.lastName("female")}`;
  } else {
    return `${fakerModule.person.firstName(
      "male"
    )} ${fakerModule.person.lastName("male")}`;
  }
}

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
