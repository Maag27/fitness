// firestore.d.ts
declare module 'rxfire/firestore' {
    export function docData<T>(doc: any): Observable<T | null>;
  }
  