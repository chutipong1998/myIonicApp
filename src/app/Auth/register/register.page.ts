import { Component, OnInit } from '@angular/core';
import { ServiceApiService } from './../../service/service-api.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

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
  loading: any;

  constructor(
    private route: Router,
    public afAuth: AngularFireAuth,
    private afDatabase: AngularFireDatabase,
    private afStore: AngularFirestoreModule,
    private myapi: ServiceApiService,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
  }

  signup() {
    console.log(this.std);
    this.showLoading();
    this.afAuth.createUserWithEmailAndPassword(this.std.stdCode + '@gmail.com', this.std.password)
      .then(() => {
        this.afAuth.authState.subscribe(auth => {
          localStorage.setItem('uid', auth.uid);
          let record = {};
          record['UID'] = auth.uid;
          record['id'] = this.std.stdCode;
          record['name'] = this.std.username;
          record['surname'] = this.std.lastname;
          record['state1'] = this.std.state1;
          record['state2'] = this.std.state2;
          record['state3'] = this.std.state3;
          record['total'] = this.std.total;
          this.myapi
            .createData(record)
            .then(() => {
              localStorage.setItem('uid', auth.uid);
              localStorage.setItem('quiz', '');
              localStorage.setItem('quiz2', '');
              localStorage.setItem('quiz3', '');       
              this.route.navigateByUrl('/video-tutorial',{ replaceUrl: true });
              this.loading.dismiss();
            })
            .catch(error => {
              console.log(error);
              this.loading.dismiss();
            }
            );
        });
      })
      .catch((error) => {
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
