import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { getAuth } from 'firebase/auth';
import { UserConstant } from 'src/app/appConstants/userConstants';
import { ExamService } from 'src/app/services/exam/exam.service';

@Component({
  selector: 'app-results-exam-lists',
  templateUrl: './results-exam-lists.page.html',
  styleUrls: ['./results-exam-lists.page.scss'],
})
export class ResultsExamListsPage implements OnInit {

  batchKey:any
  classKey:any
  examLists:any = []
  public currentUser: any = UserConstant.currentUser

  constructor(private router: Router,private activatedRouter: ActivatedRoute, private examService:ExamService) { }

  ngOnInit() {
    this.checkUserLoggedIn()
  }

  checkUserLoggedIn() {

    var auth = getAuth()
    const user = auth.currentUser
    if (user !== null) {
      this.activatedRouter.paramMap.subscribe(params => {
        this.batchKey = params.get('batchKey')
        this.classKey = params.get('classKey')
        this.getExams()
      })
    }
    else {
      this.router.navigateByUrl('/splash')
    }
  }

  getExams(){
    this.examService.getExamLists(this.classKey).then((result:any)=>{
       this.examLists = result.sort()
    })
  }
}

