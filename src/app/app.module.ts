import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MeComponent } from './me/me.component';
import { BoardListComponent } from './board-list/board-list.component';
import { BoardComponent } from './board/board.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MdToolbarModule, MdMenuModule,
  MdIconModule, MdButtonModule,
  MdDialogModule,
  MdListModule, MdCardModule, MdInputModule,
  MdGridListModule, MdSnackBarModule} from '@angular/material';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';

import { TestComponent } from './test/test.component';
import { environment } from '../environments/environment';

import { BoardService } from './board.service';
import { VoteComponent } from './vote/vote.component';
import { EventService } from './event.service';

import { VoteService } from './vote.service';
import { AuthGuard } from './auth.guard';


const appRoutes: Routes = [
  { path: 'test', component: TestComponent, canActivate: [AuthGuard] },
  { path: 'me', component: MeComponent, canActivate: [AuthGuard] },
  { path: 'boards', component: BoardListComponent, canActivate: [AuthGuard] },
  { path: 'boards/:id', component: BoardComponent, canActivate: [AuthGuard] },
  { path: '', component: LoginComponent, pathMatch: 'full'},
  { path: '**', component: PageNotFoundComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MeComponent,
    BoardListComponent,
    BoardComponent,
    PageNotFoundComponent,
    TestComponent,
    VoteComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MdToolbarModule, MdMenuModule,
    MdIconModule, MdButtonModule, MdDialogModule, MdCardModule, MdListModule, MdGridListModule, MdSnackBarModule, MdInputModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebase, 'baas-6228b'),
    AngularFireDatabaseModule,
    AngularFireAuthModule

  ],
  providers: [BoardService, EventService, VoteService, AuthGuard],
  bootstrap: [AppComponent],
  entryComponents: [VoteComponent],
})
export class AppModule { }
