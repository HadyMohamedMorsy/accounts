import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';
import { IconComponent } from '../icon.component';

@Component({
  selector: 'formly-separator-field',
  template: `
    <h2
      class="flex align-items-center gap-2 mb-3 capitalize text-black text-base font-semibold"
    >
      @if (!props.isIconifyIcon) {
        <i [class]="props.icon + ' ' + props.iconClass"></i>
      } @else {
        <icon [name]="props.icon" [size]="props.iconSize"></icon>
      }
      {{ props.title }}
    </h2>
  `,
  standalone: true,
  imports: [IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeparatorComponent extends FieldType<FieldTypeConfig> {}
