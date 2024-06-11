import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Product } from '../model/product';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {catchError, map} from 'rxjs/operators'

@Injectable()
export class ApiService {

  baseURL: string = "http://localhost:3000";

  constructor(private http: HttpClient) { }

      // Retrieve all product
      getProduct(): Observable<Product[]> {
        console.log('getAllProduct ' + this.baseURL + '/product/list' )
        return this.http.get<Product[]>(this.baseURL + '/product/list').pipe(
            map((res) => {
              const resArray: Product[] = [];
              Object.keys(res).forEach((key) =>
                resArray.push({
                  id: +key,
                  product_name: res[key].product_name,
                  vendor: res[key].vendor,
                  price: +res[key].price
                })
              );
              return resArray;
            }),
            catchError((err) => throwError(err))
          );
          }


  addProduct(product: Product): Observable<Product> {
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(product);
    console.log(body)
    return this.http.post<Product>(this.baseURL + '/product/addproduct', body, { 'headers': headers })
      .pipe(catchError((err) => this.handleError('ADD PRODUCT', err)));
  }

  deleteProduct(id: number): Observable<Product> {
    return this.http.delete<Product>(this.baseURL + '/product/delete/' + id)
      .pipe(catchError((err) => this.handleError('DELETE PRODUCT', err)));
  }

  getProductByID(id: number): Observable<Product> {
    return this.http.get<Product>(this.baseURL + '/product/' + id)
    .pipe(catchError((err) => this.handleError('GET Product By ID', err)));
  }

  putProduct(product: Product): Observable<Product> {
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(product);
    console.log(body)
    return this.http.put<Product>(this.baseURL + '/product/update/' + product.id, body, { 'headers': headers })
      .pipe(catchError((err) => this.handleError('PUT Product', err)));
  }

      // Error handling 
      private handleError(method: string, error: HttpErrorResponse) {
        console.log(`Cannot ${method}`);
        const errObj = {
          err: error,
          type: 'error',
          msg: '',
        };
        switch (error.status) {
          // json-server not running
          case 0:
            errObj.msg = 'Internal server error.';
            break;
          case 401:
            errObj.msg = 'unauthorized';
            break;
          case 403:
            errObj.msg = 'forbidden';
            break;
          case 404:
            errObj.msg = 'not found';
            break;
          case 500:
            errObj.msg = 'Internal server error.';
            break;
          default:
            errObj.msg = 'An error occurred.';
        }
        return throwError(errObj);
      }


}
