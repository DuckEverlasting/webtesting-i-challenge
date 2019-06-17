module.exports = {
  succeed,
  fail,
  repair,
  get
};

function succeed(item) {
  const enhanceInc = item.enhancement >= 20 ? 0 : 1;
  return {
    ...item,
    enhancement: item.enhancement + enhanceInc
  };
}

function fail(item) {
  const durabilityDec = item.enhancement < 15 ? 5 : 10;
  const enhanceDec = item.enhancement <= 16 ? 0 : 1;
  return {
    ...item,
    durability: item.durability - durabilityDec,
    enhancement: item.enhancement - enhanceDec
  };
}

function repair(item) {
  return {
    ...item,
    durability: 100
  };
}

function get(item) {
  const newName = item.enhancement <= 0 ? item.name : `+${item.enhancement} ${item.name}`
  return {
    ...item,
    name: newName
  };
}
