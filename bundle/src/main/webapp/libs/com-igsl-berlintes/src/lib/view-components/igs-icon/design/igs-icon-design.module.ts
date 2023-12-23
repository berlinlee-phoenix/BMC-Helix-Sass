import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';
import { IgsIconDesignComponent } from './igs-icon-design.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [IgsIconDesignComponent],
  entryComponents: [IgsIconDesignComponent]
})
export class IgsIconDesignModule {
}
