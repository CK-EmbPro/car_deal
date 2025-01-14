import { Dispatch, SetStateAction } from "react";
import { CountryCode, parsePhoneNumberFromString } from 'libphonenumber-js';
import PhoneInput, { CountryData } from "react-phone-input-2";

// Update the checkValidPhoneNumber to expect countryCode as a string
export const checkValidPhoneNumber = (value: string, countryCode: CountryCode, setIsInvalid: Dispatch<SetStateAction<boolean>>): boolean => {
    try {
        const phoneNumber = parsePhoneNumberFromString(value, countryCode); // Use countryCode as a string
        const isValid = phoneNumber ? phoneNumber.isValid() : false;
        setIsInvalid(isValid); // Update the state based on validity
        return isValid;
    } catch (error) {
        setIsInvalid(false); // If any error occurs, set validity to false
        return false;
    }
};
