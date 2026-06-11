import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  ActionSheetController,  
  IonContent,
  IonInput,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonNote,
  IonLabel,
  IonText,
  IonItem,
  IonInputPasswordToggle,
  IonSpinner,
  IonButton,
} from '@ionic/angular/standalone';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [    
    IonButton,
    IonInput,
    IonSpinner,
    IonInputPasswordToggle,
    IonItem,
    IonText,
    IonLabel,
    IonNote,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class RegisterPage {
  private readonly _actionSheetController: ActionSheetController = inject(
    ActionSheetController
  );
  // inject FormBuilder using the inject function and assign it to a private readonly property
  private readonly _formBuilder: FormBuilder = inject(FormBuilder);
  private readonly _toastService: ToastService = inject(ToastService);

  // create a FormGroup for the login form using the FormBuilder and assign it to a public property
  AcountForm: FormGroup = this._formBuilder.group({
    StudentName: ['', [Validators.required, Validators.minLength(4)]], // es requerido
    email: ['', [Validators.required, Validators.email]], // add email validator to the email field
    studentphone: [
      '',
      [
        Validators.required,
        Validators.pattern('^[0-9]{8}$'),
        Validators.minLength(10),
      ],
    ], // add pattern validator to the phone field to allow only 10 digits
    studentdni: [
      '',
      [
        Validators.required,
        Validators.pattern('^[0-9]{8}$'),
        Validators.minLength(13),
      ],
    ], // add pattern validator to the phone field to allow only 13 digits
    //StudentGenre: [''], // es requerido
    // password: ['', [Validators.required, Validators.minLength(6)]], // add minLength validator to the password field
  });

  isLoading = signal(false);

  sent = signal(false);
  approved = signal(false);

  //Getters StudentName
  get isEstudentNameRequired(): boolean {
    const nameControl = this.AcountForm.get('StudentName');
    return nameControl
      ? nameControl.hasError('required') && nameControl.touched
      : false;
  }
  get isEstudentNameMinLengthError(): boolean {
    const nameLenControl = this.AcountForm.get('StudentName');
    return nameLenControl
      ? nameLenControl.hasError('minlength') && nameLenControl.touched
      : false;
  }

  // getters for the email and password form controls to easily access them in the template
  get isEmailRequired(): boolean {
    const emailControl = this.AcountForm.get('email');
    return emailControl
      ? emailControl.hasError('required') && emailControl.touched
      : false;
  }
  get isEmailInvalid(): boolean {
    const emailControl = this.AcountForm.get('email');
    return emailControl
      ? emailControl.hasError('email') && emailControl.touched
      : false;
  }

  //Getter StudentPhone
  get isEstudentPhoneRequired(): boolean {
    const namePhoneControl = this.AcountForm.get('studentphone');
    return namePhoneControl
      ? namePhoneControl.hasError('required') && namePhoneControl.touched
      : false;
  }
  get isEstudentPhoneMinLengthError(): boolean {
    const phoneLenControl = this.AcountForm.get('studentphone');
    return phoneLenControl
      ? phoneLenControl.hasError('minlength') && phoneLenControl.touched
      : false;
  }
  get isEstudentPhoneNumber(): boolean {
    const phoneNumberControl = this.AcountForm.get('studentphone');
    return phoneNumberControl
      ? phoneNumberControl.hasError('pattern') && phoneNumberControl.touched
      : false;
  }

  //Getter Studentdni
  get isEstudentDniRequired(): boolean {
    const nameDniControl = this.AcountForm.get('studentdni');
    return nameDniControl
      ? nameDniControl.hasError('required') && nameDniControl.touched
      : false;
  }
  get isEstudentDniMinLengthError(): boolean {
    const dniLenControl = this.AcountForm.get('studentdni');
    return dniLenControl
      ? dniLenControl.hasError('minlength') && dniLenControl.touched
      : false;
  }
  get isEstudentDniNumber(): boolean {
    const dniNumberControl = this.AcountForm.get('studentdni');
    return dniNumberControl
      ? dniNumberControl.hasError('pattern') && dniNumberControl.touched
      : false;
  }

  // getter password
  get isPasswordMinLengthError(): boolean {
    const passwordControl = this.AcountForm.get('password');
    return passwordControl
      ? passwordControl.hasError('minlength') && passwordControl.touched
      : false;
  }
  get isPasswordRequired(): boolean {
    const passwordControl = this.AcountForm.get('password');
    return passwordControl
      ? passwordControl.hasError('required') && passwordControl.touched
      : false;
  }

  //getter form valido
  get isFormValid(): boolean {
    return this.AcountForm.valid;
  }

  
  signIn(): void {
    if (this.isFormValid) {
      this.isLoading.set(true);
      const loginData = this.AcountForm.value;
      console.log('Login data:', loginData);

      setTimeout(async () => {
        await this._toastService.showToast('Login successful');
        this.isLoading.set(false);
        // Here you can add your authentication logic, e.g., call an API to verify the credentials
      }, 20000); // Simulate a delay for the login process
    }
  }

  //isActionSheetOpen = signal(false);
  //isAlertOpen = signal(false);
  //openToast = signal(false);

  //constructor() { }

  // inject FormBuilder using the constructor and assign it to a private readonly property
  // constructor(private readonly _formBuilder: FormBuilder) {}
}
