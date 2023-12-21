import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RxLocalizationService } from '@helix/platform/shared/api';
import * as defaultApplicationStrings from './i18n/localized-strings.json';
import { NewSignatureRegistrationModule } from './view-components/new-signature/new-signature-registration.module';

@NgModule({
  imports: [CommonModule, NewSignatureRegistrationModule]
})
export class ComIgslBerlintesModule {
  constructor(private rxLocalizationService: RxLocalizationService) {
    this.rxLocalizationService.setDefaultApplicationStrings(defaultApplicationStrings['default']);
  }
}
