import { Component, forwardRef, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IProfile } from '../shared/profile';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ProfileFormComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ProfileFormComponent),
      multi: true
    }
  ]
})
export class ProfileFormComponent implements OnDestroy, ControlValueAccessor, Validator {

  profileFormGroup: FormGroup;
  subscriptions: Subscription[] = [];

  onChange: any = () => {};
  onTouched: any = () => {};

  constructor(private formBuilder: FormBuilder) {
    this.profileFormGroup = this.formBuilder.group({
      username: new FormControl('', [Validators.minLength(3)]),
      name: new FormControl('', [Validators.minLength(3)]),
      surname: new FormControl('', [Validators.minLength(3)]),
      age: new FormControl('', [Validators.required, Validators.min(13)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phoneNumber: new FormControl('', [Validators.pattern(/[0-9]{9}/), Validators.maxLength(9)])
    });

    this.subscriptions.push(
      this.profileFormGroup.valueChanges.subscribe(value => {
        this.onChange(value);
        this.onTouched();
      })
    )
  }

  get profileForm() {
    return this.profileFormGroup.controls; }

  get value(): IProfile{
    return this.profileFormGroup.value;
  }

  set value(value: IProfile){
    this.profileFormGroup.setValue(value);
    this.onChange(value);
    this.onTouched(value);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  writeValue(value: any): void {
    if(value){ this.value = value;}
    if(value === null){this.profileFormGroup.reset();}
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  validate(control: AbstractControl): ValidationErrors | null{
    return this.profileFormGroup.valid ? null : {passwords: {invalid: true}};
  }

}
