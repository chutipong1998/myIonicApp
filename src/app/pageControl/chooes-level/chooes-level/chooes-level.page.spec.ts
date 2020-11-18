import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChooesLevelPage } from './chooes-level.page';

describe('ChooesLevelPage', () => {
  let component: ChooesLevelPage;
  let fixture: ComponentFixture<ChooesLevelPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooesLevelPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChooesLevelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
