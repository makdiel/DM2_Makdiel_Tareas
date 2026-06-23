import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar,IonButton,IonInput,IonLabel,IonNote,IonSpinner,IonText, IonItem, IonImg } from '@ionic/angular/standalone';
import { UserService } from 'src/app/services/user/user.service';
import { CameraService } from 'src/app/services/shared/camera.service';
import { CloudinaryService } from 'src/app/services/shared/cloudinary.service';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.page.html',
  styleUrls: ['./editar-perfil.page.scss'],
  standalone: true,
  imports: [IonImg, IonItem, IonContent, IonHeader, IonTitle, IonToolbar,IonButton,IonInput,IonLabel,IonNote,IonSpinner,IonText, ReactiveFormsModule]
})
export class EditarPerfilPage {
  private readonly _cameraService: CameraService = inject(CameraService);
  private readonly _cloudinaryService : CloudinaryService = inject(CloudinaryService)
  private readonly _formBuilder : FormBuilder = inject(FormBuilder);
  private readonly _userService : UserService = inject(UserService);
  defaultAvatar = 'assets/icon.jpg';
  profileImage = signal(this.defaultAvatar);
  user = this._userService.user;

  editPerfilForm = this._formBuilder.group({
    email : ['',[Validators.required,Validators.email]],
    names : ['', Validators.required],
    surnames : ['', Validators.required],
    address : [''],
  })


   get isEmailRequired(): boolean {
    const emailControl = this.editPerfilForm.get('email');
    identifierDto: {
      this.editPerfilForm.get('email');
    }
    return emailControl
      ? emailControl.hasError('required') && emailControl.touched
      : false;
  }
  get isEmailInvalid(): boolean {
    const emailControl = this.editPerfilForm.get('email');
    return emailControl
      ? emailControl.hasError('email') && emailControl.touched
      : false;
  }

   //Getters Name
  get isNameRequired(): boolean {
    const nameControl = this.editPerfilForm.get('names');
    return nameControl
      ? nameControl.hasError('required') && nameControl.touched
      : false;
  }

  get isSurnamesRequired(): boolean {
    const nameControl = this.editPerfilForm.get('surnames');
    return nameControl
      ? nameControl.hasError('required') && nameControl.touched
      : false;
  }

   get isFormValid(): boolean {
    return this.editPerfilForm.valid;
  }

  constructor() { 
    this._userService.getUser();

    effect(()=> {
      const user = this.user();
      if(user){
         this.editPerfilForm.patchValue({
          email: user.email,
          names: user.names,
          surnames: user.surnames,
          address: user.address,
        });
        this.profileImage.set(user.imageProfile || this.defaultAvatar);
      }

    })
  }
    openCamera(): void {
    this._cameraService.onTakePhoto().then((photo) => {
      if (photo) {
        this.profileImage.set(photo);
      }
    });
  }

  savePerfil(): void {
    if(!this.isFormValid) return ;
    
  }

}
