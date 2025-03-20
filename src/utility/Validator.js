export const validateSpace = /^\S*$/; // a string consisting only of non-whitespaces

export const validateUserName = userName => {
    const re = /^([a-zA-Z]+\s?)*$/; //NOSONAR
    return re.test(userName);
};

export const validateFirstName = firstName => {
    const re = /^[A-Za-z'-]{2,50}$/;
    return re.test(String(firstName).trim());
};

export const validateLastName = lastName => {
    const re = /^[A-Za-z'-]{2,50}$/;
    return re.test(String(lastName).trim());
};


export const validatePhoneNumber = phoneNumber => {
    const re = /^([4-9][0-9]{9})*$/; //NOSONAR
    return re.test(phoneNumber);
};
export const validatePin = pin => {
    const re = /^([1-9]{1}[0-9]{5}|[1-9]{1}[0-9]{3}\\s[0-9]{3})*$/; //NOSONAR
    return re.test(pin);
};


export const validateEmail = email => {
    const re =
        /^(([^<>()[\]\\.,;:!\s@\"]+(\.[^<>()[\]\\.,;:!\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; //NOSONAR
    return re.test(String(email).toLowerCase());
};

export const validatePassword = password => {
    const re = /^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[.@#$%^&+=]).*$/; //NOSONAR
    return re.test(password);
};


export const isTrimmed = s => {
    return !/(^\s)|(\s$)/.test(s); //NOSONAR
};

export const arrayValidator = productItems => {
    let isArray =
        productItems && Array.isArray(productItems) && productItems.length > 0;
    return isArray;
};



