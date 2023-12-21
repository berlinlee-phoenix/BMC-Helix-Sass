import { Component, Input } from '@angular/core';
import { NewSignatureDesignModel } from './new-signature-design.model';

@Component({
  selector: 'com-igsl-berlintes-new-signature-design',
  styleUrls: ['./new-signature-design.scss'],
  templateUrl: './new-signature-design.component.html'
})
export class NewSignatureDesignComponent {
  @Input()
  model: NewSignatureDesignModel;
}
