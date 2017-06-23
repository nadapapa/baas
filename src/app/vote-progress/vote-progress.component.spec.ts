import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoteProgressComponent } from './vote-progress.component';

describe('VoteProgressComponent', () => {
  let component: VoteProgressComponent;
  let fixture: ComponentFixture<VoteProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoteProgressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoteProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
