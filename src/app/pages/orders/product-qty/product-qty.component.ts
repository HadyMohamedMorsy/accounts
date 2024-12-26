import {
  ChangeDetectionStrategy,
  Component,
  input,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { orderItem } from '@pages/products/products.component';
import { InputNumberModule } from 'primeng/inputnumber';
@Component({
  selector: 'app-product-qty',
  template: `
    <span class="text-xs mr-2">{{ 'Qty' | translate }}:</span>
    <p-inputNumber
      [(ngModel)]="quantity"
      (ngModelChange)="updateOrder($event)"
      [allowEmpty]="false"
      [min]="1"
      [showButtons]="true"
      buttonLayout="horizontal"
      spinnerMode="horizontal"
      incrementButtonIcon="pi pi-plus"
      [decrementButtonClass]="quantity() === 1 ? 'disabled' : ''"
      decrementButtonIcon="pi pi-minus"
    >
    </p-inputNumber>
    <!-- ngModelChange will fire on blur when you change the value manually but,
      it will work normally when you click on the buttons -->
  `,
  standalone: true,
  imports: [InputNumberModule, FormsModule, TranslateModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductQtyComponent {
  product = input<any>({});
  orderItems = input<orderItem[]>([]);
  quantity = signal<number>(0);

  existingItem: orderItem | undefined;

  ngOnInit() {
    this.existingItem = this.orderItems().find(
      (item) => item.product.id === this.product().id,
    );
    this.quantity.set(this.existingItem?.quantity ?? 1);
  }

  updateOrder(quantity: number) {
    this.quantity.set(quantity);
  }
}
