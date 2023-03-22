import { Injectable } from '@angular/core';
import { getDatabase, get, ref } from 'firebase/database';
import { Student } from 'src/app/models/student.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  database = getDatabase();


  constructor() { }

  getStudentById(studentId: string) {
    return new Promise(async (resolve, reject) => {
      var student: Student;
      const snapshot = await get(ref(this.database, `users/${studentId}`));
      student = snapshot.val();
      if(student != null)
        resolve(student)
      else
        reject("No Student found for this Id")
    })
  }
}

