import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewScorePage } from './view-score.page';

describe('ViewScorePage', () => {
  let component: ViewScorePage;
  let fixture: ComponentFixture<ViewScorePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewScorePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewScorePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
