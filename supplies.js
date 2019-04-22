const supplies = {
    pencil: function Pencil(durability) {
        this.write = (paper, writtenContent) => {
            //if Wear is positive, that is how many characters should be written as spaces.
            let wear = writtenContent.length - this.durability;
            //Change the string to an array of characters and loop through to change "dull marks" to spaces."
            if(wear > 0){
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
            //subtract the length of the new string from the durability.
            this.durability = this.durability - writtenContent.length;
        },
            this.durability = durability ? durability : 500;
    },
    paper: function Paper() {
        this.content;
    }

};

module.exports = supplies;
