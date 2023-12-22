import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DigitalSignature2Component } from './digital-signature2.component';
import { SignaturePadModule } from 'angular2-signaturepad';
import { AdaptButtonModule } from '@bmc-ux/adapt-angular';

@NgModule({
  imports: [CommonModule, SignaturePadModule, AdaptButtonModule],
  exports: [DigitalSignature2Component],
  declarations: [DigitalSignature2Component],
  entryComponents: [DigitalSignature2Component]
})
export class DigitalSignature2Module {
}
