import { SET1, SET2 } from './../../mock/mock-question2';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Question } from 'src/app/model/question';
import { ServiceApiService } from 'src/app/service/service-api.service';
import { AlertController } from '@ionic/angular';
import { Q3SET1, Q3SET2 } from 'src/app/mock/mock-question3';

@Component({
  selector: 'app-level2',
  templateUrl: './level2.page.html',
  styleUrls: ['./level2.page.scss'],
})
export class Level2Page implements OnInit {

  quiz: Question[];
  status = '';
  score = 0;
  random = 0;
  uid: string;
  userlist: any;

  std = {
    stdCode: '',
    username: '',
    lastname: '',
    password: '',
    state1: 0,
    state2: 0,
    state3: 0,
    total: 0
  };
  total_: any;
  total_ori: any;

  constructor(private route: Router, private myapi: ServiceApiService, private alertCtrl: AlertController) {
    this.uid = localStorage.getItem('uid');
    console.log('uid = ' + this.uid);

    // this.lodeData();
    // console.log('data:', this.lodeData());

    let q = localStorage.getItem('quiz2');
    this.quiz = JSON.parse(q);
    console.log('quiz2x =', this.quiz[0].problem, 'ans =', this.quiz[0].answer);
    console.log(JSON.parse(q));
  }

  ngOnInit() {
    this.myapi.Readdata().subscribe(data => {
      this.userlist = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          myuid: e.payload.doc.data()['UID'.toString()],
          mystate1: e.payload.doc.data()['state1'.toString()],
          mystate2: e.payload.doc.data()['state2'.toString()],
          mystate3: e.payload.doc.data()['state3'.toString()],
          mytotal: e.payload.doc.data()['total'.toString()]
        };
      });
      console.log('userlist =', this.userlist);
    });
  }

  onCheck(str: string) {
    console.log('*****************');
    this.status = str;
    console.log(this.status);
  }

  next(i) {
    console.log('OK status:', this.status);
    if (this.quiz[i].answer === this.status) {
      this.correct(this.quiz[i].txt); 
      
      console.log('score =', this.std.state2);
    } else {
      this.result_was_wrong(this.quiz[i].txt);
      
      console.log(this.quiz[i].txt);
      
      console.log('score =', this.std.state2);
    }
    // this.quiz.splice(0, 1);
    // console.log('count =', this.quiz.length);
    // console.log('catd =', this.quiz);
    // this.status = '';


    let u = this.std.state2;
    console.log("u =");
    console.log(u);

    this.total_ori = u;
    if (u == 7) {
      this.total_ = u + 93;
    } else if (u == 4) {
      this.total_ = u + 46;
    } else if (u == 1) {
      this.total_ = u + 35;
    } else if (u <= 4 && u > 1) {
      this.total_ = u + 16;
    } else if (u <= 7 && u > 4) {
      this.total_ = u + 85;
    } else if (u < 1 && u > 0) {
      this.total_ = u + 35;
    } else if (u == 0) {
      this.total_ = u;
    }

  }

  setScore(url: string) {
    console.log(url);
    let index = this.userlist.findIndex(std => std.myuid === this.uid);
    console.log('index:', index);
  
    if (this.std.state2 > this.userlist[index].mystate2) {
      let newrecord = {};
      newrecord['state2'] = this.std.state2;
      newrecord['total'] = this.userlist[index].mystate1 + this.std.state2 + this.userlist[index].mystate3;
      this.myapi.updateData(this.userlist[index].id, newrecord); // update
      console.log(newrecord);
    }

    if (url === 'chooes-level') {
      this.random = Math.floor(Math.random() * 2) + 1;
      console.log('rd =', this.random);
      if (this.random === 1) {
        // this.quiz = QUESTION1;
        localStorage.setItem('quiz2', SET1 + '');
      } else if (this.random === 2) {
        // this.quiz = QUESTION2;
        localStorage.setItem('quiz2', SET2 + '');
      }
      console.log('quiz =', this.quiz);
      this.route.navigate([`${url}`], { replaceUrl: true });
    } else if (url === 'level3') {
      this.random = Math.floor(Math.random() * 2) + 1;
      console.log('rd =', this.random);
      if (this.random === 1) {
        // this.quiz = QUESTION1;
        localStorage.setItem('quiz3', JSON.stringify(Q3SET1) + '');
      } else if (this.random === 2) {
        // this.quiz = QUESTION2;
        localStorage.setItem('quiz3', JSON.stringify(Q3SET2) + '');
      }
      this.route.navigate([`${url}`], { replaceUrl: true });
    } else if (url === 'level2') {
      this.random = Math.floor(Math.random() * 2) + 1;
      console.log('rd =', this.random);
      if (this.random === 1) {
        this.quiz = SET1;
        localStorage.setItem('quiz2', SET1 + '');
      } else if (this.random === 2) {
        this.quiz = SET2;
        localStorage.setItem('quiz2', SET2 + '');
      }
      console.log('quiz2 =', this.quiz);
      // this.route.parseUrl();
      this.route.navigate([`${url}`], { replaceUrl: true });
    }
  }

  async correct(msg) {
    let alert = await this.alertCtrl.create({
      header: 'ยินดีด้วย คุณตอบถูก',
      // subHeader: 'คุณตอบถูก',
      message: 'คำตอบคือ :  '+msg,
      cssClass:'my-custom-class',
      buttons: [
        {
         text: 'ตกลง',
          role: 'ok',
          handler: () => {
            this.std.state2 += 1;    
            this.quiz.splice(0, 1);
            console.log('count =', this.quiz.length);
            console.log('catd =', this.quiz);
            this.status = '';
            // console.log('Cancel clicked');
          }
        }
      ],backdropDismiss: false
    });
    await alert.present();
  }

  async result_was_wrong(txt) {
    let alert = await this.alertCtrl.create({
      header: 'คุณตอบผิด !!',
      // subHeader: 'เฉลย',
      message: 'เฉลย : '+txt,    
      cssClass:'my-custom-class',
      buttons: [
        {
          text: 'ตกลง',
          role: 'ok',
          handler: () => {
            this.std.state2 += 0;   
            this.quiz.splice(0, 1);
            console.log('count =', this.quiz.length);
            console.log('catd =', this.quiz);
            this.status = '';
            // console.log('Cancel clicked');
          }
        }
      ],
      backdropDismiss: false

    });
    await alert.present();
  }

}
