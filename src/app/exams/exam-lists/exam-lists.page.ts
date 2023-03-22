import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { getAuth } from 'firebase/auth';
import { UserConstant } from 'src/app/appConstants/userConstants';
import { ExamService } from 'src/app/services/exam/exam.service';

@Component({
  selector: 'app-exam-lists',
  templateUrl: './exam-lists.page.html',
  styleUrls: ['./exam-lists.page.scss'],
})
export class ExamListsPage implements OnInit {

  classKey:any
  batchKey:any
  subject:any
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
        this.classKey = params.get('id')
        this.subject = params.get('subject')
        this.batchKey = params.get('batchKey')
        console.log("Working")
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
       console.log(this.examLists)
    })
  }

}
