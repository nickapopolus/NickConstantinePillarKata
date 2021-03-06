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

//At this point, I'm aware that I'm instantiating a pencil in almost every test. I know it's important to refactor to
//generate at least one pencil and ideally a pencil and a piece of paper before every test, but I've never used a
//testing library before and when I went over the documentation for a before statement, I couldn't figure it after 10
//minutes and I thought running the tests and acknowledging I am repeating myself a lot will have to do until
//I can take a break to dive into the documentation a little more. I also realize using comments to talk to you
//directly isn't best practice.

test('The pencil will be able to write only a limited number of characters before it goes dull.', () => {
    var ticonderoga = new supplies.pencil(20);
    var dunderMifflin60LBS = new supplies.paper;
    ticonderoga.write(dunderMifflin60LBS, 'TormundGiantsbane');
    expect(ticonderoga.durability).toBe(1);
});

test('After it goes dull, every character it is directed to write will appear as a space', () => {
    var ticonderoga = new supplies.pencil(20);
    var dunderMifflin60LBS = new supplies.paper;
    ticonderoga.write(dunderMifflin60LBS, 'TormundAndBrianne4Ever');
    expect(dunderMifflin60LBS.content).toBe("TormundAndBriann      ");
    expect(ticonderoga.durability).toBe(-6);
});

test('Writing spaces and newlines expends no graphite, therefore "writing" these characters should not affect the pencil point.', () => {
    var ticonderoga = new supplies.pencil(100);
    var dunderMifflin60LBS = new supplies.paper;
    ticonderoga.write(dunderMifflin60LBS, 'Tormund And Brianne \n 4 Ever');
    expect(ticonderoga.durability).toBe(74);
});

test('Lowercase letters should degrade the pencil point by a value of one, and capital letters should degrade the point by two.', () => {
    var ticonderoga = new supplies.pencil(4);
    var dunderMifflin60LBS = new supplies.paper;
    ticonderoga.write(dunderMifflin60LBS, 'Text');
    expect(dunderMifflin60LBS.content).toBe('Tex ');
});

//^^ For this last test, the feature changed the result of other tests I had written. Is it okay to go through and change
//the tests to expect what the new values should be as I have done here?


test('When a pencil is sharpened, it regains its initial point durability and can write more characters before it goes dull again.', () => {
    var ticonderoga = new supplies.pencil(10);
    var dunderMifflin60LBS = new supplies.paper;
    ticonderoga.write(dunderMifflin60LBS, 'lumberjacks');
    ticonderoga.sharpen();
    ticonderoga.write(dunderMifflin60LBS, 'lumberjacks');
    expect(dunderMifflin60LBS.content).toBe('lumberjack lumberjack ');
    ticonderoga.sharpen();
    expect(ticonderoga.durability).toBe(10);
});

test('The pencil\'s length is reduced by one each time it is sharpened.', () => {
    var ticonderoga = new supplies.pencil(10, 3);
    ticonderoga.sharpen();
    expect(ticonderoga.length).toBe(2);
});

test('When a pencil\'s length is zero, then sharpening it no longer restores its point durabliity', () => {
    var ticonderoga = new supplies.pencil(10, 1);
    var dunderMifflin60LBS = new supplies.paper;
    ticonderoga.sharpen();
    ticonderoga.write(dunderMifflin60LBS, 'Lumberjacks');
    ticonderoga.sharpen();
    expect(ticonderoga.durability).toBeLessThan(0);
});

test('When the pencil is instructed to erase text from the paper, the last occurrence of that text on the paper will be replaced with empty spaces.', () => {
    var ticonderoga = new supplies.pencil(100, 10);
    var dunderMifflin60LBS = new supplies.paper;
    ticonderoga.write(dunderMifflin60LBS, 'How much wood would a woodchuck chuck if a woodchuck could chuck wood?');
    ticonderoga.erase(dunderMifflin60LBS, 'chuck');
    expect(dunderMifflin60LBS.content).toBe('How much wood would a woodchuck chuck if a woodchuck could       wood?');
    ticonderoga.erase(dunderMifflin60LBS, 'chuck');
    expect(dunderMifflin60LBS.content).toBe('How much wood would a woodchuck chuck if a wood      could       wood?');
});

test('When a pencil is created, it can be provided with a value for eraser durability.', () => {
    var ticonderoga = new supplies.pencil(100, 10, 300);
    expect(ticonderoga.eraserDurability).toBe(300);
});

test('All characters except for white space should degrade the eraser by a value of one', () => {
    var ticonderoga = new supplies.pencil(100, 10, 300);
    var dunderMifflin60LBS = new supplies.paper;
    ticonderoga.write(dunderMifflin60LBS, "That's what she said.");
    ticonderoga.erase(dunderMifflin60LBS, 'said');
    expect(ticonderoga.eraserDurability).toBe(296);
});

test('Text should be erased in the opposite order it was written. Once the eraser durability is zero, the eraser is worn out and can no longer erase.', () => {
    var ticonderoga = new supplies.pencil(100, 10, 3);
    var dunderMifflin60LBS = new supplies.paper;
    ticonderoga.write(dunderMifflin60LBS, 'Buffalo Bill');
    ticonderoga.erase(dunderMifflin60LBS, 'Buffalo Bill');
    expect(dunderMifflin60LBS.content).toBe("Buffalo B   ");
});

test('Once text has been erased from the paper, a pencil may be instructed to write new text over the resulting white space.', () => {
    var ticonderoga = new supplies.pencil(100, 10, 100);
    var dunderMifflin60LBS = new supplies.paper;
    ticonderoga.write(dunderMifflin60LBS, 'An apple a day keeps the doctor away');
    ticonderoga.erase(dunderMifflin60LBS, 'apple');
    ticonderoga.replaceSpace(dunderMifflin60LBS, 'onion');
    expect(dunderMifflin60LBS.content).toBe('An onion a day keeps the doctor away');
});

test('If the new text is longer than the allocated whitespace and thus would collide with other existing non-whitespace ' +
    'characters on the page, these character collisions should be represented by the "@" character.', () => {
    var ticonderoga = new supplies.pencil(100, 10, 100);
    var dunderMifflin60LBS = new supplies.paper;
    ticonderoga.write(dunderMifflin60LBS, 'An apple a day keeps the doctor away');
    ticonderoga.erase(dunderMifflin60LBS, 'apple');
    ticonderoga.replaceSpace(dunderMifflin60LBS, 'artichoke');
    expect(dunderMifflin60LBS.content).toBe('An artich@k@ay keeps the doctor away');
});
