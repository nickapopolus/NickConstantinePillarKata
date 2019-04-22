const supplies = require('./supplies');

test('If we create a pencil, the pencil exists.', () => {
    //I know I changed my test here and that is kind of a no no, but I didn't write the test correctly.
    //I looked up the documentation for the library and fixed my test.
   expect(supplies.pencil).toBeDefined();
});

//Is it okay to change your test once you refactor your code? The name and type of my function changed, so is
//it okay to change in the test or am I stuck with it?
test('if we create a paper, the pencil exists.', () => {
    expect(supplies.paper).toBeDefined();
});


test('if we create a specific pencil, that pencil exists', () => {
    var ticonderoga = new supplies.pencil;
    expect(ticonderoga).toBeDefined();
});

test('if we create a specific piece of paper, that paper exists', () => {
    var dunderMifflin60LBS = new supplies.paper;
    expect(dunderMifflin60LBS).toBeDefined();
});

//Here I am wondering what is the limit of what we can create in the scope of a single test.
//Is creating a function and a variable to hold that function out of bounds? Do I have to do each one separately
//for proper TDD?
test('When the pencil is instructed to write a string of text on a sheet of paper, the paper should reflect the text that was written.', () => {
    var ticonderoga = new supplies.pencil;
    var dunderMifflin60LBS = new supplies.paper;
    ticonderoga.write(dunderMifflin60LBS, 'She sells sea shells');
    expect(dunderMifflin60LBS.content).toBe('She sells sea shells');
});

test('Text written by the pencil should always be appended to existing text on the paper.', () => {
    var ticonderoga = new supplies.pencil;
    var dunderMifflin60LBS = new supplies.paper;
    ticonderoga.write(dunderMifflin60LBS, 'She sells sea shells');
    ticonderoga.write(dunderMifflin60LBS, ' down by the sea shore');
    expect(dunderMifflin60LBS.content).toBe('She sells sea shells down by the sea shore');
});

test('When a pencil is created, it can be provided with a value for point durability.', () => {
    var ticonderoga = new supplies.pencil(20);
    expect(ticonderoga.durability).toBe(20);
});
