export interface IResume {
  name: string;
  kana: string;
  birth: Date;
  address: string;
  telephone: string;
  email: string;
  jobs: IJob[];
  licenses: ILicense[];
  condition: string;
  fullAge: number;
}

export interface IJob {
  name: string;
  date: Date;
}

export interface ILicense {
  name: string;
  date: Date;
}
