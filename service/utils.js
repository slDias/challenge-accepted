this.fitString = function(inputStr) {
  return inputStr
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]|\s/g, "");
}

this.parseDateString = function(dateString) {
  let splittedDate = dateString.split("-");
  return new Date(splittedDate[0], splittedDate[1], splittedDate[2]);
}

module.exports = this;
