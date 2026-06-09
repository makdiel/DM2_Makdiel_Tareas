import { Component, inject, OnInit, signal } from '@angular/core';
//import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonNote, IonItem, IonLabel, IonText, IonInputPasswordToggle, IonButton, IonSpinner,IonInput } from '@ionic/angular/standalone';
import { ToastService } from 'src/app/services/toast.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonSpinner, IonButton, IonText, IonLabel, IonItem, IonNote,IonInput,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    //    CommonModule,
    FormsModule,
    ReactiveFormsModule, IonInputPasswordToggle],
})
//implements OnInit
export class LoginPage {
  // inject FormBuilder using the inject function and assign it to a private readonly property
  //readonly, siginifica que nadie puede modificar la variable, inyeccion de dependencias
  private readonly _formBuilder: FormBuilder = inject(FormBuilder);
  private readonly _toastService: ToastService = inject(ToastService);
  //otra forma de inyectar dependenciaas es dentro del constructor
  //constructor(private readonly _formBuilder: FormBuilder){}
  //injecto el servicio que consume una Api de usuarios
  private readonly _userService: UserService = inject(UserService)
  users = this._userService.user;


  // create a FormGroup for the login form using the FormBuilder and assign it to a public property
  loginForm: FormGroup = this._formBuilder.group({
    email: ['', [Validators.required, Validators.email]], // add email validator to the email field
    password: ['', [Validators.required, Validators.minLength(6)]], // add minLength validator to the password field
  });

   isLoading = signal(false);
  // getters for the email and password form controls to easily access them in the template
  get isEmailRequired(): boolean {
    const emailControl = this.loginForm.get('email');
    return emailControl
      ? emailControl.hasError('required') && emailControl.touched
      : false;
  }
  get isEmailInvalid(): boolean {
    const emailControl = this.loginForm.get('email');
    return emailControl
      ? emailControl.hasError('email') && emailControl.touched
      : false;
  }

  get isPasswordRequired(): boolean {
    const passwordControl = this.loginForm.get('password');
    return passwordControl
      ? passwordControl.hasError('required') && passwordControl.touched
      : false;
  }
  get isPasswordMinLengthError(): boolean {
    const passwordControl = this.loginForm.get('password');
    return passwordControl
      ? passwordControl.hasError('minlength') && passwordControl.touched
      : false;
  }

   get isFormValid(): boolean {
    return this.loginForm.valid;
    console.log(this.loginForm)
  }
   
   signIn(): void {
    if (this.isFormValid) {
      this.isLoading.set(true);
      const loginData = this.loginForm.value;
      console.log('Login data:', loginData);
      this._userService.getUsers();
      setTimeout(async () => {
        await this._toastService.showToast('Login successful');
        this.isLoading.set(false);
        // Here you can add your authentication logic, e.g., call an API to verify the credentials
      }, 2000); // Simulate a delay for the login process
    }
  }

 // constructor() {}

 // ngOnInit() {}
}
