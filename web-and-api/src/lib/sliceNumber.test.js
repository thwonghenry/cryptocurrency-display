import sliceNumber from './sliceNumber';

test('should handle invalid input', () => {
    const result = sliceNumber(undefined, 2);
    expect(result).toBe(undefined);
});

test('should return original number if too short', () => {
    const number = 1.234;
    const expected = '1.234';
    const result = sliceNumber(number, 10);
    expect(result).toBe(expected);
});

test('should slice number if too long', () => {
    const number = 1.234;
    const expected = '1.23';
    const result = sliceNumber(number, 4);
    expect(result).toBe(expected);
});

test('should slice the dot if the last character is dot', () => {
    const number = 1.234;
    const expected = '1';
    const result = sliceNumber(number, 2);
    expect(result).toBe(expected);
});

