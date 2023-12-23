import { Component, Input } from '@angular/core';
import { IgsIconDesignModel } from './igs-icon-design.model';

@Component({
  selector: 'com-igsl-berlintes-igs-icon-design',
  styleUrls: ['./igs-icon-design.scss'],
  templateUrl: './igs-icon-design.component.html'
})
export class IgsIconDesignComponent {
  @Input()
  model: IgsIconDesignModel;
}
