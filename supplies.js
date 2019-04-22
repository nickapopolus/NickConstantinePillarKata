const supplies = {
    pencil: function Pencil(durability) {
        this.write = (paper, writtenContent) => {
            if (paper.content == undefined){
                paper.content = writtenContent;
            } else {
                paper.content = paper.content + writtenContent;
            }
        },
            this.durability = durability ? durability : 500;
    },
    paper: function Paper() {
        this.content;
    }

};

module.exports = supplies;
