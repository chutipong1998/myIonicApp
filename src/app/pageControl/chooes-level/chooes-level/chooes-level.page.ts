import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { QUESTION1, QUESTION2 } from 'src/app/mock/mock-question';
import { SET1, SET2 } from 'src/app/mock/mock-question2';
import { Q3SET1 } from 'src/app/mock/mock-question3';
import { Question } from 'src/app/model/question';
import { Question3 } from 'src/app/model/question3';
import { ServiceApiService } from 'src/app/service/service-api.service';


@Component({
  selector: 'app-chooes-level',
  templateUrl: './chooes-level.page.html',
  styleUrls: ['./chooes-level.page.scss'],
})
export class ChooesLevelPage implements OnInit {

  userEmail: string;
  userlist: any;
  isAdmin: string;

  quiz1: Question[];
  quiz2: Question[];
  quiz3: Question3[];
  
  random = 0;
  total_: any;
  total_ori: any;

  chk_admin: boolean = true;
  ScoreState1;
  ScoreState2;
  chk_scoreState1: boolean;
  chk_scoreState2: boolean;
  maxtime: any=60
  hidevalue:boolean;
  timer:any;

  reload_page = true;

  constructor(
    private route: Router,
    public afAuth: AngularFireAuth,
    private myapi: ServiceApiService,
    private platform: Platform
  ) {
    this.getDetail();
    // this.StartTimer();
    if (this.isAdmin == 'admin@gmail.com') {
      this.chk_admin = true;
    } else {
      this.chk_admin = false;
    }

    if (this.reload_page == true) {
      // this.reloadPage();
      // window.location.href = 'chooes-level';
      this.reload_page = false;
    }

    this.platform.backButton.subscribeWithPriority(1000000, () => {
      if (this.constructor.name == 'ChooesLevelPage') {
        if (window.confirm('do you want to exit app.')) {
          navigator['app'].exitApp();
        }
      }
    });
  }

  ngOnInit() {
  }

  signout() {
    this.afAuth.signOut()
      .then(() => {
        localStorage.setItem('uid', '');
        localStorage.setItem('quiz', '');
        localStorage.setItem('quiz2', '');
        localStorage.setItem('quiz3', '');
        this.route.navigateByUrl('/login');
      });
  }

  getDetail() {
    this.myapi.Readdata().subscribe(data => {
      this.userlist = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          myuid: e.payload.doc.data()['UID'.toString()],
          myid: e.payload.doc.data()['id'.toString()],
          mystate1: e.payload.doc.data()['state1'.toString()],
          mystate2: e.payload.doc.data()['state2'.toString()],
          mystate3: e.payload.doc.data()['state3'.toString()],
          myname: e.payload.doc.data()['name'.toString()],
          mysurname: e.payload.doc.data()['surname'.toString()],
          mytotal: e.payload.doc.data()['total']
        };
      });

      console.log('userlist =', this.userlist);
      let uid = localStorage.getItem('uid');
      console.log('uid:', uid);
      let index = this.userlist.findIndex(std => std.myuid === uid);
      console.log(`index: ${index}`);
      let name = this.userlist[index].myname;
      console.log(name);
      let lastname = this.userlist[index].mysurname;
      console.log(lastname);
      this.userEmail = name + ' ' + lastname;

      let u = this.userlist[index].mytotal;

      console.log(u);

      if (u == 23) {
        this.total_ = u + 77;
      } else if (u == 8) {
        this.total_ = u + 42;
        console.log('15' + this.total_);

      } else if (u == 8) {
        this.total_ = u + 22;
      } else if (u <= 12 && u > 8) {
        this.total_ = u + 37;
      } else if (u <= 21 && u > 12) {
        this.total_ = u + 45;
      } else if (u < 8 && u > 0) {
        this.total_ = u + 19;
      } else if (u == 0) {
        this.total_ = u;
      }else if(u == 22){
        this.total_ = u+65;
      }
  
      this.total_ori = u;
      console.log(this.total_);
      this.ScoreState1 = this.userlist[index].mystate1;
      console.log('score 1st =', this.ScoreState1);
      this.ScoreState2 = this.userlist[index].mystate2;
      console.log('score 2nd =', this.ScoreState2);

      this.afAuth.user.subscribe((res) => {
        if (res != null) {
          this.isAdmin = res.email;

        } else {
          console.log('logouted!');
        }
      }, (error) => {
        console.log(error);
      });
    });
  }

  state1() {
    this.random = Math.floor(Math.random() * 2) + 1;
    console.log('rd =', this.random);
    if (this.random === 1) {
      // this.quiz = QUESTION1;
      localStorage.setItem('quiz', JSON.stringify(QUESTION1) + '');
      localStorage.setItem('quiz2', JSON.stringify(SET1) + '');
      localStorage.setItem('quiz3', JSON.stringify(Q3SET1) + '');
    } else if (this.random === 2) {
      // this.quiz = QUESTION2;
      localStorage.setItem('quiz', JSON.stringify(QUESTION2) + '');
      localStorage.setItem('quiz2', JSON.stringify(SET2) + '');
      localStorage.setItem('quiz3', JSON.stringify(Q3SET1) + '');
    }
    // console.log('QuIz =', this.quiz1);
    this.route.navigateByUrl('/level1');
  }

  state2() {
    this.random = Math.floor(Math.random() * 2) + 1;
    console.log('rd =', this.random);
    if (this.random === 1) {
      // this.quiz = QUESTION1;
      localStorage.setItem('quiz', JSON.stringify(QUESTION1) + '');
      localStorage.setItem('quiz2', JSON.stringify(SET1) + '');
      localStorage.setItem('quiz3', JSON.stringify(Q3SET1) + '');
    } else if (this.random === 2) {
      // this.quiz = QUESTION2;
      localStorage.setItem('quiz2', JSON.stringify(SET2) + '');
    }
    // console.log('QuIz2 =', this.quiz);
    this.route.navigateByUrl('/level2');

  }

  state3() {
    this.random = Math.floor(Math.random() * 2) + 1;
    console.log('rd =', this.random);
    if (this.random === 1) {
      // this.quiz = QUESTION1;
      localStorage.setItem('quiz', JSON.stringify(QUESTION1) + '');
      localStorage.setItem('quiz2', JSON.stringify(SET1) + '');
      localStorage.setItem('quiz3', JSON.stringify(Q3SET1) + '');
    } else if (this.random === 2) {
      // this.quiz = QUESTION2;
      localStorage.setItem('quiz', JSON.stringify(QUESTION2) + '');
      localStorage.setItem('quiz2', JSON.stringify(SET2) + '');
      localStorage.setItem('quiz3', JSON.stringify(Q3SET1) + '');
    }
    // console.log('QuIz2 =', this.quiz);
    this.route.navigateByUrl('/level3');

  }

}
