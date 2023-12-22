import { Component, Input } from '@angular/core';
import { DigitalSignature2DesignModel } from './digital-signature2-design.model';

@Component({
  selector: 'com-igsl-berlintes-digital-signature2-design',
  styleUrls: ['./digital-signature2-design.scss'],
  templateUrl: './digital-signature2-design.component.html'
})
export class DigitalSignature2DesignComponent {
  @Input()
  model: DigitalSignature2DesignModel;
}
