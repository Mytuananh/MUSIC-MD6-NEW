import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';

import { HomeComponent } from './pages/home/home.component';
import { GettingStartedComponent } from './pages/gettingstarted/gettingstarted.component';

import { HttpClientModule } from '@angular/common/http';
import { NgxAudioPlayerModule } from 'projects/ngx-audio-player/src/public_api';
import { MatButtonModule } from '@angular/material/button';

import {NavBarModule} from './shared/navbar';
import {FooterModule} from './shared/footer';
import { RegisterComponent } from './form-login/register/register.component';
import { LoginComponent } from './form-login/login/login.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AdminAccountComponent } from './form-login/admin-account/admin-account.component';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment.prod';
import { UploadAvatarComponent } from './upload/upload-avatar/upload-avatar.component';
import { ChangeAvatarComponent } from './manager-profile/change-avatar/change-avatar.component';
import {httpInterceptorProvider} from './security/auth.interceptor';
import { ListUserComponent } from './admin-manager/list-user/list-user.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTableModule} from '@angular/material/table';
import { ListSongComponent } from './song-manager/list-song/list-song.component';
import {MatTabsModule} from '@angular/material/tabs';

import { ChangeProfileComponent } from './manager-profile/change-profile/change-profile.component';
import { ChangePasswrordComponent } from './manager-profile/change-passwrord/change-passwrord.component';
import { ChangeManageComponent } from './manager-profile/change-manage/change-manage.component';

import { DialogComponent } from './song-manager/dialog/dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import { EditSongComponent } from './song-manager/edit-song/edit-song.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { UploadMusicComponent } from './upload/upload-music/upload-music.component';
import {MatSelectModule} from '@angular/material/select';
import { CreateSongComponent } from './song-manager/create-song/create-song.component';
import { EditSingerComponent } from './singer-manager/edit-singer/edit-singer.component';
import { CreateSingerComponent } from './singer-manager/create-singer/create-singer.component';
import { SingerListComponent } from './singer-manager/singer-list/singer-list.component';




export const appRoutes: Routes = [
  { path: '', component: HomeComponent, data: { title: 'Home' } },
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'admin-account', component: AdminAccountComponent},
  {path: 'upload-avatar', component: UploadAvatarComponent},
  {path: 'change-avatar', component: ChangeAvatarComponent},
  {path: 'change-password' , component: ChangePasswrordComponent},
  {path: 'change-manage', component: ChangeManageComponent},
  {path: 'change-profile', component: ChangeProfileComponent},

  {path: 'update-song/:id', component: EditSongComponent},
  {path: 'create-song', component: CreateSongComponent},
  {path: 'update-singer/:id', component: EditSingerComponent},
  {
    path: 'guide/getting-started',
    component: GettingStartedComponent,
    data: { title: 'Getting Started' }
  }
];

@NgModule({
  // tslint:disable-next-line:max-line-length
  declarations: [AppComponent, HomeComponent, GettingStartedComponent, RegisterComponent, LoginComponent, AdminAccountComponent, UploadAvatarComponent, ChangeAvatarComponent, ListUserComponent, ListSongComponent, DialogComponent, EditSongComponent, UploadMusicComponent, CreateSongComponent, EditSingerComponent, CreateSingerComponent, SingerListComponent, ChangePasswrordComponent, ChangeManageComponent, ChangeProfileComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatRadioModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatButtonModule,
    BrowserAnimationsModule,
    NavBarModule, FooterModule,
    NgxAudioPlayerModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    // tslint:disable-next-line:max-line-length
    RouterModule.forRoot(appRoutes, {useHash: false}), MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, MatPaginatorModule, MatProgressSpinnerModule, MatTableModule, MatTabsModule, MatDialogModule, MatDatepickerModule, MatSelectModule
  ],
  providers: [httpInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule {

}
