import { Component, OnInit } from '@angular/core';
import { ServiceApiService } from './../../service/service-api.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  std = {
    username: '',
    password: ''
  };

  userlist: any;
  loading: any;

  constructor(
    private route: Router,
    public afAuth: AngularFireAuth,
    private myapi: ServiceApiService,
    private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.myapi.Readdata().subscribe(data => {
      this.userlist = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          myuid: e.payload.doc.data()['UID'.toString()],
          myid: e.payload.doc.data()['id'.toString()],
          myname: e.payload.doc.data()['name'.toString()],
          mysurname: e.payload.doc.data()['surname'.toString()],
          mystate1: e.payload.doc.data()['state1'],
          mystate2: e.payload.doc.data()['state2'],
          mystate3: e.payload.doc.data()['state3'],
          mytotal: e.payload.doc.data()['total'.toString()]
        };
      });
      console.log('userlist =', this.userlist);
    });
  }

  signin() {
    console.log(this.std);
    this.showLoading();
    this.afAuth.signInWithEmailAndPassword(this.std.username + '@gmail.com', this.std.password)
      .then((res) => {
        this.afAuth.authState.subscribe(auth => {
          if (auth != null) {
            localStorage.setItem('uid', auth.uid);           
            localStorage.setItem('quiz', '');
            localStorage.setItem('quiz2', '');
            localStorage.setItem('quiz3', '');
            let index = this.userlist.findIndex(std => std.myuid === auth.uid);
            if (this.userlist[index].mystate1 !== 0 || this.userlist[index].mystate2 !== 0 || this.userlist[index].mystate3 !== 0) {
              localStorage.setItem('uid',  auth.uid);
              localStorage.setItem('quiz', '');
              localStorage.setItem('quiz2', '');
              localStorage.setItem('quiz3', '');
              this.route.navigateByUrl('/chooes-level',{ replaceUrl: true });
              this.loading.dismiss();
            } else if (this.userlist[index].mystate1 === 0 || this.userlist[index].mystate2 === 0 || this.userlist[index].mystate3 === 0) {
              localStorage.setItem('uid',  auth.uid);
              localStorage.setItem('quiz', '');
              localStorage.setItem('quiz2', '');
              localStorage.setItem('quiz3', '');
              this.route.navigateByUrl('/video-tutorial',{ replaceUrl: true });
              this.loading.dismiss();
            }
          } else {
            console.log('logouted!');
            this.loading.dismiss();
          }
        });
      })
      .catch((error) => {
        console.log('Errror : ');
        console.log(error);
        this.loading.dismiss();
      });
  }

  async showLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'กำลังดาวน์โหลด ...'
    });
    this.loading.present();
  }

}
