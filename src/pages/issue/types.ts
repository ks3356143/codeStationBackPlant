export interface UserInerType {
    id: string;
    name: string;
    username: string;
}

export interface LocationState {
    commentNumber: number;
    create_date: string;
    id: string;
    issueContent: string;
    issueTitle: string;
    scanNumber: number;
    status: boolean;
    type: string[];
    update_date: string;
    user: UserInerType;
}
