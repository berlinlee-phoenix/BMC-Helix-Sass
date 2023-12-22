import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { BaseViewComponent, IViewComponent } from '@helix/platform/view/runtime';
import { RxViewComponent } from '@helix/platform/view/api';
import { IDigitalSignature2Parameters } from '../design/digital-signature2.interface';
import { SignaturePad } from 'angular2-signaturepad';

// This example shows how to display a digital signature field, allowing
// an end user to sign with the mouse or finger on a tablet or phone for example.
// This example is leveraging several dependencies:
// https://www.npmjs.com/package/angular2-signaturepad
// npm install angular2-signaturepad --save
// Which leverages:
// https://www.npmjs.com/package/signature_pad
// https://github.com/szimek/signature_pad
@Component({
  selector: 'com-igsl-berlintes-digital-signature2',
  styleUrls: ['./digital-signature2.scss'],
  templateUrl: './digital-signature2.component.html'
})
@RxViewComponent({
  name: 'com-igsl-berlintes-digital-signature2',
})
export class DigitalSignature2Component extends BaseViewComponent implements OnInit,IViewComponent {
  @ViewChild('signaturePad', {static: true})
  signaturePad: SignaturePad;
  // Contains the view component instance id.
  guid: string;
  // Contains the view component configuration.
  config: Observable<any>;
  // Contains the view component instance parameters.
  inputParams: IDigitalSignature2Parameters;

  // Digital Signature typing
  digitalSignature: string;

  // Signature pad options.
  signaturePadOptions: any = {
    'minWidth': 0.5,
    'canvasWidth': 500,
    'canvasHeight': 300
  };

  // Implementing set property and refresh apis.
  api = {
    // This will be called when an input parameter is set by a button "set property" action.
    setProperty: this.setProperty.bind(this)
  };

  clearSignature(): void {
    this.signaturePad.clear();
    // Setting the output parameter to the base 64 picture.
    this.notifyPropertyChanged('signature', '');
  }

  // This button will broadcast the signature in the view component
  // output parameter.
  addSignature(): void {
    // Setting the output parameter to the base 64 picture (png by default).
    this.notifyPropertyChanged('signature', this.cleanBase64Signature());
  }

  // Resetting the signature when the user clicks on the signature pad.
  drawStart(): void {
    this.notifyPropertyChanged('signature', '');
  }

  // Broadcasting the signature in the view component output parameter.
  drawComplete(): void {
    this.addSignature();
  }

  // We are removing the base 64 png "header" as the create attachment process
  // activity does not need it.
  // data:image/png;base64,iVBORw(...)Jggg==
  private cleanBase64Signature(): string {
    let pngSignature: string = this.signaturePad.toDataURL() || '';

    const base64Header = ';base64,';
    const index = pngSignature.indexOf(base64Header);

    if (index !== -1) {
      pngSignature = pngSignature.substr(index + base64Header.length);
    }

    return pngSignature;
  }
  
  ngOnInit() {
    // Subscribing to input parameter changes.
    this.config.subscribe((config: IDigitalSignature2Parameters) => {
      this.inputParams = config;
    });

    // Registering the custom set property and refresh implementations.
    this.notifyPropertyChanged('api', this.api);
  }


  // This method is triggered by a button "set property" action.
  setProperty(propertyPath: string, propertyValue: any): void | Observable<never>{
    switch (propertyPath) {
      case 'hidden': {
        this.inputParams.hidden = propertyValue;
        this.notifyPropertyChanged(propertyPath, propertyValue);
        break;
      }
      case 'message': {
        this.inputParams.message = propertyValue;
        break;
      }
      default: {
        return throwError(`Digital Signature2 : property ${propertyPath} is not settable.`);
      }
    }
  }
}
