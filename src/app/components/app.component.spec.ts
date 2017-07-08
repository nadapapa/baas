import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppComponent } from './app.component';
import {
    MdToolbarModule, MdMenuModule,
    MdIconModule, MdButtonModule,
    MdDialogModule,
    MdListModule, MdCardModule, MdInputModule,
    MdGridListModule, MdSnackBarModule, MdTooltipModule } from '@angular/material';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseApp } from 'angularfire2';
import * as Rx from 'rxjs/Rx';

class AngularFireAuthMock extends AngularFireAuth {
    auth: Rx.Observable.of({uid: 'dgfdh', name: 'sdfsd'})
}

class FirebaseAppMock extends FirebaseApp {}

describe('AppComponent', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ AppComponent ],
            imports: [
                MdToolbarModule, MdMenuModule,
                MdIconModule, MdButtonModule,
                MdDialogModule, MdCardModule,
                MdListModule, MdGridListModule,
                MdSnackBarModule, MdInputModule, MdTooltipModule
            ],
            providers: [
                { provide: AngularFireAuth, useClass: AngularFireAuthMock },
                { provide: FirebaseApp, useClass: FirebaseAppMock },
            ],
            schemas: [
                NO_ERRORS_SCHEMA
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
