import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController, LoadingController, AlertController } from '@ionic/angular';
import { format, parseISO } from 'date-fns';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { child, equalTo, get, getDatabase, onValue, orderByChild, push, query, ref, update } from 'firebase/database';
import { AttendanceModel } from 'src/app/models/attendance.model';

@Component({
  selector: 'app-attendance-update',
  templateUrl: './attendance-update.page.html',
  styleUrls: ['./attendance-update.page.scss'],
})
export class AttendanceUpdatePage implements OnInit {

  private loading: any
  public classId: any
  public batchKey: any
  public database = getDatabase();
  public totalClassesTaken: number = 0
  className: any
  recievedDate: any
  attendanceData: any
  attendanceList: AttendanceModel[] = []
  sourceAttendanceList: AttendanceModel[] = []
  constructor(private toastController: ToastController,private activatedRouter: ActivatedRoute, private attendanceLoadingControl: LoadingController, private router: Router, private attendanceAlertController: AlertController) { }

  ngOnInit() {
    this.checkUserLoggedIn()
  }

  checkUserLoggedIn() {
    const auth = getAuth()
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.activatedRouter.paramMap.subscribe(params => {
          this.batchKey = params.get('batchKey')
          this.classId = params.get('id')
          this.recievedDate = params.get('date')
          this.getClassInfo()
          this.getAttendanceList()
        })
      } else {
        this.router.navigateByUrl('/sign-in')
      }
    });
  }

  getClassInfo() {
    const classesRef = ref(this.database, `classes/${this.batchKey}/${this.classId}`);
    const classQuery = query(classesRef);

    onValue(classQuery, (snapshot) => {
      this.className = snapshot.val().className + snapshot.val().section
    })
  }

  async getAttendanceList() {
    const studentsRef = ref(this.database, `attdce/${this.classId}`);
    const studentsQuery = query(studentsRef);

    await this.pleaseWaitLoader()
    onValue(studentsQuery, async (snapshot) => {
      this.sourceAttendanceList = []
      this.attendanceList = []
      this.attendanceData = []
      if (snapshot.val() == null) {
        await this.dismissLoadingController()
      }
      this.attendanceData = snapshot.val()
      var totalStudents = snapshot.size
      snapshot.forEach(element => {
        var studKey: any = element.key
        this.getStudent(studKey).then(studentObj => {
          this.getAttendanceStatus(studKey).then(async childsnapshot => {
            for (let key in childsnapshot) {
              var tempObj: AttendanceModel = { studentKey: "", name: "", morning: false, afternoon: false, profilePic: "", attendanceKey: "" }
              tempObj.studentKey = studKey
              tempObj.attendanceKey = key
              tempObj.name = studentObj.firstName + " " + studentObj.lastName
              tempObj.profilePic = studentObj.profilePic
              tempObj.morning = childsnapshot[key]['morning']
              tempObj.afternoon = childsnapshot[key]['afternoon']
              if(this.sourceAttendanceList.length<totalStudents){
                this.sourceAttendanceList.push(tempObj)
                this.sourceAttendanceList.sort((a: any, b: any) => a.name.localeCompare(b.name))
              }
              if (this.sourceAttendanceList.length == totalStudents) {
                this.attendanceList = this.sourceAttendanceList
                await this.dismissLoadingController();
              }
            }
          })
        })
      })
    })
  }


  async getStudent(studentId: string): Promise<any> {
    const db = getDatabase();
    var student: any;
    const snapshot = await get(ref(db, `users/${studentId}`))
    student = snapshot.val();
    return student;
  }

  async getAttendanceStatus(studentId: string): Promise<any> {
    const db = getDatabase();
    this.totalClassesTaken = (await get(ref(db, `attdce/${this.classId}/${studentId}`))).size
    const snapshot = await get(query(ref(db, `attdce/${this.classId}/${studentId}`), orderByChild("date"), equalTo(this.recievedDate)))
    if (snapshot.val() == null) {
      var newPostKey = push(child(ref(db), `attdce/${this.classId}/${studentId}`)).key;
      var postTodaysAttendance = {
        date: this.recievedDate,
        morning: true,
        afternoon: true
      }
      var data: any = []
      if (newPostKey !== null) {
        data[newPostKey] = postTodaysAttendance
        this.attendanceData[studentId][newPostKey] = postTodaysAttendance
        return data
      }
    }
    return snapshot.val();
  }


  async pleaseWaitLoader() {
    this.loading = await this.attendanceLoadingControl.create({
      message: 'Please wait...',
      mode: 'md',
      backdropDismiss: false,
    });
    await this.loading.present();
  }

  async dismissLoadingController() {
    await this.loading.dismiss();
  }

  modifyAttendance($event: { target: { checked: string; }; }, studentId: string, attendanceId: any, status: string) {
    if (status == 'morning') {
      this.attendanceData[studentId][attendanceId]['morning'] = !$event.target.checked;
    }
    else {
      this.attendanceData[studentId][attendanceId]['afternoon'] = !$event.target.checked;
    }
  }


  async saveAttendance() {

    const alertConfirm = await this.attendanceAlertController.create({
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
            await update(ref(this.database, `/attdce/${this.classId}`), this.attendanceData);
            alertConfirm.dismiss()
            this.presentToast('top', `Attendance updated on ${this.recievedDate}!`)
          },
        },
      ],
    });

    await alertConfirm.present();
  }

  async presentToast(position: 'top' | 'middle' | 'bottom', message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: position
    });

    await toast.present();
  }

  async showInfoAlert() {
    const alert = await this.attendanceAlertController.create({
      header: 'Alert',
      message: 'This feature will be enabled in the next update.',
      buttons: ['OK'],
    });

    await alert.present();
  }

}

