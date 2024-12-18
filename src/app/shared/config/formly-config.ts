import { AbstractControl } from '@angular/forms';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { TranslateService } from '@ngx-translate/core';
import {
  AutocompleteComponent,
  BooleanComponent,
  ButtonFieldComponent,
  ColorComponent,
  DatePickerComponent,
  EditorComponent,
  FileFieldComponent,
  FloatedInputComponent,
  FormAccordionComponent,
  InputGroupComponent,
  InputMaskComponent,
  InputNumberComponent,
  MapComponent,
  PasswordComponent,
  RadioComponent,
  RatingComponent,
  RepeatArrayTypeComponent,
  RepeatTypeComponent,
  SelectComponent,
  SeparatorComponent,
  SwitchComponent,
  TabsFormComponent,
  TextareaComponent,
  TreeComponent,
} from '../components';
import { ChipFieldComponent } from '../components/fields/chip-field/chip-field.component';
import { FiedFileSortComponent } from '../components/fields/fied-file-sort/fied-file-sort.component';
import { FormStepsComponent } from '../components/fields/form-step/form-steps.component';
import { constants } from './constants';
import { FormlyTranslateExtension } from './translate.extension';

export function EmailValidator(control: AbstractControl) {
  if (!control.value) return;
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(control.value)
    ? null
    : { email: true };
}

export function MobileValidator(control: AbstractControl) {
  if (!control.value) return;
  return /^(\+201|01|00201)[0-2,5]{1}[0-9]{8}/.test(control.value)
    ? null
    : { mobile: true };
}

export function fieldMatchValidator(control: AbstractControl) {
  const { password, password_confirmation } = control.value;
  return password_confirmation === password ? null : { fieldMatch: true };
}

export function onlyNumbersValidator(control: AbstractControl) {
  const isValid = /^\d+$/.test(control.value);
  return isValid ? null : { onlyNumbers: true };
}

export function urlValidator(control: AbstractControl) {
  const isValidUrl = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(
    control.value,
  );
  return isValidUrl ? null : { invalidUrl: true };
}

export function timeBetweenValidator(control: AbstractControl): boolean {
  return control.value > control.parent?.get('start_date')?.value;
}

export function customFormlyConfig(translate: TranslateService) {
  return {
    validators: [
      { name: 'email', validation: EmailValidator },
      { name: 'startDate', validation: timeBetweenValidator },
      { name: 'mobile', validation: MobileValidator },
      { name: 'phone', validation: MobileValidator },
      { name: 'onlyNumbers', validation: onlyNumbersValidator },
      { name: 'invalidUrl', validation: urlValidator },
      { name: 'fieldMatch', validation: fieldMatchValidator },
    ],
    validationMessages: [
      {
        name: 'required',
        message(error: any, field: FormlyFieldConfig) {
          return translate.stream(_('this field is required'));
        },
      },
      {
        name: 'minLength',
        message() {
          return translate.stream(_('GLOBAL.FORM_VALIDATION.MIN_LENGTH'), {
            minLength: constants.MIN_LENGTH_TEXT_INPUT,
          });
        },
      },
      {
        name: 'maxLength',
        message() {
          return translate.stream(_('GLOBAL.FORM_VALIDATION.MAX_LENGTH'), {
            maxLength: constants.MAX_LENGTH_TEXT_INPUT,
          });
        },
      },
      {
        name: 'startDate',
        message(error: any, field: FormlyFieldConfig) {
          return translate.stream(
            _('The start date should be more than the end date'),
          );
        },
      },
      {
        name: 'email',
        message() {
          return translate.stream(_('GLOBAL.FORM_VALIDATION.VALID_EMAIL'));
        },
      },
      {
        name: 'mobile',
        message() {
          return translate.stream(_('GLOBAL.FORM_VALIDATION.VALID_MOBILE'));
        },
      },
      {
        name: 'phone',
        message() {
          return translate.stream(_('GLOBAL.FORM_VALIDATION.VALID_MOBILE'));
        },
      },
      {
        name: 'onlyNumbers',
        message() {
          return translate.stream(_('GLOBAL.FORM_VALIDATION.VALID_NUMBER'));
        },
      },
      {
        name: 'min',
        message: (error: any, field: FormlyFieldConfig) => {
          return translate.stream(_('GLOBAL.FORM_VALIDATION.MIN'), {
            min: field.props?.fieldValidate,
          });
        },
      },
      {
        name: 'max',
        message: (error: any, field: FormlyFieldConfig) => {
          return translate.stream(_('GLOBAL.FORM_VALIDATION.MAX'), {
            max: field.props?.max,
          });
        },
      },
      {
        name: 'invalidUrl',
        message() {
          return translate.stream(_('GLOBAL.FORM_VALIDATION.invalid_url'));
        },
      },
      {
        name: 'fieldMatch',
        message() {
          return translate.stream(
            _('GLOBAL.FORM_VALIDATION.COMPARE_PASSWORD_ERROR'),
          );
        },
      },
    ],
    presets: [],
    extensions: [
      {
        name: 'translate-extension',
        extension: new FormlyTranslateExtension(translate),
        priority: 3,
      },
    ],
    types: [
      { name: 'separator-field', component: SeparatorComponent },
      { name: 'select-field', component: SelectComponent },
      { name: 'floated-input-field', component: FloatedInputComponent },
      { name: 'textarea-field', component: TextareaComponent },
      { name: 'tree-field', component: TreeComponent },
      { name: 'button-field', component: ButtonFieldComponent },
      { name: 'switch-field', component: SwitchComponent },
      { name: 'boolean-field', component: BooleanComponent },
      { name: 'chip-field', component: ChipFieldComponent },
      { name: 'radio-field', component: RadioComponent },
      { name: 'rating-field', component: RatingComponent },
      { name: 'map-field', component: MapComponent },
      { name: 'mask-field', component: InputMaskComponent },
      { name: 'number-field', component: InputNumberComponent },
      { name: 'repeat-field', component: RepeatTypeComponent },
      { name: 'repeat-array-field', component: RepeatArrayTypeComponent },
      { name: 'tabs-field', component: TabsFormComponent },
      { name: 'password-field', component: PasswordComponent },
      { name: 'editor-field', component: EditorComponent },
      { name: 'steps-field', component: FormStepsComponent },
      { name: 'autocomplete-field', component: AutocompleteComponent },
      {
        name: 'file-field',
        component: FileFieldComponent,
        wrappers: ['form-field'],
      },
      {
        name: 'files-field-sort',
        component: FiedFileSortComponent,
        wrappers: ['form-field'],
      },
      { name: 'input-group-field', component: InputGroupComponent },
      { name: 'accordion-field', component: FormAccordionComponent },
      { name: 'color-field', component: ColorComponent },
      { name: 'date-field', component: DatePickerComponent },
    ],
  };
}
