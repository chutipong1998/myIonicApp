import { ServiceApiService } from './../../service/service-api.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-view-score',
  templateUrl: './view-score.page.html',
  styleUrls: ['./view-score.page.scss'],
  encapsulation: ViewEncapsulation.None

})
export class ViewScorePage implements OnInit {


  public columns: any;
  public rows: any;
  tablestyle = 'bootstrap';
  userlist = [];
  table: any = [];

  constructor(private myapi: ServiceApiService , public afAuth: AngularFireAuth) {


  }

  ngOnInit() {

    this.columns = [
      { name: 'รหัส', prop: 'id' },
      { name: 'ชื่อ-สกุล', prop: 'name' },
      { name: 'ด่าน 1', prop: 'state1' },
      { name: 'ด่าน 2', prop: 'state2' },
      { name: 'ด่าน 3', prop: 'state3' },
      { name: 'คะแนนรวม', prop: 'total' }

    ];
    this.myapi.Readdata().subscribe(data => {
      this.userlist = data.map(e => {
        return {
          id: e.payload.doc.data()['id'.toString()],
          name: e.payload.doc.data()['name'.toString()] + ' ' + e.payload.doc.data()['surname'.toString()],
          state1: e.payload.doc.data()['state1'.toString()],
          state2: e.payload.doc.data()['state2'.toString()],
          state3: e.payload.doc.data()['state3'.toString()],
          total: e.payload.doc.data()['total'.toString()],
        };
      });
      // console.log(this.userlist);
         for (let index = 0; index < this.userlist .length; index++) {
            if(this.userlist[index].id == null || this.userlist[index].id == ''){
              this.userlist.splice(index, 1);
            }           
         }
      this.rows = this.userlist;
    });
    // read data from database
  }



}
