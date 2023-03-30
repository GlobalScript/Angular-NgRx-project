import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Product } from '../../models/product';
import { ImageTypes } from 'src/app/shared/enums/image-types';
import { ProductCategories } from 'src/app/shared/enums/product-categories';
import { CreatedProduct } from '../../models/created-product';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/store/reducers/app.reducer';
import { createProdAction, updateProdAction } from 'src/app/store/actions/product.action';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  @Input() prod!: Product | null;
  @Input() btnTitle!: string;

  form!: FormGroup;
  imageSrc!: string | undefined;
  imageError: boolean = true;
  disabSend: boolean = true;
  categories = ProductCategories;

  constructor(
    private store: Store<IAppState>,
    public location: Location
  ) { }

  ngOnInit(): void {
    this.imageSrc = this.prod?.image;
    this.disabSend = this.prod?.image ? false : true;

    this.form = new FormGroup({
      "title": new FormControl(this.prod?.title,
        [
          Validators.required,
          Validators.maxLength(50)
        ]),
      'price': new FormControl(this.prod?.price,
        [
          Validators.required,
          Validators.min(1)
        ]),
      'discount': new FormControl(this.prod?.discount,
        [
          Validators.required,
          Validators.min(1),
          Validators.max(100)
        ]),
      'description': new FormControl(this.prod?.description,
        [
          Validators.required,
        ]),
      'category': new FormControl(this.prod?.category,
        [
          Validators.required,
        ])
    });
  }

  get title() { return this.form.get('title') }
  get price() { return this.form.get('price') }
  get discount() { return this.form.get('discount') }
  get category() { return this.form.get('category') }
  get description() { return this.form.get('description') }

  selectImage(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    const file: File | null = files.item(0);
    if (!file) return;
    if (file.size < 50000 && (file.type === ImageTypes.jpg || file.type === ImageTypes.png || file.type === ImageTypes.webp)) {
      const reader: FileReader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageError = true;
        this.disabSend = false;
        this.imageSrc = reader.result as string;
      }
      return;
    }
    this.imageError = false;
    this.disabSend = true;
  }

  formSubmit() {
    const prodData: CreatedProduct = { ...this.form.value, image: this.imageSrc };
    if (this.prod?.id) {
      this.store.dispatch(updateProdAction({ id: this.prod.id, prod: prodData }));
      this.form.disable();
    }
    else {
      this.store.dispatch(createProdAction({ prod: prodData }));
      this.imageSrc = '';
      this.disabSend = true;
      this.form.reset();
    }
  }
}
