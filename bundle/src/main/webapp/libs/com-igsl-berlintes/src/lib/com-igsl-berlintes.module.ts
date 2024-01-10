import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RxApplicationRegistryService, RxLocalizationService } from '@helix/platform/shared/api';
import * as defaultApplicationStrings from './i18n/localized-strings.json';
import { NewSignatureRegistrationModule } from './view-components/new-signature/new-signature-registration.module';
import { DigitalSignature2RegistrationModule } from './view-components/digital-signature2/digital-signature2-registration.module';
import { ComIgslBerlintesInitializer } from './com-igsl-berlintes-initializer.service';

@NgModule({
  imports: [
    CommonModule, 
    // Custom View Components declaration (Registration Modules).
    NewSignatureRegistrationModule, 
    DigitalSignature2RegistrationModule,
    // Custom Actions

    // Global Load
  ],
  providers: [
    // The bundle Initializer
    ComIgslBerlintesInitializer
  ]
})
export class ComIgslBerlintesModule {
  constructor(private rxLocalizationService: RxLocalizationService,
    private comIgslBerlintesInitializer: ComIgslBerlintesInitializer,
    private rxApplicationRegistryService: RxApplicationRegistryService) {
    this.rxLocalizationService.setDefaultApplicationStrings(defaultApplicationStrings['default']);

    // We register the application initializer for our application bundle (com.example.test210500).
    //
    // The initializer will be called by the Platform at the very start of the bundle "execution", aka
    // when the application "com.example.test210500" will be served / launched at runtime.
    // The Platform will call the initializer "comExampleTest210500Initializer", for example accessing:
    // http://<server>.com:8008/helix/index.html#/com.example.test210500/view/com.example.test210500:TOC
    //
    // The Platform will not call the initializer in design time (Innovation Studio).
    this.rxApplicationRegistryService.register('com.example.test210500', this.comIgslBerlintesInitializer);
  }
}
