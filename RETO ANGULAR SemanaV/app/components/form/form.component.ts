import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
//import { Contacts } from 'shared/models/contacts';
import validations from '../../Validations/validations';
//import { DatabaseService } from 'src/services/database/database';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  // Inicializar los campos del formulario. Vacíos para los string y false para el checkbox
  form: FormGroup = new FormGroup({
    FirstName: new FormControl(''),
    LastName: new FormControl(''),
    Email: new FormControl(''),
    Password: new FormControl(''),
    confirmPassword: new FormControl(''),
    acceptTerms: new FormControl(false),
  });
  submitted = false;
  constructor(/*private database: DatabaseService,*/private formBuilder: FormBuilder) {}
 
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      FirstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      LastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      //Este ultimo campo es un checkbox
      acceptTerms:[false, Validators.requiredTrue]
    },
     {
       validators: [validations.match('Password', 'confirmPassword')]
     }
    );
  }
 
  get f():{[key:string]: AbstractControl}{
    return this.form.controls;
  }
 
  onSubmit(): void{
    this.submitted = true;
    if(this.form.invalid){
      return;
    }
    console.log(JSON.stringify(this.form.value, null, 2));
  }
 
  onReset():void{
    this.submitted = false;
    this.form.reset();
  }
 
 /* addContactToDatabase(Email: string, FirstName:string, LastName:string) {
    const contact: Contacts = {Email, FirstName,LastName};
    return this.database.set(contact, `contacts/${Email}`)
  }*/
 
}
 
