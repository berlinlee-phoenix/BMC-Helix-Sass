import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewSignatureComponent } from './new-signature.component';
import { SignaturePadModule } from 'angular2-signaturepad';
//import { AdaptButtonModule } from '@bmc-ux/adapt-angular';

@NgModule({
  imports: [CommonModule, SignaturePadModule],
  exports: [NewSignatureComponent],
  declarations: [NewSignatureComponent],
  entryComponents: [NewSignatureComponent]
})
export class NewSignatureModule {
}
