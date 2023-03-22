import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'splash',
    pathMatch: 'full'
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./authenticate/sign-up/sign-up.module').then( m => m.SignUpPageModule)
  },
  {
    path: 'sign-in',
    loadChildren: () => import('./authenticate/sign-in/sign-in.module').then( m => m.SignInPageModule)
  },
  {
    path: 'splash',
    loadChildren: () => import('./splash/splash.module').then( m => m.SplashPageModule)
  },
  {
    path: 'my-account',
    loadChildren: () => import('./account/my-account/my-account.module').then( m => m.MyAccountPageModule)
  },
  {
    path: 'batches',
    loadChildren: () => import('./academic/batches/batches.module').then( m => m.BatchesPageModule)
  },
  {
    path: 'classes/:id',
    loadChildren: () => import('./academic/classes/classes.module').then( m => m.ClassesPageModule)
  },
  {
    path: 'students/:batchKey/:id',
    loadChildren: () => import('./academic/students/students.module').then( m => m.StudentsPageModule)
  },
  {
    path: 'student-detail/:batchKey/:classKey/:id',
    loadChildren: () => import('./academic/student-detail/student-detail.module').then( m => m.StudentDetailPageModule)
  },
  {
    path: 'staff/:id',
    loadChildren: () => import('./account/staff/staff.module').then( m => m.StaffPageModule)
  },
  {
    path: 'staff-detail/:id',
    loadChildren: () => import('./account/staff-detail/staff-detail.module').then( m => m.StaffDetailPageModule)
  },
  {
    path: 'teacher-allocation/:id',
    loadChildren: () => import('./allocate/teacher-allocation/teacher-allocation.module').then( m => m.TeacherAllocationPageModule)
  },
  {
    path: 'teacher-allocation-view/:batchKey/:id',
    loadChildren: () => import('./allocate/teacher-allocation-view/teacher-allocation-view.module').then( m => m.TeacherAllocationViewPageModule)
  },
  {
    path: 'attendance-today/:batchKey/:id',
    loadChildren: () => import('./attendance/attendance-today/attendance-today.module').then( m => m.AttendanceTodayPageModule)
  },
  {
    path: 'attendance-view/:batchKey/:id',
    loadChildren: () => import('./attendance/attendance-view/attendance-view.module').then( m => m.AttendanceViewPageModule)
  },
  {
    path: 'attendance-update/:batchKey/:id/:date',
    loadChildren: () => import('./attendance/attendance-update/attendance-update.module').then( m => m.AttendanceUpdatePageModule)
  },
  {
    path: 'my-profile',
    loadChildren: () => import('./account/my-profile/my-profile.module').then( m => m.MyProfilePageModule)
  },
  {
    path: 'attendance-monthly/:batchKey/:id/:monthYear',
    loadChildren: () => import('./attendance/attendance-monthly/attendance-monthly.module').then( m => m.AttendanceMonthlyPageModule)
  },
  {
    path: 'privacy-policy',
    loadChildren: () => import('./account/privacy-policy/privacy-policy.module').then( m => m.PrivacyPolicyPageModule)
  },
  {
    path: 'attendance-by-calendar',
    loadChildren: () => import('./attendance/attendance-by-calendar/attendance-by-calendar.module').then( m => m.AttendanceByCalendarPageModule)
  },
  {
    path: 'exam-lists/:id/:subject/:batchKey',
    loadChildren: () => import('./exams/exam-lists/exam-lists.module').then( m => m.ExamListsPageModule)
  },
  {
    path: 'my-classes/:id',
    loadChildren: () => import('./exams/my-classes/my-classes.module').then( m => m.MyClassesPageModule)
  },
  {
    path: 'update-marks/:classKey/:subject/:batchKey/:examKey',
    loadChildren: () => import('./exams/update-marks/update-marks.module').then( m => m.UpdateMarksPageModule)
  },
  {
    path: 'results',
    loadChildren: () => import('./results/results/results.module').then( m => m.ResultsPageModule)
  },
  {
    path: 'results-exam-lists/:batchKey/:classKey',
    loadChildren: () => import('./results/results-exam-lists/results-exam-lists.module').then( m => m.ResultsExamListsPageModule)
  },
  {
    path: 'results-statistics/:batchKey/:classKey/:examKey',
    loadChildren: () => import('./results/results-statistics/results-statistics.module').then( m => m.ResultsStatisticsPageModule)
  },
  {
    path: 'results-students/:batchKey/:classKey/:examKey',
    loadChildren: () => import('./results/results-students/results-students.module').then( m => m.ResultsStudentsPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
