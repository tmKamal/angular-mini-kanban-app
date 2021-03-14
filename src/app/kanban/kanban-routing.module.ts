import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BoardListComponent } from './board-list/board-list.component';
import { BoardComponent } from './board/board.component';


const routes: Routes = [
  { path: '', component: BoardListComponent },
  { path: 'board', component: BoardComponent },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KanbanRoutingModule { }