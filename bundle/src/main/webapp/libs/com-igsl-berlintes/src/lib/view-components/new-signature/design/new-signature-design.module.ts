import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';
import { NewSignatureDesignComponent } from './new-signature-design.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [NewSignatureDesignComponent],
  entryComponents: [NewSignatureDesignComponent]
})
export class NewSignatureDesignModule {
}
