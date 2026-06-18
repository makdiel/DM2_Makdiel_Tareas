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
  IonIcon,
} from '@ionic/angular/standalone';
import { ToastService } from 'src/app/services/toast.service';
import { EmailDto } from 'src/app/dtos/user/email.dto';
import { identifierDto } from 'src/app/dtos/user/identifier.dto';
import { EmailVerificationService } from 'src/app/services/user/email-verification.service';
import { tokenDto } from 'src/app/dtos/user/token.dto';

@Component({
  selector: 'app-perfiles',
  templateUrl: './perfiles.page.html',
  styleUrls: ['./perfiles.page.scss'],
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
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonIcon,
  ],
})
export class PerfilesPage {
  // inject FormBuilder using the inject function and assign it to a private readonly property
  private readonly _formBuilder: FormBuilder = inject(FormBuilder);
  private readonly _toastService: ToastService = inject(ToastService);
  private readonly _emailVerification: EmailVerificationService = inject(
    EmailVerificationService
  );

  // create a FormGroup for the login form using the FormBuilder and assign it to a public property
  AcountForm: FormGroup = this._formBuilder.group({
    Name: ['', [Validators.required, Validators.minLength(4)]], // es requerido
    surnames: [''],
    address: [''],
    phoneNumber: [
      '',
      [
        Validators.required,
        // Validators.pattern('^[0-9]{8}$'), password
        Validators.minLength(8),
      ],
    ],
    email: ['', [Validators.required, Validators.email]], // add email validator to the email field
    password: ['', [Validators.required, Validators.minLength(5)]],
    token: [''],
  });
  isLoading = signal(false);
  emailPerfil = signal({});

  //Getters Name
  get isNameRequired(): boolean {
    const nameControl = this.AcountForm.get('Name');
    return nameControl
      ? nameControl.hasError('required') && nameControl.touched
      : false;
  }

  get isNameMinLengthError(): boolean {
    const nameLenControl = this.AcountForm.get('Name');
    return nameLenControl
      ? nameLenControl.hasError('minlength') && nameLenControl.touched
      : false;
  }

  //Getter phone
  get isPhoneRequired(): boolean {
    const namePhoneControl = this.AcountForm.get('phoneNumber');
    return namePhoneControl
      ? namePhoneControl.hasError('required') && namePhoneControl.touched
      : false;
  }
  get isPhoneMinLengthError(): boolean {
    const phoneLenControl = this.AcountForm.get('phoneNumber');
    return phoneLenControl
      ? phoneLenControl.hasError('minlength') && phoneLenControl.touched
      : false;
  }
  get isPhoneNumber(): boolean {
    const phoneNumberControl = this.AcountForm.get('phoneNumber');
    return phoneNumberControl
      ? phoneNumberControl.hasError('pattern') && phoneNumberControl.touched
      : false;
  }

  // getters for the email and password form controls to easily access them in the template
  get isEmailRequired(): boolean {
    const emailControl = this.AcountForm.get('email');
    identifierDto : {this.AcountForm.get('email') };
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

  get isPasswordRequired(): boolean {
    const passwordControl = this.AcountForm.get('password');
    return passwordControl
      ? passwordControl.hasError('required') && passwordControl.touched
      : false;
  }
  get isPasswordMinLengthError(): boolean {
    const passwordControl = this.AcountForm.get('password');
    return passwordControl
      ? passwordControl.hasError('minlength') && passwordControl.touched
      : false;
  }

  //getter form valido
  get isFormValid(): boolean {
    return this.AcountForm.valid;
  }

   validarEmail(): void {
    const dto = { email:  this.AcountForm.value.email };
      this._emailVerification.verificarEmail(dto );
      console.log(dto)
  }

   validarToken(): void {
    const dto = { email: this.AcountForm.value.email, token: this.AcountForm.value.token };
      this._emailVerification.verificarToken(dto );
      console.log(dto)
  }

  signIn(): void {


    if (this.isFormValid) {
      this.isLoading.set(true);
      const emailData: EmailDto = {
        method: 0,
        ...this.AcountForm.value,
        
      };
    
     //this._emailVerification.verificarToken(emailData);
      this._emailVerification.CrearCuenta(emailData);
      this.isLoading.set(false);
    }
  }
  /* signIn(): void {
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
  }*/
  constructor() {}

  // ngOnInit() {}
}
