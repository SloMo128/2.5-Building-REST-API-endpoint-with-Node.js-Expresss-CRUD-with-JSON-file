import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Product } from '../model/product';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Feedback } from '../model/feedback';

@Component({
  templateUrl: './product.create.component.html',
})

export class ProductCreateComponent implements OnInit {

  id: number;
  private sub: Subscription;
  prootti: Product[];
  product=  new Product ( null, "", "", null );
  userForm: FormGroup;
  feed = new Feedback("","");
  isLoading: boolean = false;

  constructor(
    private productService: ApiService,
    private fb: FormBuilder,
    private router: Router,

  ) {
    this.userForm = this.fb.group({
      product_name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20), Validators.pattern("^[a-zA-Z]+$")]],
      vendor: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20), Validators.pattern("^[a-zA-Z]+$")]],
      price: ['', [Validators.required, Validators.pattern("^[0-9]+$")]]
    });    
  }

  loadProduct() {
    this.productService.getProduct().subscribe({
      next: (data: Product[]) => {
        this.prootti = data;
      },
      error: (err: any) => {
        console.log(err);
        this.feed = {
          feedbackType: err.type,
          feedbackMsg: err.msg,
        };
      },
      complete: () => {
        this.isLoading = true;
        this.feed = { feedbackType: 'success', feedbackMsg: 'loaded' };
      },
    });
  }


  ngOnInit() {
    this.feed = { feedbackType: "", feedbackMsg: "" };
  }

  onSubmit() {
    console.log(this.userForm.value);

    const productCreate: Product={
      id: null,
      //...this.userForm.value //SERVE PER ESTRARRE VALORI NEL FORM CONTROL
      product_name: this.product_name.value,
      vendor: this.vendor.value,
      price: this.price.value
    }

    this.productService.addProduct(productCreate).subscribe({
      next:(data) =>{
        this.router.navigate(['/list']);
      },
      error:(err)=>{
        console.error(err)
      }
    })
    
    this.loadProduct();
  }

  get product_name() {
    return this.userForm.get('product_name');
  }

  get vendor() {
    return this.userForm.get('vendor');
  }

  get price() {
    return this.userForm.get('price');
  }
}