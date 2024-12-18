import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FieldType, FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'formly-button-field',
  template: `
    <div
      class="p-field"
      [ngClass]="{
        'text-right': props.isButtonRight,
        'text-center': props.isButtonCenter
      }"
    >
      <button
        [type]="props.type ?? 'button'"
        pButton
        pRipple
        [ngClass]="
          props.buttonClass ??
          'p-button-outlined p-button-secondary py-1 px-2 text-sm'
        "
        [icon]="props.buttonIcon"
        [label]="props.label ?? ''"
        [disabled]="props.disabled"
        [loading]="props.loading"
        [pTooltip]="props.tooltip"
        (click)="onClick(field, $event)"
      ></button>
    </div>
  `,
  standalone: true,
  imports: [NgClass, FormlyModule, ButtonModule, TooltipModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonFieldComponent extends FieldType {
  onClick(field?: FormlyFieldConfig, event?: Event) {
    if (this.props.onClick) {
      this.props.onClick(field, event);
    }
  }
}