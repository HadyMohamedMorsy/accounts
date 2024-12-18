import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule } from '@angular/forms';
import { FieldType, FieldTypeConfig, FormlyModule } from '@ngx-formly/core';
import { format } from 'date-fns';
import { CalendarModule } from 'primeng/calendar';
import { TabMenuModule } from 'primeng/tabmenu';
import { TooltipModule } from 'primeng/tooltip';
import { distinctUntilChanged, tap } from 'rxjs';
@Component({
  selector: 'formly-data-picker-field',
  templateUrl: './date-picker.component.html',
  standalone: true,
  styleUrl: './date-picker.component.scss',
  imports: [
    NgClass,
    TooltipModule,
    FormlyModule,
    CalendarModule,
    TabMenuModule,
    ReactiveFormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatePickerComponent extends FieldType<FieldTypeConfig> {
  #destroyRef = inject(DestroyRef); // Current "context" (this component)

  ngOnInit() {
    if (this.formControl?.value && this.field.model.id) {
      // check if field has a value (if it was edit mode)
      const value = this.formControl.value; // "Oct 25, 2023" or "Oct 25, 2023 | 02:03 PM"
      const dateKey = this.field.key;

      const formatString = this.props.showTime
        ? 'yyyy-MM-dd HH:mm'
        : 'yyyy-MM-dd';

      const formattedDate = format(new Date(value), formatString);
      this.formControl?.setValue(new Date(formattedDate));
      this.field.model[dateKey as string] = formattedDate;
    }

    this.formControl.valueChanges
      .pipe(
        distinctUntilChanged(),
        tap((value) => {
          const dateKey = this.field.key;
          let formattedDate;

          if (Array.isArray(value) && value.length === 2) {
            // Handle the date range array
            const [startDate, endDate] = value;
            const formatString = this.props.showTime
              ? 'yyyy-MM-dd HH:mm'
              : 'yyyy-MM-dd';
            const formattedStartDate = format(
              new Date(startDate),
              formatString,
            );
            const formattedEndDate = format(new Date(endDate), formatString);
            formattedDate = `${formattedStartDate} / ${formattedEndDate}`;
          } else {
            // Handle single date value
            formattedDate = this.props.showTime
              ? format(new Date(value), 'yyyy-MM-dd HH:mm')
              : format(new Date(value), 'yyyy-MM-dd');
          }

          this.field.model[dateKey as string] = formattedDate;
        }),
        takeUntilDestroyed(this.#destroyRef),
      )
      .subscribe();
  }
}
