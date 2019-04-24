const supplies = {
    pencil: function Pencil(durability, length, eraser) {
        this.write = (paper, writtenContent) => {
            //spaces tells us the number of free spaces to subtract from the wear on the pencil.
            let notFreeCharacters = new RegExp('[^[\\s\\n]', 'g');
            let spaces = writtenContent.replace(notFreeCharacters, '');

            //find the number of capital letters and let them count as 2 lowercase.
            let capitalsOnly = new RegExp('[^A-Z]', 'g');
            let capitals = writtenContent.replace(capitalsOnly, '');

            //if pencil wear is positive, that is how many characters should be written as spaces. Accomodate # of capitals.
            let wear = ((writtenContent.length + capitals.length) - spaces.length) - this.durability;
            //loop through to change "dull marks" to spaces."
            if(wear > 0){
                //Change the string to an array of characters
                var writtenContentCharacters = writtenContent.split('');
                for(var i = 1; i <= wear; i++){
                    writtenContentCharacters[writtenContentCharacters.length - i] = ' ';
                }
                //reset writtenContent to be a string with the appropriate characters removed.
                writtenContent = writtenContentCharacters.join('');
            }
            //if content is undefined, write string with the remaining characters, if content exists, append characters.
            if (paper.content === undefined){
                paper.content = writtenContent;
            } else {
                paper.content = paper.content + writtenContent;
            }
            //subtract the length of the new string from the durability. account for spaces and capitals
            this.durability = this.durability - ((writtenContent.length + capitals.length) - spaces.length);
        };
        this.durability = durability ? durability : 500;
        this.durabilityGrade = durability ? durability : 500;
        this.length = length ? length : 20;
        this.eraserDurability = eraser ? eraser : 20;
        this.sharpen = () => {
            this.length--;
            if(this.length > 0) {
                this.durability = this.durabilityGrade;
            }
        };
        this.erase = (paper, deletion) => {
            //find how many non-free characters are in the deleted string.
            let deletedCharactersSelector = new RegExp('[\\n\\s]', 'g');
            let deletedCharactersOnly = deletion.replace(deletedCharactersSelector, '');
            let startingDurability = this.eraserDurability;
            this.eraserDurability = this.eraserDurability - deletedCharactersOnly.length;
            //find erasure wear and reduce the erased characters by only that much.
            if(this.eraserDurability < 0){
              let shortenedDeletedChars = deletedCharactersOnly.substr(deletedCharactersOnly.length - startingDurability, deletedCharactersOnly.length);
              let shortenedDeletedCharsArray = shortenedDeletedChars.split('');
              for(let j = 0; j < shortenedDeletedCharsArray.length; j++){
                  shortenedDeletedCharsArray[j] = shortenedDeletedCharsArray[j] + '\\s*';
              }
              let regExDel = shortenedDeletedCharsArray.join('');
              //regExDel ='(' + regExDel + ')(?!.*' + regExDel + ')/g';
               deletion = deletion.match(regExDel);
               deletion = deletion.toString();
            }

            //make the blank string that will replace the deleted portion of the string.
            let blanks = [];
            for(let i = 0; i < deletion.length; i++){
                blanks[i] = ' ';
            }
            let blankString = blanks.join('');
            //create a rejex that will match the last instance of the content to be deleted.
            let deletionReg = '(' + deletion + ')(?!.*' + deletion + ')';
            let lastInstanceRegex = new RegExp(deletionReg, 'g');
            paper.content = paper.content.replace(lastInstanceRegex, blankString);
        };
        this.replaceSpace = (paper, replacementString) => {
          //  find the first set of extra spaces and replace with string
            let contentArray = paper.content.split('');
            let replacementArray = replacementString.split('');
            for(let i = 0; i < contentArray.length; i++){
                if(contentArray[i] === ' ' && contentArray[(i-1)] === ' '){
                    let k = i;
                    while(replacementArray[0]) {
                        if(contentArray[k] !== ' '){
                            contentArray[k] = '@';
                        } else {
                            contentArray[k] = replacementArray[0];
                        }
                        k++;
                        replacementArray.shift();
                    }
                }
                paper.content = contentArray.join('');
            }
        };
    },
    paper: function Paper() {
        this.content;
    }

};

module.exports = supplies;
