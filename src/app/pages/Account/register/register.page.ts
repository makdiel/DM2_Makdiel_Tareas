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
import { EmailVerificationService } from 'src/app/services/user/email-verification.service';

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
   private readonly _emailVerification: EmailVerificationService = inject(
      EmailVerificationService
    );
  // create a FormGroup for the login form using the FormBuilder and assign it to a public property
  AcountForm: FormGroup = this._formBuilder.group({
    email: ['', [Validators.required, Validators.email]], // add email validator to the email field

    // password: ['', [Validators.required, Validators.minLength(6)]], // add minLength validator to the password field
  });

  isLoading = signal(false);

  sent = signal(false);
  approved = signal(false);

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

  /*
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
*/
  //getter form valido
  get isFormValid(): boolean {
    return this.AcountForm.valid;
  }

  validarEmail(): void {
    const dto = this.AcountForm.value ;
      this._emailVerification.verificarEmail(dto );
      console.log(dto)
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
