import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  constructor() { }

  fileValidator(acceptableExtensions: string[], maxFileSize: number): ValidatorFn{
    return (control: AbstractControl): {[key: string]: any} | null => {
        let file = control.value;
    
        if(file != null){
          console.log();
        }

        if(file == null){
          return null;
        } else if(acceptableExtensions.findIndex(element => element === file.name.split(".")[1]) == -1){
          return {forbiddenExtension: {value: file.name.split(".")[1]}}
        }else if(file.size > maxFileSize){
          return {forbiddenSize: {value: file.size}}
        }
        return null;
    };
  }
}
