import { AngularFirestoreCollection, DocumentChangeAction, DocumentSnapshot } from '@angular/fire/firestore';
import { IUser } from './interfaces';

export const mapData = <T>(data: DocumentChangeAction<T>[] | DocumentSnapshot<T>) => {
  if (data instanceof Array) {
    return data.map((el: DocumentChangeAction<T>) => {
      const mappedData = el.payload.doc.data() as T,
        id = el.payload.doc.id;

      return { id, ...mappedData };
    });
  } else {
    const mappedData = data.data() as T,
      id = data.id;
    return { id, ...mappedData };
  }
};

export const findUsers = async (connection: AngularFirestoreCollection<IUser>, login: string): Promise<IUser[]> => {
  const response = await connection.ref.where('login', '==', login).get();
  return response.docs.map((user) => ({ id: user.id, ...user.data() } as IUser));
};

export const initialBookState = {
  title: '',
  author: '',
  imgSrc: '',
  publishingYear: null,
  ISBN: '',
  creator: '',
};
