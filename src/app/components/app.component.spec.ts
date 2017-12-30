import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {
    MatToolbarModule, MatMenuModule,
    MatIconModule, MatButtonModule,
    MatDialogModule,
    MatListModule, MatCardModule, MatInputModule,
    MatGridListModule, MatSnackBarModule, MatTooltipModule } from '@angular/material';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AuthService} from '../services/auth.service';
import { EventService} from '../services/event.service';
import { Router } from '@angular/router';
import { Observable} from 'rxjs/Observable';

class AuthServiceMock {
  public authState;

  constructor() {
    this.authState = Observable.of({});
  }

  public signOut() {}
}

describe('AppComponent', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ AppComponent ],
            imports: [
                MatToolbarModule, MatMenuModule,
                MatIconModule, MatButtonModule,
                MatDialogModule,
                MatListModule, MatCardModule, MatInputModule,
                MatGridListModule, MatSnackBarModule, MatTooltipModule,
            ],
            providers: [
                { provide: AuthService, useClass: AuthServiceMock },
                {
                  provide: Router,
                  useClass: class { navigateByUrl = jasmine.createSpy('navigateByUrl'); }
                },
              EventService
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

    it('should create AppComponent', () => {
        expect(component).toBeTruthy();
    });

  it('should not have the userProfile', () => {
    expect(component.userProfile.name).toBeFalsy();
  });

  it('should change the title', () => {
    const newTitle = 'new title';
    expect(component.title).toEqual('');
    const eventService = fixture.debugElement.injector.get(EventService);
    eventService.emitChange({title: newTitle});
    expect(component.title).toEqual(newTitle);
  });

  it('should log out', () => {
    expect(component.user).toBeTruthy();
    component.logout();
    expect(component.user).toBeFalsy();
  });
});
