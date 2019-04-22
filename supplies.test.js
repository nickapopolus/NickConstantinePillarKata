const supplies = require('./supplies');

test('If we create a pencil, the pencil exists.', () => {
    //I know I changed my test here and that is kind of a no no, but I didn't write the test correctly.
    //I looked up the documentation for the library and fixed my test.
   expect(supplies.pencil).toBeDefined();
});

test('if we create a paper, the pencil exists.', () => {
    expect(supplies.Paper()).toBeDefined();
});


test('if we create a specific pencil, that pencil exists', () => {
    var ticonderoga = new supplies.pencil;
    expect(ticonderoga).toBeDefined();
});
