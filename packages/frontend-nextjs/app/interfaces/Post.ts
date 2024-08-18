export default interface IPost {
    text: string;
    likes: number;
    id?: number;
    createdAt: Date;
    updatedAt: Date;
}
