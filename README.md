# Credit Card Validator

## Overview
This repository contains a JavaScript file that validates credit card numbers using regular expressions. Additionally, it determines the type of card (Visa, MasterCard, American Express, etc.) based on the provided number.

## Features
- **Validation:** Uses regex patterns to check if a given credit card number is valid.
- **Card Type Detection:** Identifies the card type based on its number format.
- **Simple and Efficient:** Lightweight JavaScript implementation without external dependencies.

## Supported Card Types
The script can identify and validate the following card types:
- Visa
- MasterCard
- American Express
- Discover
- Diners Club
- JCB

## Usage

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/credit-card-validator.git
   ```
   
## Functions

### `validateCard(cardNumber)`
- **Input:** A string representing the credit card number.
- **Output:** If card number is valid returns an object with details of if the number is valid and the card type, if is not valid an object is also returned stating so.

### `luhnCheck(cardNumber)`
- **Input:** A string representing the credit card number.
- **Output:** Returns the type of the card (e.g., 'Visa', 'MasterCard') or `null` if unknown.
- **Algorithm:** Uses Luhn's sum of numbers to validate if card number is valid will be used in the **validateCard** function.
