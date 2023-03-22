import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { getAuth } from 'firebase/auth';
import { getDatabase, update, ref } from 'firebase/database';
import { ExamService } from 'src/app/services/exam/exam.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-update-marks',
  templateUrl: './update-marks.page.html',
  styleUrls: ['./update-marks.page.scss'],
})
export class UpdateMarksPage implements OnInit {

  classKey: any
  batchKey: any
  examKey: any
  subject: any
  totalMarks: number = 0
  marksList: any = {}
  viewList: any = []
  private loading: any
  isCorrectionCompleted: boolean = false
  database: any = getDatabase()

  constructor(private loadingControl: LoadingController, private alertController: AlertController, private router: Router, private activatedRouter: ActivatedRoute, private examService: ExamService, private userService: UserService) { }

  ngOnInit() {

    this.checkUserLoggedIn()

  }

  checkUserLoggedIn() {

    var auth = getAuth()
    const user = auth.currentUser
    if (user !== null) {
      this.activatedRouter.paramMap.subscribe(params => {
        this.classKey = params.get('classKey')
        this.subject = params.get('subject')
        this.batchKey = params.get('batchKey')
        this.examKey = params.get('examKey')
        if (this.examKey == "FA-1" || this.examKey == "FA-2" || this.examKey == "FA-3" || this.examKey == "FA-4") {
          this.totalMarks = 150
        }
        else if (this.examKey == "Midterm Exam") {
          this.totalMarks = 300
        }
        else {
          this.totalMarks = 600
        }
        console.log("Working")
        this.getMarksWithStudents()
      })
    }
    else {
      this.router.navigateByUrl('/splash')
    }
  }


  getMarksWithStudents() {
    this.examService.getStudentsWithMarks(this.classKey, this.examKey).then((result: any) => {
      if (result.size <= 0) {
        this.examService.getAllStudents(this.classKey).then((data: any) => {
          this.marksList = {}
          this.viewList = []
          data.forEach(async (element: any) => {
            var tempKeyValue = await this.createTempObject()
            this.marksList[element.key] = tempKeyValue
            this.marksList["isCorrectionCompleted"] = {
              "kannada": false,
              "english": false,
              "maths": false,
              "science": false,
              "social": false,
              "hindi": false,
              "isCompleted":false
            }
            this.marksList[element.key]["name"] = element.name
            this.marksList["isAnnounced"] = false
            var tempObj: any = element
            tempObj.marks = 0
            this.viewList.push(tempObj)
          })
        })
      }
      else {
        this.marksList = {}
        this.viewList = []
        this.marksList = result.val()
        this.isCorrectionCompleted = this.marksList["isCorrectionCompleted"][this.subject]
        result.forEach((element: any) => {
          if(element.val()["name"]){
            var tempObj: any = []
            tempObj.key = element.key
            tempObj.name = element.val()["name"]
            tempObj.marks = element.val()[this.subject]
            this.viewList.push(tempObj)
            this.viewList.sort((a: any, b: any) => a.name.localeCompare(b.name))
          }
        })
      }
    })
  }

  createTempObject(): any {
    var tempKeyValue: any = {
      "kannada": 0,
      "english": 0,
      "maths": 0,
      "science": 0,
      "social": 0,
      "hindi": 0,
      "total": 0,
      "percentage": 0,
      "fullTotal": this.totalMarks

    }
    return tempKeyValue
  }


  updateMarks(event: any, studentId: string) {
    this.marksList[studentId][this.subject] = Number(event.target.value)
    this.updateTotalAndPercentage(studentId)
  }

  updateTotalAndPercentage(studentId: string) {
    this.marksList[studentId]["total"] =
      this.marksList[studentId]["kannada"] +
      this.marksList[studentId]["english"] +
      this.marksList[studentId]["maths"] +
      this.marksList[studentId]["science"] +
      this.marksList[studentId]["social"] +
      this.marksList[studentId]["hindi"]

    this.marksList[studentId]["percentage"] =
      ((this.marksList[studentId]["total"] /
        this.marksList[studentId]["fullTotal"]) * 100).toFixed(2)
    console.log(this.marksList)
  }


  updateCorrectionBoolean() {
    this.marksList["isCorrectionCompleted"][this.subject] = !this.marksList["isCorrectionCompleted"][this.subject]
    this.isCorrectionCompleted = !this.isCorrectionCompleted
  }


  async saveMarks() {
    const alertConfirm = await this.alertController.create({
      header: 'Are you sure?',
      cssClass: 'custom-alert',
      buttons: [
        {
          text: 'No',
          cssClass: 'alert-button-cancel',
          handler: () => {
            alertConfirm.dismiss()
          }
        },
        {
          text: 'Yes',
          cssClass: 'alert-button-confirm',
          handler: async () => {
            await this.pleaseWaitLoader()
            await update(ref(this.database, `/marksNode/${this.classKey}/${this.examKey}`), this.marksList);
            alertConfirm.dismiss()
            await this.dismissLoadingController();
          },
        },
      ],
    });

    await alertConfirm.present()
  }


  async pleaseWaitLoader() {
    this.loading = await this.loadingControl.create({
      message: 'Please wait...',
      mode: 'md',
      backdropDismiss: false,
    });
    await this.loading.present();
  }

  async dismissLoadingController() {
    await this.loading.dismiss();
  }
}

