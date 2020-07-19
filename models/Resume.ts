export interface IResume {
    name: String;
    kana: String;
    birth: Date;
    address: String;
    telephone: String;
    email: String;
    jobs: IJob[];
    licenses: ILicense[];
    fullAge: number;
}

export interface IJob {
    name: String;
    date: Date;
}

export interface ILicense {
    name: String;
    date: Date;
}