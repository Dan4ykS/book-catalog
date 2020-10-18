export interface IUser {
  id?: string;
  login: string;
  email: string;
  password: string;
}

export interface IBook {
  id?: string;
  // imgSrc: string;
  title: string;
  publishingYear: number;
  ISBN: string;
  author: string;
  creator: string;
}

export interface IUpdatedBookField {
  title?: string;
  publishingYear?: number;
  ISBN?: string;
  author?: string;
}

export interface IDataForUpdateBook {
  bookId: string;
  dataForUpdate: IUpdatedBookField;
}
