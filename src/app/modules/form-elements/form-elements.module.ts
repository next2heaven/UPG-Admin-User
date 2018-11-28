import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { 
  MatInputModule,
  MatButtonModule,
  MatCheckboxModule
  } from '@angular/material';
  

@NgModule({
  exports: [
    ReactiveFormsModule,
    FormsModule,
    
    MatInputModule,    
    MatButtonModule,
    MatCheckboxModule,
  ],
})
export class FormElementsModule { }