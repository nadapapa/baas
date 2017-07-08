import { BrowserModule } from '@angular/platform-browser';
import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
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
  MdGridListModule, MdSnackBarModule, MdTooltipModule} from '@angular/material';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireOfflineModule } from 'angularfire2-offline';

import { environment } from '../environments/environment';

import { BoardService } from './board.service';
import { VoteComponent } from './vote/vote.component';
import { EventService } from './event.service';

import { VoteService } from './vote.service';
import { AuthGuard } from './auth.guard';
import { VoteProgressComponent } from './vote-progress/vote-progress.component';


const appRoutes: Routes = [
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
    VoteComponent,
    VoteProgressComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MdToolbarModule, MdMenuModule,
    MdIconModule, MdButtonModule,
    MdDialogModule, MdCardModule,
    MdListModule, MdGridListModule,
    MdSnackBarModule, MdInputModule, MdTooltipModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireOfflineModule,
    AngularFireAuthModule

  ],
  providers: [BoardService, EventService, VoteService, AuthGuard],
  bootstrap: [AppComponent],
  entryComponents: [VoteComponent],
  schemas: [
      NO_ERRORS_SCHEMA
  ]
})
export class AppModule { }
