import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app'
import { switchMap, map } from 'rxjs/operators';
import { Board, Task } from './board.model';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor(private afAuth:AngularFireAuth, private db:AngularFirestore) { }

  /* Create a new board for current user */
  async createBoard(data:Board){
    const userId = await this.afAuth.currentUser;
    return this.db.collection('boards').add({
      ...data,
      uid:userId,
      tasks:[{description:'hello guys',label:'yellow'}]

    })
  }

  /* Delete board */
  async deleteBoard(boardId:string){
    return this.db.collection('boards').doc(boardId).delete();
  }

  /* updates the taks on the board */
  updateTasks(boardId: string, tasks: Task[]) {
    return this.db
      .collection('boards')
      .doc(boardId)
      .update({ tasks });
  }

  /* Remove a specific task from the board */
  async removeTask(boardId:string,task:Task){
    return this.db.collection('boards').doc(boardId).update({
      tasks:firebase.firestore.FieldValue.arrayRemove(task)
    });
  }

  /* get all the board of logged in user in ordered by priority */
  getUserBoards() {
    return this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.db
            .collection<Board>('boards', ref =>
              ref.where('uid', '==', user.uid).orderBy('priority')
            )
            .valueChanges({ idField: 'id' });
        } else {
          return [];
        }
      }),
      // map(boards => boards.sort((a, b) => a.priority - b.priority))
    );
  }

  sortBoards(boards:Board[]){
    const db=firebase.firestore();
    const batch=db.batch();
    const refs=boards.map((board)=>db.collection('board').doc(board.id));
    refs.forEach((ref,idx)=>batch.update(ref,{priority:idx}));
    batch.commit();
  }

}
