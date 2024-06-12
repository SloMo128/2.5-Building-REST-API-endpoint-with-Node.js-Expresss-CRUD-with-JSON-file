import { Component } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Product } from '../model/product';
import { Feedback } from '../model/feedback';
import { Router } from '@angular/router';

@Component({
    templateUrl: './product.list.component.html',
})

export class ProductListComponent {

    prodotti: Product[] = [];
    product = new Product(null, "", "", null);
    isLoading: boolean = false;
    feed = new Feedback("", "");
    router: Router;

    constructor(private productService: ApiService) {
        this.loadAllProduct();
    }


    loadAllProduct() {
        this.productService.getProduct().subscribe(data => {
            if (data.length !== 0) {
                this.isLoading = true;
                this.feed = { feedbackType: 'success', feedbackMsg: '' };
                this.prodotti = data;
            }
            else {
                this.isLoading = false;
                this.feed = { feedbackType: 'error', feedbackMsg: 'EMPTY TABLE' };
            }
        })
    }

    deleteProduct(product: number, index: number) {
        if (window.confirm("Sicuro di elimare l'utente")) {
            this.productService.deleteProduct(product).subscribe(data => {
                this.prodotti.splice(index, 1);
                this.feed = { feedbackType: 'success', feedbackMsg: 'PRODOTTO ELIMINATO' };
            })
        }
    }
}