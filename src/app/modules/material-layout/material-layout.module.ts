import { NgModule } from '@angular/core';

import { 
  MatCardModule,
  MatGridListModule,
  MatProgressSpinnerModule } from '@angular/material';

@NgModule({
  exports: [
    MatCardModule,
    MatGridListModule,
    MatProgressSpinnerModule
  ],
})
export class MaterialLayoutModule { }