const numberPrefixed = pureMobile => {
  let pureMobileString = pureMobile.toString();
  return pureMobileString.length > 8 ? pureMobileString.substring(pureMobileString.length - 8, pureMobileString.length) : pureMobileString
}

const assembleDateString = birthday => {
  const yearOfBirth = birthday.getFullYear();
  const birthDate = birthday.getDate() - 1;
  let monthOfBirth = birthday.getMonth() + 1;
  monthOfBirth < 10 ? monthOfBirth = '0' + monthOfBirth : monthOfBirth = monthOfBirth.toString()
  return birthDate + monthOfBirth + yearOfBirth;
}

const calculateMissingDigits = (finalNumber, finalDate) => {
  let differentDigits = 0;
  const finalNumberArray = finalNumber.split('');
  const finalDateArray = finalDate.split('');
  finalNumberArray.forEach((number, index, array) => {
    const indexFound = finalDateArray.findIndex(value => value === number);
    indexFound === -1 ? differentDigits += 1 : finalDateArray.splice(indexFound, 1);
  })
  return differentDigits;
}

const calculateMobileNumberCost = (mobileNumber, dateOfBirth) => {
  let initialPrice = 39;
  const finalMobileNumber = numberPrefixed(mobileNumber);

  if (finalMobileNumber.length !== 8) {
    return 'The mobile number must be at least 8 characters long';
  }

  const birthDateString = assembleDateString(dateOfBirth);
  const missingDigits = calculateMissingDigits(finalMobileNumber, birthDateString);

  if (finalMobileNumber === birthDateString) {
    initialPrice += 200;
    return initialPrice;
  }

  if (!missingDigits) {
    initialPrice += 100;
    return initialPrice;
  }

  if (missingDigits < 5 && missingDigits > 1) {
    initialPrice += 50;
    return initialPrice;
  }
}

console.log(calculateMobileNumberCost(23031988, new Date(1988, 2, 24)));
