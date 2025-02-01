function validateCreditCard(cardNumber) {
  // Remove spaces and dashes
  cardNumber = cardNumber.replace(/\D/g, "");

  // Card type detection based on prefixes and length
  const cardTypes = {
    visa: /^4\d{12}(\d{3})?$/, // Visa: 13 or 16 digits, starts with 4
    mastercard: /^5[1-5]\d{14}$/, // Mastercard: 16 digits, starts with 51-55
    amex: /^3[47]\d{13}$/, // American Express: 15 digits, starts with 34 or 37
    discover: /^6(?:011|5\d{2})\d{12}$/, // Discover: 16 digits, starts with 6011 or 65
    diners: /^3(?:0[0-5]|[68]\d)\d{11}$/, // Diners Club: 14 digits, starts with 300-305, 36, 38
    jcb: /^(?:2131|1800|35\d{3})\d{11}$/, // JCB: 15 or 16 digits
  };

  let cardType = null;
  for (let type in cardTypes) {
    if (cardTypes[type].test(cardNumber)) {
      cardType = type.charAt(0).toUpperCase() + type.slice(1); // Capitalize first letter
      break;
    }
  }

  if (!cardType) {
    return {
      valid: false,
      message: "Invalid card number format",
      cardType: null,
    };
  }

  // Validate using the Luhn algorithm
  if (!luhnCheck(cardNumber)) {
    return {
      valid: false,
      message: "Invalid card number (failed Luhn check)",
      cardType: cardType,
    };
  }

  return { valid: true, message: "Valid card number", cardType: cardType };
}

// Luhn Algorithm to check if a credit card number is valid
function luhnCheck(number) {
  let sum = 0;
  let alternate = false;
  for (let i = number.length - 1; i >= 0; i--) {
    let digit = parseInt(number[i], 10);
    if (alternate) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    alternate = !alternate;
  }
  return sum % 10 === 0;
}

// Test cases
const testCards = [
  "4111111111111111", // Visa
  "5500000000000004", // Mastercard
  "340000000000009", // Amex
  "6011000000000004", // Discover
  "30000000000004", // Diners Club
  "3530111333300000", // JCB
  "1234567812345670", // Invalid
];

testCards.forEach((card) => {
  const result = validateCreditCard(card);
  console.log(
    `Card: ${card} -> Valid: ${result.valid}, Type: ${result.cardType}, Message: ${result.message}`
  );
});
