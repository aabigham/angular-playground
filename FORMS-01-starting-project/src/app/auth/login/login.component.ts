/** TEMPLATE DRIVEN **/
// import {afterNextRender, Component, DestroyRef, inject, viewChild} from '@angular/core';
// import {FormsModule, NgForm} from "@angular/forms";
// import {debounceTime} from "rxjs";
//
// @Component({
//   selector: 'app-login',
//   standalone: true,
//   templateUrl: './login.component.html',
//   styleUrl: './login.component.css',
//   imports: [
//     FormsModule
//   ]
// })
// export class LoginComponent {
//   private destroyRef = inject(DestroyRef);
//   private form = viewChild.required<NgForm>('formElement');
//
//   constructor() {
//     // Setup form save in local storage
//     afterNextRender(() => {
//       // Set saved form datas
//       const savedForm = window.localStorage.getItem('saved-login-form');
//       if (savedForm) {
//         const loadedFormData = JSON.parse(savedForm);
//         setTimeout(() => {
//           this.form().setValue({email: loadedFormData.email, password: ''});
//         }, 1);
//       }
//
//       // Save form data after 500 millis of inactivity
//       const subscription = this.form().valueChanges?.pipe(
//         debounceTime(500),
//       ).subscribe({
//         next: value => {
//           console.log('changes: ', value);
//           window.localStorage.setItem('saved-login-form', JSON.stringify({email: value.email}));
//         },
//       });
//
//       this.destroyRef.onDestroy(() => subscription?.unsubscribe());
//     });
//   }
//
//   onLogin(formData: NgForm) {
//     if (formData.form.invalid) {
//       return;
//     }
//
//     const email = formData.form.value.email;
//     const password = formData.form.value.password;
//
//     console.log(formData.form);
//     console.log(email, password);
//
//     formData.form.reset();
//   }
// }

/** REACTIVE **/
import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {debounceTime, of} from "rxjs";

function mustContainQuestionMark(control: AbstractControl) {
  return control.value.includes('?') ? null : {doesNotContainQuestionMark: true};
}

function isEmailUnique(control: AbstractControl) {
  return control.value === 'test@example.com' ? of({notUnique: true}) : of(null);
}

// const savedForm = window.localStorage.getItem('saved-login-form');
// let initialEmail = '';
// if (savedForm) {
//   const loadedFormData = JSON.parse(savedForm);
//   initialEmail = loadedFormData.email;
// }

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ]
})
export class LoginComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email], isEmailUnique),
    password: new FormControl('', [Validators.required, Validators.minLength(6), mustContainQuestionMark]),
  });

  ngOnInit(): void {
    // Setup form save in local storage
    const savedForm = window.localStorage.getItem('saved-login-form');
    if (savedForm) {
      const loadedFormData = JSON.parse(savedForm);
      this.form.patchValue({email: loadedFormData.email, password: ''});
    }

    // Save form data after 500 millis of inactivity
    const subscription = this.form.valueChanges.pipe(
      debounceTime(500),
    ).subscribe({
      next: value => {
        console.log('changes: ', value);
        window.localStorage.setItem('saved-login-form', JSON.stringify({email: value.email}));
      },
    });

    this.destroyRef.onDestroy(() => subscription?.unsubscribe());
  }

  onLogin() {
    console.log(this.form.value.email);
    console.log(this.form.value.password);
  }

  get isEmailInvalid() {
    return this.form.controls.email.touched && this.form.controls.email.dirty && this.form.controls.email.invalid;
  }

  get isPasswordInvalid() {
    return this.form.controls.password.touched && this.form.controls.password.dirty && this.form.controls.password.invalid;
  }
}
