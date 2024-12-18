import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FieldType, FormlyModule } from '@ngx-formly/core';
import { TranslateModule } from '@ngx-translate/core';
import { AccordionModule } from 'primeng/accordion';

@Component({
  selector: 'formly-form-accordion',
  template: `
    <p-accordion
      [multiple]="props.multiple || true"
      [style]="props.style"
      [styleClass]="props.styleClass"
      [expandIcon]="props.expandIcon || 'pi pi-angle-down'"
      [collapseIcon]="props.expandIcon || 'pi pi-angle-up'"
      (onClose)="onClose($event)"
      (onOpen)="onOpen($event)"
    >
      @for (
        tab of field.fieldGroup;
        track $index;
        let i = $index;
        let l = $last
      ) {
        <p-accordionTab
          [header]="tab.props?.header | translate"
          [selected]="tab.props?.selected || false"
          [disabled]="tab.props?.accordionDisabled"
        >
          <formly-field [field]="tab"></formly-field>
        </p-accordionTab>
      }
    </p-accordion>
  `,
  styles: [
    `
      :host ::ng-deep .p-accordion-header-link {
        display: inline-flex;
        color: var(--primary-color) !important;
        font-weight: 500 !important;
        padding: 0 !important;
        border: 0 !important;
        border-radius: 0 !important;
        margin-bottom: 1rem;
        background-color: transparent !important;
      }

      :host ::ng-deep .p-accordion-content {
        padding: 0;
        border: 0;
        border-radius: 0;
        background-color: transparent;
        color: inherit;
      }
    `,
  ],
  standalone: true,
  imports: [
    FormlyModule,
    AccordionModule,
    TranslateModule,
    ReactiveFormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormAccordionComponent extends FieldType {
  onClose(event: any) {
    if (this.props.onClose) this.props.onClose(event);
  }

  onOpen(event: any) {
    if (this.props.onOpen) this.props.onOpen(event);
  }
}
