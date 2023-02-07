export type Article = {
    date: string,
    id: string,
    title: string
}

export type ArticlesComment = {
    article: string,
    id: number,
    text: string,
    user: string,
}

export type ArticleItem = {
    date: string,
    id: string,
    text: string,
    title: string
}