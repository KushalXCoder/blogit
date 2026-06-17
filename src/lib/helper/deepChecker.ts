export const deepChecker = (obj1: Object, obj2: Object): boolean => {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
}