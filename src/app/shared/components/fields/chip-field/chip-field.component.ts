import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';

@Component({
  selector: 'app-chip-field',
  standalone: true,
  imports: [ChipModule, ButtonModule],
  templateUrl: './chip-field.component.html',
  styleUrl: './chip-field.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChipFieldComponent extends FieldType<FieldTypeConfig> {}
