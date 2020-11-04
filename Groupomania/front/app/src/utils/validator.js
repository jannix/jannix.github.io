export const validatorsRules = {
    namePattern: '[a-zA-Z ,.\'-]{2,}$',
    addressPattern: '[a-zA-Z0-9~#^*()[\\]{}|\\\\,.: -]{3,}$',
    zipPattern: '[a-zA-Z0-9 -]{2,}$',
    emailPattern: '^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,4})+$',
};//TODO: Get the patterns from server

export function matchPattern(value, pattern) {
    const regex = new RegExp(pattern);
    return regex.test(value);
}
