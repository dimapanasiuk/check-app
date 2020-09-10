export interface IRepository {
    defaultBrunchRef: IBrunchRef;
    isPrivate: boolean;
    name: string;
    owner: IOwner;
    __typename: string;
}

interface IBrunchRef {
    name: string;
    __typename: string;
}

interface IOwner {
    login: string;
    __typename: string;
}