class Site {
    constructor() {
        this.boards = [];
    }

    addBoard(board) {
        this.boards.find(n => {
            if (n.name === board.name) throw Error('중복된 게시판은 생성할 수 없습니다.');
        });

        this.boards.push(board);
        board.boardExist = true;

    }

    findBoardByName(name) {
        const findBoardName = this.boards.find(board => {
            if (board.name === name) return board;
        });
        return findBoardName;
    }
}

class Board {
    constructor(name) {
        if (name === '' || name === null) throw Error('게시판 이름은 비어있을 수 없습니다.');

        this.name = name;
        this.boardExist = false;
        this.articles = [];
    }

    publish(article) {
        if (!this.boardExist) throw Error('존재하지 않는 게시판 입니다.');
        this.articles.push(article);
        article.id = `${this.name}-${Math.random()}`;
        article.createdDate = new Date().toISOString();
        article.articleExist = true;
    }

    getAllArticles(){
        return this.articles;
    }
}

class Article {
    constructor(article) {
        const {subject, content, author} = article;
        if (subject === '' || subject === null) throw Error('제목은 비어있을 수 없습니다.');
        if (content === '' || content === null) throw Error('내용은 비어있을 수 없습니다.');
        if (author === '' || author === null) throw Error('글쓴이는 비어있을 수 없습니다.');
        this.subject = subject;
        this.content = content;
        this.author = author;
        this.articleExist = false;
        this.comments = [];
    }

    reply(comment) {
        if (!this.articleExist) throw Error('존재하지 않는 게시판 입니다.');
        this.comments.push(comment);
        comment.createdDate = new Date().toISOString();
    }

    getAllComments(){
        return this.comments;
    }

}

class Comment {
    constructor(comment) {
        const {content, author} = comment;
        if (content === '' || content === null) throw Error('댓글은 비어있을 수 없습니다.');
        if (author === '' || author === null) throw Error('글쓴이는 비어있을 수 없습니다.');
        this.content = content;
        this.author = author;
    }

}

module.exports = {
    Site,
    Board,
    Article,
    Comment,
};
