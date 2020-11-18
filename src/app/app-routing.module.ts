import { AuthGuardGuard } from './Auth/auth-guard.guard';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'chooes-level',
    loadChildren: () => import('./pageControl/chooes-level/chooes-level/chooes-level.module').then( m => m.ChooesLevelPageModule),
    canActivate: [AuthGuardGuard]
  },
  {
    path: '',
    redirectTo: 'chooes-level',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./Auth/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./Auth/register/register.module').then( m => m.RegisterPageModule)
  },
  // {
  //   path: 'chooes-level',
  //   loadChildren: () => import('./pageControl/chooes-level/chooes-level/chooes-level.module').then( m => m.ChooesLevelPageModule)
  // },
  {
    path: 'level1',
    loadChildren: () => import('./pageControl/level1/level1.module').then( m => m.Level1PageModule)
  },
  {
    path: 'level2',
    loadChildren: () => import('./pageControl/level2/level2.module').then( m => m.Level2PageModule)
  },
  {
    path: 'level3',
    loadChildren: () => import('./pageControl/level3/level3.module').then( m => m.Level3PageModule)
  },
  {
    path: 'video-tutorial',
    loadChildren: () => import('./pageControl/video-tutorial/video-tutorial.module').then( m => m.VideoTutorialPageModule)
  },
  {
    path: 'view-score',
    loadChildren: () => import('./pageControl/view-score/view-score.module').then( m => m.ViewScorePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
