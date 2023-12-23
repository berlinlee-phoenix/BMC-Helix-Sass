import { Component, OnInit } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { BaseViewComponent, IViewComponent } from '@helix/platform/view/runtime';
import { RxViewComponent } from '@helix/platform/view/api';
import { IIgsIconParameters } from '../design/igs-icon.interface';

import { GetAssetPathService } from '../../../services/get-asset-path.service';
import { distinctUntilChanged, pluck, takeUntil } from 'rxjs/operators';
import { DynamicScriptLoaderServiceService } from '../../../services/dynamic-service-loader.service';
 
@Component({
  selector: 'com-igsl-berlintes-igs-icon',
  styleUrls: ['./igs-icon.scss'],
  templateUrl: './igs-icon.component.html'
})
@RxViewComponent({
  name: 'com-igsl-berlintes-igs-icon',
})
export class IgsIconComponent extends BaseViewComponent implements OnInit,IViewComponent {
  // Contains the view component instance id.
  guid: string;
  // Contains the view component configuration.
  config: Observable<any>;
  // Contains the view component instance parameters.
  inputParams: IIgsIconParameters;
  // Icon Path
  iconPath: string;

  // Assets Root Path
  assetRootPath: string;

  constructor(private dynamicScriptLoaderServiceService: DynamicScriptLoaderServiceService,
    private getAssetPathService: GetAssetPathService) {
      super();
      // The asset root path will depend on if we are running the code in Production or development (ng serve).
      this.assetRootPath = this.getAssetPathService.getAssetRootPath('com.igsl.berlintes');
    }
  

  // Implementing set property and refresh apis.
  api = {
    // This will be called when an input parameter is set by a button "set property" action.
    setProperty: this.setProperty.bind(this)
  };



  ngOnInit() {
    // Subscribing to input parameter changes.
    this.config.subscribe((config: IIgsIconParameters) => {
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
        return throwError(`Igs Icon : property ${propertyPath} is not settable.`);
      }
    }
  }
}
