const supplies = {
    pencil: function Pencil() {
        this.write = (paper, writtenContent) => {
            paper.content = writtenContent;
        }
    },
    paper: function Paper() {
        this.content;
    }

};

module.exports = supplies;
