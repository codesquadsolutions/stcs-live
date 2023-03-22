import { Injectable } from '@angular/core';
import { getDatabase, ref, onValue, get, update } from "firebase/database";
import { Teacher } from 'src/app/models/teacher.model';

@Injectable({
  providedIn: 'root'
})
export class ClassService {
  database: any = getDatabase()
  constructor() { }

  //getting all batches
  getAllBatches() {
    return new Promise((resolve, reject) => {
      const starCountRef = ref(this.database, 'batches/');
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        console.log(data)
        resolve(data);
      }, (error) => {
        reject(error);
      });
    });
  }

  //getting all classes
  getAllClasses(batchKey: string) {
    return new Promise((resolve, reject) => {
      debugger
      const starCountRef = ref(this.database, `classes/${batchKey}`);
      onValue(starCountRef, (snapshot) => {
        debugger
        var allClasses: any[] = []
        snapshot.forEach((element: any) => {
          var tempObj: any = element.val()
          tempObj.key = element.key
          allClasses.push(tempObj)
          if (allClasses.length == snapshot.size) {
            resolve(allClasses)
          }
        });
      }, (error) => {
        reject(error);
      });
    });
  }


  //getting all classes
  getAllClassesWithTeachers(batchKey: string) {
    return new Promise((resolve, reject) => {
      var sourceAllClasses: any = []
      const starCountRef = ref(this.database, `classes/${batchKey}`);
      onValue(starCountRef, (snapshot) => {
        const totalClasses = snapshot.size
        var tenA:any = []
        var tenB:any = []
        snapshot.forEach((data) => {
          this.getTeacher(data.val().classTeacher).then((teacher: any) => {
            this.getCount(data.key).then((count) => {
              var tempObj: any = []
              tempObj.className = data.val().className +" "+ data.val().section
              tempObj.classTeacher = teacher.firstName + " " + teacher.lastName
              tempObj.count = count
              tempObj.key = data.key
              if(tempObj.className == "10 A"){
                tenA = tempObj
              }
              else if(tempObj.className == "10 B"){
                tenB = tempObj
              }
              else{
                sourceAllClasses.push(tempObj)
                sourceAllClasses.sort((a: any, b: any) => a.className.localeCompare(b.className))
              }
              if (sourceAllClasses.length == (totalClasses - 2)) {
                sourceAllClasses.push(tenA)
                sourceAllClasses.push(tenB)
              }
              if (sourceAllClasses.length == totalClasses) {
                resolve(sourceAllClasses)
              }
            })
          })
        })
      }, (error) => {
        reject(error);
      })
    });
  }

  getTeacher(teacherId: string) {
    return new Promise(async (resolve, reject) => {
      var teacher: Teacher;
      const snapshot = await get(ref(this.database, `users/${teacherId}`))
      teacher = snapshot.val()
      resolve(teacher)
    })
  }

  getCount(classId: any) {
    return new Promise(async (resolve, reject) => {
      var studentCount: number
      const snapshot = await get(ref(this.database, `classStudents/${classId}`))
      studentCount = snapshot.size
      resolve(studentCount)
    })
  }

  getBatchInfo(batchKey: string) {
    return new Promise(async (resolve, reject) => {
      const snapshot = await get(ref(this.database, `batches/${batchKey}`))
      resolve(snapshot.val())
    })
  }

  getClassInfo(batchKey: string, classKey: string) {
    return new Promise(async (resolve, reject) => {
      const snapshot = await get(ref(this.database, `classes/${batchKey}/${classKey}`))
      resolve(snapshot.val())
    })
  }

  getAllocations(batchKey: string, classKey: string) {
    return new Promise((resolve, reject) => {
      const starCountRef = ref(this.database, `classes/${batchKey}/${classKey}/subjectTeachers/`)
      onValue(starCountRef, async (snapshot) => {
        resolve(snapshot.val())
      }, (error) => {
        reject(error);
      });
    });
  }

  async updateAllocations(batchKey: string, classKey: string, data: any) {
    return new Promise(async (resolve, reject) => {
      await update(ref(this.database, `classes/${batchKey}/${classKey}/subjectTeachers/`), data);
      resolve("updated")
    })
  }

}
