import { IAddressInterface, IUserInterface } from './interface';

// parent Validators

export function createUserValidator(data: IUserInterface) {
    nameValidators(data.name);
    emailValidators(data.email);
    passwordValidators(data.password);
    phoneNumberValidators(data.mobileNumber);
    roleValidatiors(data.role);
    addressValidators(data.address);
}
// name validation

export function nameValidators(name: string) {
    const stringValidations = stringValidators(name);
    if (!stringValidations)
        throw new Error('The name should be less than 15 characters');
    return name;
}

// Email is validated here
export function emailValidators(email: string) {
    const stringValidations = stringValidators(email);
    const emailRegex =
        /([-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|"([]!#-[^-~ \t]|(\\[\t -~]))+")@([0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?(\.[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?)*|\[((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|IPv6:((((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){6}|::((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){5}|[0-9A-Fa-f]{0,4}::((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){4}|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):)?(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){3}|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){0,2}(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){2}|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){0,3}(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){0,4}(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::)((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3})|(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3})|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){0,5}(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3})|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){0,6}(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::)|(?!IPv6:)[0-9A-Za-z-]*[0-9A-Za-z]:[!-Z^-~]+)])/;
    if (!stringValidations)
        throw new Error(
            'The email should be string and also should be a length of 50 characters',
        );
    if (!email.match(emailRegex))
        throw new Error('Enter a valid email address');
    return email;
}

// Password is validated here
export function passwordValidators(password: string) {
    const stringValidations = stringValidators(password);

    const passwordRegx =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/;
    if (!password.match(passwordRegx))
        throw new Error(
            'The password does not met the credentials and also should be a length of 8 to 10',
        );
    if (!stringValidations) {
        throw new Error('The password should be a string ');
    }

    return password;
}

// number validation
export function phoneNumberValidators(mobileNumber: string) {
    const stringValidations = stringValidators(mobileNumber);

    if (typeof mobileNumber !== 'string')
        throw new Error('Mobile number should be a number not a character');

    if (!stringValidations) {
        throw new Error('The phone number should be a less than length');
    }
}

// role validation
export function roleValidatiors(role: string) {
    const stringValidations = stringValidators(role);

    if (role !== 'USER' && role !== 'ADMIN')
        throw new Error('Role should be either USER or ADMIN');
}

// address validation

export function addressValidators(address: IAddressInterface) {
    for (const key in address) {
        const stringValidations = stringValidators(address[key]);
        if (!address[key]) {
            throw new Error(key + ' should not be empty');
        }
        if (!stringValidations) {
            throw new Error(key + ' should be a less than 50 character');
        }
    }
}

// validators for string input

export function stringValidators(data: string) {
    if (data.length <= 50 && typeof data! == 'string') return true;
}
