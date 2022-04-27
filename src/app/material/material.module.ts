import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [],
  imports: [CommonModule, MatIconModule, MatMenuModule, ReactiveFormsModule],
  exports: [MatIconModule, MatMenuModule, ReactiveFormsModule],
})
export class MaterialModule {}
