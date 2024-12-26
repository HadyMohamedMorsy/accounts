import { CurrencyPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ProductQtyComponent } from './product-qty/product-qty.component';

@Component({
  selector: 'app-order-dialog',
  standalone: true,
  imports: [
    FormlyModule,
    InputTextModule,
    InputTextareaModule,
    CurrencyPipe,
    ReactiveFormsModule,
    ProductQtyComponent,
    TranslateModule,
    ButtonModule,
  ],
  templateUrl: './order-dialog.component.html',
  styleUrl: './order-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderDialogComponent {
  public dialogRef = inject(DynamicDialogRef);
  public dialogConfig = inject(DynamicDialogConfig);
  public dataConfig = this.dialogConfig.data;
  public destroyRef = inject(DestroyRef); // Current "context" (this component)
  orderForm!: FormGroup;

  orderItems = signal(this.dataConfig);
  email = signal<string>('');
  firstName = signal<string>('');
  lastName = signal<string>('');
  phone = signal<string>('');
  address = signal<string>('');
  floorNumber = signal<number>(0);
  totalOrder = signal<number>(0);

  getOrderItemTotalPrice(item: any): number {
    return item.product.selling_price * item.quantity;
  }

  ngOnInit() {
    // Initialize the reactive form
    this.orderForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      floorNumber: new FormControl('', Validators.required),
    });
  }

  onSubmit() {}
}
