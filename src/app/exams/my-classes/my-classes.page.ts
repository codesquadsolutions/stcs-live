import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { getAuth } from 'firebase/auth';
import { UserConstant } from 'src/app/appConstants/userConstants';
import { ClassService } from 'src/app/services/class/class.service';

@Component({
  selector: 'app-my-classes',
  templateUrl: './my-classes.page.html',
  styleUrls: ['./my-classes.page.scss'],
})
export class MyClassesPage implements OnInit {

  batchKey: any
  batchYear:any
  myClasses: any = []
  isSearch: boolean = false
  public currentUser: any = UserConstant.currentUser



  constructor(private router: Router, private classService: ClassService, private activatedRouter: ActivatedRoute) { }

  ngOnInit() {
    this.checkUserLoggedIn()
  }

  checkUserLoggedIn() {
    debugger
    var auth = getAuth()
    const user = auth.currentUser
    if (user !== null) {
      this.activatedRouter.paramMap.subscribe(params => {
        this.batchKey = params.get('id')
        this.getBatchInformation(this.batchKey)
        this.getClasses()
      })
    }
    else {
      this.router.navigateByUrl('/splash')
    }
  }

  getBatchInformation(batchKey:string){
    this.classService.getBatchInfo(batchKey).then((result:any)=>{
      this.batchYear = result.year
    })
  }

  getClasses() {
    debugger
    this.classService.getAllClasses(this.batchKey).then((result: any) => {
      debugger
      this.myClasses = []
      result.forEach((element: any) => {
        debugger
        if (element.subjectTeachers) {
          var myObj = element.subjectTeachers
          var auth = getAuth()
          const user = auth.currentUser;
          for (const key in myObj) {
            debugger
            if (myObj.hasOwnProperty(key)) {
              debugger
              if (myObj[key] == user?.uid) {
                debugger
                this.classService.getTeacher(element.classTeacher).then((teacher: any) => {
                  var tempObj: any = []
                  tempObj.classKey = element.key
                  tempObj.className = element.className
                  tempObj.classTeacher = teacher.firstName + " " + teacher.lastName
                  tempObj.section = element.section
                  tempObj.subjectName = key
                  console.log(tempObj)
                  debugger
                  this.myClasses.push(tempObj)
                })

              }
            }
          }
        }
      })
    }).catch((error) => {
      console.log(error)
    })
  }
}