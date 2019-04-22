const supplies = {
    pencil: function Pencil(durability) {
        this.write = (paper, writtenContent) => {
            //Change the string to an array of characters
            var writtenContentCharacters = writtenContent.split('');
            //spaces tells us the number of free spaces to subtract from the wear on the pencil.
            let spaces = 0;
            for(var i = 0; i < writtenContentCharacters.length; i++){
                if(writtenContentCharacters[i] === ' ' || writtenContentCharacters[i] === '\n') {
                    spaces++;
                }
            }
            //find the number of capital letters and let them count as 2 lowercase.
            let capitals = 0;
            for(var i = 0; i < writtenContentCharacters.length; i++){
                if(writtenContentCharacters[i].match(/[A-Z]/g) ) {
                    capitals++;
                }
            }
            //if Wear is positive, that is how many characters should be written as spaces. Accomodate # of capitals.
            let wear = ((writtenContent.length + capitals) - spaces) - this.durability;
            //loop through to change "dull marks" to spaces."
            if(wear > 0){
                for(var i = 1; i <= wear; i++){
                    writtenContentCharacters[writtenContentCharacters.length - i] = ' ';
                }
            }
            //reset writtenContent to be a string with the appropriate characters removed.
            writtenContent = writtenContentCharacters.join('');
            //if content is undefined, write string with the remaining characters, if content exists, append characters.
            if (paper.content === undefined){
                paper.content = writtenContent;
            } else {
                paper.content = paper.content + writtenContent;
            }
            //subtract the length of the new string from the durability. account for spaces and capitals
            this.durability = this.durability - ((writtenContent.length + capitals) - spaces);
        },
            this.durability = durability ? durability : 500;
    },
    paper: function Paper() {
        this.content;
    }

};

module.exports = supplies;
