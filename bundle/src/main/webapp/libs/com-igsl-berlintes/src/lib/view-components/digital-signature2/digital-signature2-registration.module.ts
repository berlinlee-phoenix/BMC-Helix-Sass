import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { RxViewComponentRegistryService, ViewComponentPropertyType } from '@helix/platform/view/api';
import { DigitalSignature2Component, DigitalSignature2Module } from './runtime';
import { DigitalSignature2DesignComponent, DigitalSignature2DesignModel, DigitalSignature2DesignModule } from './design';

@NgModule({
  imports: [DigitalSignature2DesignModule, DigitalSignature2Module]
})
export class DigitalSignature2RegistrationModule {
  constructor(
    private rxViewComponentRegistryService: RxViewComponentRegistryService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
    rxViewComponentRegistryService.register({
      type: 'com-igsl-berlintes-digital-signature2',
      name: 'Digital Signature2',
      group: 'BerlinTestingApp',
      componentFactory: this.componentFactoryResolver.resolveComponentFactory(DigitalSignature2Component),
      designComponentFactory: this.componentFactoryResolver.resolveComponentFactory(DigitalSignature2DesignComponent),
      designComponentModel: DigitalSignature2DesignModel,
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
