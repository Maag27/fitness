import { Injectable } from '@angular/core';
import { Firestore, collection, doc, setDoc, getDoc } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { docData } from 'rxfire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private firestore: Firestore) {}

  saveUserStats(userId: string, stats: any): Observable<void> {
    const userStatsDoc = doc(this.firestore, `userStats/${userId}`);
    return from(setDoc(userStatsDoc, stats));
  }

  getUserStats(userId: string): Observable<any> {
    const userStatsDoc = doc(this.firestore, `userStats/${userId}`);
    return docData(userStatsDoc);
  }
}
