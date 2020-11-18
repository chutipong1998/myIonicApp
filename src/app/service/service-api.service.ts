import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ServiceApiService {

  constructor(public myfirestore: AngularFirestore) { }

  Readdata() {
    return this.myfirestore.collection('user').snapshotChanges();
  }
  deleteData(recordID) {
    this.myfirestore.doc('user/' + recordID).delete();
  }
  createData(record) {
    return this.myfirestore.collection('user').add(record);
  }
  updateData(recordID , record) {
    this.myfirestore.doc('user/' + recordID).update(record);
  }
}
