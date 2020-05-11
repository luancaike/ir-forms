import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [FormBuilder],
})
export class AppComponent {
  title = 'forms-generator';
  profileForm = this.fb.group({
    username: [
      null,
      [Validators.required, Validators.minLength(2), Validators.maxLength(10)],
    ],
    password: [
      null,
      [Validators.required, Validators.minLength(2), Validators.maxLength(10)],
    ],
    savelogin: [null, [Validators.required]],
  });

  constructor(private fb: FormBuilder) {}

  onSubmit(): void {
    // TODO: Use EventEmitter with form value
    console.log(this.profileForm);
  }
}
