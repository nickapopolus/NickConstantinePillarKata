test('If we create a pencil, the pencil exists.', () => {
   expect(supplies.createPencil().checkValue(undefined)).not.toBeFalsy();
});
