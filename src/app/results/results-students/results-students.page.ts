import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { getAuth } from 'firebase/auth';

@Component({
  selector: 'app-results-students',
  templateUrl: './results-students.page.html',
  styleUrls: ['./results-students.page.scss'],
})
export class ResultsStudentsPage{

  batchKey: any
  classKey: any
  examKey: any

  constructor(private activatedRoute: ActivatedRoute, private router: Router) { }

  ionViewDidEnter() {
    this.checkUserLoggedIn()
  }

  checkUserLoggedIn() {

    var auth = getAuth()
    const user = auth.currentUser
    if (user !== null) {
      this.activatedRoute.queryParams.subscribe(params => {
        console.log(params); // log the entire params object
        const data = JSON.parse(params['data']);
        this.batchKey = JSON.parse(params['batchKey']);
        console.log(this.batchKey);
      });
      // this.batchKey = this.activatedRoute.snapshot.paramMap.get('batchKey');
      this.classKey = this.activatedRoute.snapshot.paramMap.get('classKey')
      this.examKey = this.activatedRoute.snapshot.paramMap.get('examKey')

    }
    else {
      this.router.navigateByUrl('/splash')
    }
  }

}

