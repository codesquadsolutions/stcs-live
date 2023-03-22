import { Injectable } from '@angular/core';
import { getDatabase, onValue, ref } from 'firebase/database';

@Injectable({
  providedIn: 'root'
})
export class ExamService {
  database: any = getDatabase()
  constructor() { }

  getExamLists(classKey: string) {
    return new Promise(async (resolve, reject) => {
      onValue(ref(this.database, `exams/${classKey}`), (snapshot) => {
        var exams: any = []
        snapshot.forEach(element => {
          exams.push(element.val().name)
        });
        resolve(exams)
      }, (error) => {
        reject(error);
      });
    })
  }


  getStudentsWithMarks(classKey: string, examKey: string) {
    return new Promise(async (resolve, reject) => {
      onValue(ref(this.database, `marksNode/${classKey}/${examKey}`), (snapshot) => {
        resolve(snapshot)
      }, (error) => {
        reject(error)
      })
    })
  }

  getAllStudents(classKey: string) {
    return new Promise(async (resolve, reject) => {
      onValue(ref(this.database, `classStudents/${classKey}`), (snapshot) => {
        var arrayList: any = []
        var arraySize = snapshot.size
        var flag = 0
        snapshot.forEach((element: any) => {
          this.getStudentProfileByKey(element.key).then(async (student: any) => {
            var tempObj: any = []
            tempObj.key = element.key
            tempObj.name = student.firstName + " " + student.lastName
            arrayList.push(tempObj)
            flag++
            if (snapshot.size == flag) {
              await arrayList.sort((a: any, b: any) => a.name.localeCompare(b.name))
              resolve(arrayList)
            }
          })
        })
      }, (error) => {
        reject(error)
      })
    })
  }

  getStudentProfileByKey(studentId: string) {
    return new Promise(async (resolve, reject) => {
      onValue(ref(this.database, `users/${studentId}`), (snapshot) => {
        resolve(snapshot.val())
      }, (error) => {
        reject(error)
      })
    })
  }

  getResultsByExam(classKey: string, examKey: string) {
    return new Promise(async (resolve, reject) => {
      onValue(ref(this.database, `marksNode/${classKey}/${examKey}`), async (snapshot) => {
        var resultArray:any = []
        snapshot.forEach(element => {
          resultArray.push(element.val());
        });
        resolve(resultArray)
      }, (error) => {
        reject(error)
      })
    })
  }


}

