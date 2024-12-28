import { CurrencyPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { FormlyModule } from '@ngx-formly/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CustomerDialogComponent } from '@pages/customers/customer-dialog.component';
import { orderItem } from '@pages/products/products.component';
import { AlertService, ApiService, LangService } from '@shared';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RadioButtonClickEvent, RadioButtonModule } from 'primeng/radiobutton';
import { StepsModule } from 'primeng/steps';
import { map } from 'rxjs';
import { ProductQtyComponent } from './product-qty/product-qty.component';
import { orderModel } from './services/service-type';

@Component({
  selector: 'app-order-dialog',
  standalone: true,
  imports: [
    FormlyModule,
    InputTextModule,
    InputTextareaModule,
    StepsModule,
    CurrencyPipe,
    ReactiveFormsModule,
    RadioButtonModule,
    AutoCompleteModule,
    ProductQtyComponent,
    TranslateModule,
    ButtonModule,
  ],
  templateUrl: './order-dialog.component.html',
  styleUrl: './order-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderDialogComponent {
  #translate = inject(TranslateService);
  #fb = inject(FormBuilder);

  public dialogConfig = inject(DynamicDialogConfig);
  public api = inject(ApiService);
  public dataConfig = this.dialogConfig.data;
  public destroyRef = inject(DestroyRef);
  public dialogRef = inject(DynamicDialogRef);
  public alertService = inject(AlertService);
  public dialogCustomerRef: DynamicDialogRef | undefined;
  public dialogService = inject(DialogService);
  public langService = inject(LangService);

  isLoading = signal(false);
  activeIndex = signal(0);
  orderItems = signal<orderItem[]>(this.dataConfig);
  suggestionsCustomer = signal<{ label: string; value: number }[]>([]);
  suggestProducts = signal<{ label: string; value: number }[]>([]);

  isNewCustomer = signal(false);

  // info user
  email = signal('');
  fullName = signal('');
  phone = signal('');
  floorNumber = signal('');
  address = signal('');

  steps = signal([
    {
      label: this.#translate.instant(_('New Customer')),
    },
    {
      label: this.#translate.instant(_('Products')),
    },
    {
      label: this.#translate.instant(_('Summary Order')),
    },
  ]);

  listRadio = signal([
    { name: this.#translate.instant(_('Old Customer')), key: 'old' },
    { name: this.#translate.instant(_('New Customer')), key: 'new' },
  ]);

  totalOrder = computed(() =>
    this.orderItems().reduce(
      (total: number, item: orderItem) =>
        total + this.getOrderItemTotalPrice(item),
      0,
    ),
  );

  orderForm!: FormGroup;

  getOrderItemTotalPrice(item: any): number {
    return item.product.selling_price * item.quantity;
  }

  ngOnInit() {
    // Initialize the reactive form
    this.orderForm = this.#fb.group({
      customer: [''],
      customer_id: ['', [Validators.required]],
      products: [[]],
      selected_type_customer: ['old'],
    });

    this.orderForm.setControl('order_items', this.#fb.array(this.orderItems()));
  }

  isStepValid(): boolean {
    const validationMap = ['customer_id'];
    return !validationMap.every((field) => this.orderForm.get(field)?.valid);
  }

  searchProduct(event: any) {
    this.api
      .request('post', 'search', {
        module: 'products',
        query: event.query,
      })
      .pipe(
        map(({ data }) => data),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(({ data }) => {
        this.suggestProducts.set(data);
      });
  }

  searchCustomer(event: any) {
    this.api
      .request('post', 'search', {
        module: 'customers',
        query: event.query,
      })
      .pipe(
        map(({ data }) => data),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(({ data }) => {
        this.suggestionsCustomer.set(data);
      });
  }

  selectCustomer(event: any) {
    this.orderForm.get('customer')?.setValue({
      label: event.value.fullName,
      value: event.value.id,
    });
    this.orderForm.get('customer_id')?.setValue(event.value.id);
    this.email.set(event.value.email);
    this.fullName.set(event.value.fullName);
    this.phone.set(event.value.phone);
    this.floorNumber.set(event.value.floorNumber);
    this.address.set(event.value.address);
  }

  newCustomer() {
    this.dialogCustomerRef = this.dialogService.open(CustomerDialogComponent, {
      showHeader: false,
      width: '800px',
      height: '100%',
      modal: true,
      focusOnShow: false,
      styleClass: 'm-0 max-h-full transform-none',
      position: this.langService.currentLanguage() === 'en' ? 'right' : 'left',
      rtl: this.langService.currentLanguage() !== 'en',
      closable: true,
      closeOnEscape: true,
      dismissableMask: false,
    });

    this.dialogCustomerRef.onClose
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((record) => {
        if (!record) return;
        this.orderForm.get('customer_id')?.setValue(record.id);
        this.orderForm.get('customer')?.setValue({
          label: record.fullName,
          value: record.id,
        });
        this.email.set(record.email);
        this.fullName.set(record.fullName);
        this.phone.set(record.phone);
        this.floorNumber.set(record.floorNumber);
        this.address.set(record.address);
      });
  }

  selectProduct(item: any) {
    const product = item.value;
    this.orderItems.update((products) => {
      const existingProductIndex = products.findIndex(
        (item) => item.product.id === product.id,
      );

      if (existingProductIndex >= 0) {
        this.message('This Product Is Selected Before', 'warn');
        return products;
      } else {
        return [{ product, quantity: 1 }, ...products];
      }
    });
    const productsSelected = this.getControl('products');
    productsSelected?.setValue([]);
  }

  removeProduct(product: any) {
    return this.orderItems.update((products) => {
      return products.filter((item) => item.product.id !== product.value.id);
    });
  }

  updateQty(quantity: number, product: orderItem) {
    this.orderItems.update((orderItems) => {
      return orderItems.map((item) => {
        if (item.product.id === product.product.id) {
          return {
            ...item,
            quantity,
          };
        }
        return item;
      });
    });
  }

  getControl(key: string) {
    return this.orderForm.get(key);
  }

  changeRadio(event: RadioButtonClickEvent) {
    this.isNewCustomer.set(event.value == 'new');
    if (!this.isNewCustomer()) this.getControl('customer')?.enable();
    else this.getControl('customer')?.disable();
  }

  message(message: string, status = 'success') {
    this.alertService.setMessage({
      severity: status,
      detail: this.#translate.instant(_(message)),
    });
  }

  onSubmit() {
    if (this.orderForm.invalid) return;
    this.isLoading.set(true);
    const order: orderModel = this.orderForm.value;

    this.api
      .request('post', 'orders/store', order)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.closeDialog({
          is_created: true,
        });
      });
  }

  closeDialog(data?: any) {
    this.dialogRef.close(data);
  }
}
