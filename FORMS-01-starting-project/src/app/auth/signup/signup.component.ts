import {Component} from '@angular/core';
import {AbstractControl, FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

function equalValues(controlName1: string, controlName2: string) {
  return (control: AbstractControl) => {
    const password = control.get(controlName1)?.value;
    const confirmPassword = control.get(controlName2)?.value;
    return password !== confirmPassword ? {passwordsAreNotIdentical: true} : null;
  }
}

@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  imports: [
    ReactiveFormsModule
  ]
})
export class SignupComponent {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    passwords: new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
    }, equalValues('password', 'confirmPassword')),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    address: new FormGroup({
      street: new FormControl('', [Validators.required]),
      number: new FormControl('', [Validators.required]),
      postalCode: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
    }),
    role: new FormControl<'student' | 'teacher' | 'employee' | 'founder' | 'other'>(
      'student', [Validators.required]
    ),
    source: new FormArray([
      new FormControl(false),
      new FormControl(false),
      new FormControl(false),
    ]),
    agree: new FormControl(false, [Validators.required]),
  });

  onSignup() {
    if (this.form.invalid) {
      console.log('invalid');
    }
    console.log(this.form);
  }

  onReset() {
    this.form.reset();
  }
}
