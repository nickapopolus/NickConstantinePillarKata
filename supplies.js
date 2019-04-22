const supplies = {
    pencil: function Pencil() {
        this.write = (paper, writtenContent) => {
            if (paper.content == undefined){
                paper.content = writtenContent;
            } else {
                paper.content = paper.content + writtenContent;
            }
        }
    },
    paper: function Paper() {
        this.content;
    }

};

module.exports = supplies;
