import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Product } from '../model/product';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Feedback } from '../model/feedback';

@Component({
    templateUrl: './product.edit.component.html',
})

export class ProductEditComponent implements OnInit {

    id: number;
    private sub: Subscription;
    prodotti: Product[];
    product = new Product(null, "", "", null);
    userForm: FormGroup;
    feed = new Feedback("", "");
    isLoading: boolean = false;


    constructor(
        private productService: ApiService,
        private fb: FormBuilder,
        private actRoute: ActivatedRoute,
        private router: Router,

    ) {
        this.userForm = this.fb.group({
            product_name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20), Validators.pattern("^[a-zA-Z]+$")]],
            vendor: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20), Validators.pattern("^[a-zA-Z]+$")]],
            price: ['', [Validators.required, Validators.pattern("^[0-9]+$")]]
        });

    }

    getProductByID(id: number) {
        this.productService.getProductByID(id).subscribe({
            next: (data: Product) => {
                this.userForm.setValue({
                    product_name: data.product_name,
                    vendor: data.vendor,
                    price: data.price
                })
            }
        })
    }

    ngOnInit() {
        this.sub = this.actRoute.params.subscribe(params => {
            this.id = +params['id'];                // (+) converts string 'id' to a number
            this.getProductByID(this.id);
        });
    }


    onSubmit() {
        console.log(this.userForm.value);
        if (window.confirm("Sicuro di modificare il prodotto")) {
            const productUpdated: Product = {
                id: this.id,
                //...this.userForm.value //SERVE PER ESTRARRE VALORI NEL FORM CONTROL
                product_name: this.product_name.value,
                vendor: this.vendor.value,
                price: this.price.value
            }
            this.productService.putProduct(productUpdated).subscribe({
                next: () => {
                    this.router.navigate(['/list']);
                },
                error: (err) => {
                    console.error(err)
                }
            })
        }
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