import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VideoTutorialPage } from './video-tutorial.page';

describe('VideoTutorialPage', () => {
  let component: VideoTutorialPage;
  let fixture: ComponentFixture<VideoTutorialPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoTutorialPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VideoTutorialPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
