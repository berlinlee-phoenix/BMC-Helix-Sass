import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RxLocalizationService } from '@helix/platform/shared/api';
import * as defaultApplicationStrings from './i18n/localized-strings.json';
import { NewSignatureRegistrationModule } from './view-components/new-signature/new-signature-registration.module';
import { DigitalSignature2RegistrationModule } from './view-components/digital-signature2/digital-signature2-registration.module';

@NgModule({
  imports: [CommonModule, NewSignatureRegistrationModule, DigitalSignature2RegistrationModule]
})
export class ComIgslBerlintesModule {
  constructor(private rxLocalizationService: RxLocalizationService) {
    this.rxLocalizationService.setDefaultApplicationStrings(defaultApplicationStrings['default']);
  }
}
