import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { getAuth } from 'firebase/auth';
import { UserConstant } from 'src/app/appConstants/userConstants';
import { ClassService } from 'src/app/services/class/class.service';
import { ExamService } from 'src/app/services/exam/exam.service';

@Component({
  selector: 'app-results-statistics',
  templateUrl: './results-statistics.page.html',
  styleUrls: ['./results-statistics.page.scss'],
})
export class ResultsStatisticsPage implements OnInit {
  totalStudents:number = 0
  failsCount:number = 0
  batchKey: any
  classKey: any
  examKey: any
  className: any
  distinction: any = []
  firstClass: any = []
  secondClass: any = []
  fails: any = []
  notAttended:any = []
  allData:any =[]
  isCorrectionCompleted:boolean = false
  public currentUser: any = UserConstant.currentUser
  constructor(private navCtrl: NavController, private router: Router, private activatedRouter: ActivatedRoute, private classService: ClassService, private examService: ExamService) { }

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
        this.examKey = params.get('examKey')
        this.getResults()
        this.getClassName()
      })
    }
    else {
      this.router.navigateByUrl('/splash')
    }
  }

  async getResults() {
    this.examService.getResultsByExam(this.classKey, this.examKey).then(async (result: any) => {
      this.allData = []
      this.allData = result
      if(this.allData.length == 0)
      {
        this.totalStudents = 0
      }
      else{
        this.totalStudents = this.allData.length-2
      }
      this.distinction = []
      this.firstClass = []
      this.secondClass = []
      this.fails = []
      this.notAttended = []
      await result.forEach((element: any) => {
        if (element.isCompleted) {
          debugger
          if (element.kannada == true
            && element.english == true
            && element.hindi == true
            && element.maths == true
            && element.science == true
            && element.social == true
          ) {
            this.isCorrectionCompleted = true
          }
        }
        switch (true) {
          case parseInt(element.percentage) >= 60 && parseInt(element.percentage) < 85:
            this.firstClass.push(element)
            break;
          case parseInt(element.percentage) >= 35 && parseInt(element.percentage) < 59:
            this.secondClass.push(element)
            break;
          case parseInt(element.percentage) >= 85:
            this.distinction.push(element)
            break;
          case parseInt(element.percentage) < 35:
            this.fails.push(element)
            this.failsCount++
            break;
          default:
            break;
        }
      });

    })
  }

  getClassName() {
    this.classService.getClassInfo(this.batchKey, this.classKey).then((data: any) => {
      this.className = data.className + " " + data.section
    })
  }

  routeToStudents(resultKey:string){
    console.log(this.allData)
    console.log(resultKey)
    switch(resultKey){
      case "distinction":
        this.navCtrl.navigateForward(`/results-students/${this.batchKey}/${this.classKey}/${this.examKey}`, { queryParams: { data: JSON.stringify(this.distinction)} })
        break
      case "firstClass":
        this.navCtrl.navigateForward(`/results-students/${this.batchKey}/${this.classKey}/${this.examKey}`, { queryParams: { data: JSON.stringify(this.firstClass) } })
        break
      case "secondClass":
        this.navCtrl.navigateForward(`/results-students/${this.batchKey}/${this.classKey}/${this.examKey}`, { queryParams: { data: JSON.stringify(this.secondClass) } })
        break
      case "fails":
        this.navCtrl.navigateForward(`/results-students/${this.batchKey}/${this.classKey}/${this.examKey}`, { queryParams: { data: JSON.stringify(this.fails) } })
        break
      case "all":
        this.navCtrl.navigateForward(`/results-students/${this.batchKey}/${this.classKey}/${this.examKey}`, { queryParams: { data: JSON.stringify(this.allData) } })
        break
      default:
        break
    }

  }

  //card js
  tilted: boolean = false;
  cssClassName: any = "tiles"

  toggleTilt() {
    this.tilted = !this.tilted
    if(this.tilted){
      this.cssClassName = "details"
    }
    else{
      this.cssClassName = "tiles"
    }
  }

}
