import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { RxViewComponentRegistryService, ViewComponentPropertyType } from '@helix/platform/view/api';
import { IgsIconComponent, IgsIconModule } from './runtime';
import { IgsIconDesignComponent, IgsIconDesignModel, IgsIconDesignModule } from './design';

@NgModule({
  imports: [IgsIconDesignModule, IgsIconModule]
})
export class IgsIconRegistrationModule {
  constructor(
    private rxViewComponentRegistryService: RxViewComponentRegistryService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
    rxViewComponentRegistryService.register({
      type: 'com-igsl-berlintes-igs-icon',
      name: 'Igs Icon',
      group: 'BerlinTestingApp',
      componentFactory: this.componentFactoryResolver.resolveComponentFactory(IgsIconComponent),
      designComponentFactory: this.componentFactoryResolver.resolveComponentFactory(IgsIconDesignComponent),
      designComponentModel: IgsIconDesignModel,
      bundleId: 'com.igsl.berlintes',
      properties: [
        {
          name: 'styles',
          type: ViewComponentPropertyType.String
        },
        {
          name: 'hidden',
          enableExpressionEvaluation: true
        },
        {
          name: 'message',
          localizable: true,
          enableExpressionEvaluation: true
        }
      ]
    });
  }
}
