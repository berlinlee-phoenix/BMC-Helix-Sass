import {
  IViewComponentDesignCommonDataDictionaryBranch,
  IViewComponentDesignSandbox, IViewComponentDesignValidationIssue, validateCssClassName, validateCssClassNames,
  ViewDesignerComponentModel
} from '@helix/platform/view/designer';
import { IViewDesignerComponentModel } from '@helix/platform/view/api';
import {
  ExpressionFormControlComponent,
  IExpressionFormControlOptions,
  ITagsFormControlOptions,
  OptionalExpressionControlComponent,
  TagsFormControlComponent,
  TextFormControlComponent
} from '@helix/platform/shared/components';
import { Injector } from '@angular/core';
import { Tooltip } from '@helix/platform/shared/api';
import { IViewComponentDesignSettablePropertiesDataDictionary } from '@helix/platform/view/designer/public-interfaces/view-component-design-settable-properties-data-dictionary.interfaces';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { INewSignatureParameters } from './new-signature.interface';

// View component input parameters.
const initialComponentProperties: INewSignatureParameters = {
  styles: '',
  hidden: '',
  message: ''
};

export class NewSignatureDesignModel extends ViewDesignerComponentModel implements IViewDesignerComponentModel {
  constructor(protected injector: Injector,
              protected sandbox: IViewComponentDesignSandbox) {
    super(injector, sandbox);

    // Setting view component input parameters configuration.
    sandbox.updateInspectorConfig(this.setInspectorConfig(initialComponentProperties));

    // Registering the view component validation based on the input parameter values.
    combineLatest([this.sandbox.componentProperties$])
      .pipe(
        map(([componentProperties]: [INewSignatureParameters]) =>
          this.validate(this.sandbox, componentProperties)
        )
      )
      .subscribe((validationIssues) => {
        this.sandbox.setValidationIssues(validationIssues);
      });


    this.sandbox.getComponentPropertyValue('name').subscribe((name) => {
      const componentName = name ? `${this.sandbox.descriptor.name} (${name})` : this.sandbox.descriptor.name;

      // Registering the properties accessible by button action "set property".
      this.sandbox.setSettablePropertiesDataDictionary(componentName, this.getSettablePropertiesDataDictionaryBranch());
      // Registering the output parameters.
      this.sandbox.setCommonDataDictionary(this.prepareDataDictionary(componentName));
    });
  }

  // Method called automatically that sets the view component input parameters
  // default values or current values.
  static getInitialProperties(initialProperties?: INewSignatureParameters): INewSignatureParameters {
    // The hidden property are string with as values:
    // '0' for false,
    // '1' for true,
    // At runtime the accepted values will be number type (0 or 1).
    return {
      hidden: '0',
      message: '',
      ...initialProperties
    }
  }

  private getSettablePropertiesDataDictionaryBranch(): IViewComponentDesignSettablePropertiesDataDictionary {
    return [
      {
        label: 'Hidden',
        expression: this.getExpressionForProperty('hidden'),
      },
      {
        label: 'Message',
        expression: this.getExpressionForProperty('message')
      }
    ];
  }

  private prepareDataDictionary(componentName: string): IViewComponentDesignCommonDataDictionaryBranch {
    return null;
  }

  private setInspectorConfig(model : INewSignatureParameters) {
    return {
      inspectorSectionConfigs: [
        {
          label: 'General',
          controls: [
            {
              name: 'new-signature',
              component: TextFormControlComponent,
              options: {
                label: 'New Signature with effects',
                tooltip: new Tooltip('Enter a name to uniquely identify the view component.')
              }
            },
            {
              name: 'message',
              component: ExpressionFormControlComponent,
              options: {
                label: 'Message',
                tooltip: new Tooltip('The message input parameter is required and will be displayed at runtime.'),
                dataDictionary$: this.expressionConfigurator.getDataDictionary(),
                operators: this.expressionConfigurator.getOperators(),
                isRequired: true
              } as IExpressionFormControlOptions
            },
            {
              name: 'styles',
              component: TagsFormControlComponent,
              options: {
                label: 'CSS classes',
                placeholder: 'Add CSS classes',
                tooltip: new Tooltip('Enter CSS class names to apply to this view component.'),
                errorCheck: validateCssClassName
              } as ITagsFormControlOptions
            },
            {
              name: 'hidden',
              component: OptionalExpressionControlComponent,
              options: {
                label: 'Hidden',
                dataDictionary$: this.expressionConfigurator.getDataDictionary(),
                operators: this.expressionConfigurator.getOperators(),
              }
            }
          ]
        }
      ]
    };
  }

  private validate(
    sandbox: IViewComponentDesignSandbox,
    model: INewSignatureParameters
  ): IViewComponentDesignValidationIssue[] {
    let validationIssues = [];

    if (!model.message) {
      validationIssues.push(sandbox.createError('Message cannot be blank.', 'message'));
    }

    validationIssues = validationIssues.concat(validateCssClassNames(model.styles));

    return validationIssues;
  }
}
