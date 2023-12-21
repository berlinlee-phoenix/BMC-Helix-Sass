import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { RxViewComponentRegistryService, ViewComponentPropertyType } from '@helix/platform/view/api';
import { NewSignatureComponent, NewSignatureModule } from './runtime';
import { NewSignatureDesignComponent, NewSignatureDesignModel, NewSignatureDesignModule } from './design';

@NgModule({
  imports: [NewSignatureDesignModule, NewSignatureModule]
})
export class NewSignatureRegistrationModule {
  constructor(
    private rxViewComponentRegistryService: RxViewComponentRegistryService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
    rxViewComponentRegistryService.register({
      type: 'com-igsl-berlintes-new-signature',
      name: 'New Signature',
      //icon: 'left-note_pencil',
      group: 'BerlinTestingApp',
      componentFactory: this.componentFactoryResolver.resolveComponentFactory(NewSignatureComponent),
      designComponentFactory: this.componentFactoryResolver.resolveComponentFactory(NewSignatureDesignComponent),
      designComponentModel: NewSignatureDesignModel,
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
