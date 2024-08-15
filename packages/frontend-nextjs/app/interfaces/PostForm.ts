import IPost from "./Post";

export default interface IPostFormParams {
    onPostCreated: (newPost: IPost) => void;
    profileId: number;
}
