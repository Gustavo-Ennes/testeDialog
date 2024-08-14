export default interface IToken {
    email: string;
    profile: Profile;
    username: string;
    iat: number;
    exp: number;
}

interface Profile {
    name: string;
    description: string;
}
