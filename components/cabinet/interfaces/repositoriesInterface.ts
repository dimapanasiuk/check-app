export interface IRepository {
    defaultBrunchRef: IBranchRef;
    isPrivate: boolean;
    name: string;
    owner: IOwner;
    __typename: string;
}

interface IBranchRef {
    name: string;
    __typename: string;
}

interface IOwner {
    login: string;
    __typename: string;
}