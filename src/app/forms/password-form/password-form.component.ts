import { Component, forwardRef, OnDestroy } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IPassword } from '../shared/password';

@Component({
  selector: 'app-password-form',
  templateUrl: './password-form.component.html',
  styleUrls: ['./password-form.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PasswordFormComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => PasswordFormComponent),
      multi: true
    }
  ]
})
export class PasswordFormComponent implements OnDestroy, ControlValueAccessor, Validator {

  passwordFormGroup: FormGroup;
  subscriptions: Subscription[] = [];

  onChange: any = () => {};
  onTouched: any = () => {};

  constructor(private formBuilder: FormBuilder) {
    this.passwordFormGroup = this.formBuilder.group({
      password: new FormControl('', [Validators.minLength(3)]),
      repeatedPassword: new FormControl('', [Validators.required])
    }, {validator: this.passwordsValidator});
    this.subscriptions.push(
      this.passwordFormGroup.valueChanges.subscribe(value => {
        this.onChange(value);
        this.onTouched();
      })
    )
  }
  
  get passwordForm() {
    return this.passwordFormGroup.controls; }

  get value(): IPassword{
    return this.passwordFormGroup.value;
  }

  set value(value: IPassword){
    this.passwordFormGroup.setValue(value);
    this.onChange(value);
    this.onTouched(value);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  writeValue(value: any): void {
    if(value){ this.value = value;}
    if(value === null){this.passwordFormGroup.reset();}
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  validate(control: AbstractControl): ValidationErrors | null{
    return this.passwordFormGroup.valid ? null : {passwords: {invalid: true}};
  }

  passwordsValidator(formGroup: FormGroup): any {
    let password = formGroup.get('password').value;
    let repeatedPassword = formGroup.get('repeatedPassword').value;
    return password === repeatedPassword ? null : { passwordsDiffer: true };
  }
}
