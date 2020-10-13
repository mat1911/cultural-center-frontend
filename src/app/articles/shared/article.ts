export interface IArticle{
    id: number;
    title: string;
    content: string;
    pictureUrl: string;
    sinceDate: Date;
    rate: number;
    isAccepted: boolean;
    authorName: string;
    authorSurname: string;
    authorId: number
}