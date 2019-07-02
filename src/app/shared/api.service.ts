import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { UserModel } from '../models/user-model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {FirebaseProvider} from 'angular-firebase';
import { environment } from '../../environments/environment';
@Injectable({
    providedIn: 'root'
})
export class apiService {

    constructor(private http: HttpClient,private fb: FirebaseProvider) {
        
    }

     apiUrl=environment.apiUrl;

    public getAllUsers(): Observable<UserModel[]> {
        return this.http.get(`${this.apiUrl}/users`)
            .pipe(map((response) => {
                let items = [];
                if (items) {
                    items = <any[]>response
                }
                return items.map((item) => new UserModel(item));
            }))

    }

    public addUser(userModel:UserModel){
        let body={
            name:userModel.name,
            password:userModel.password
        }
        return this.http.post(`${this.apiUrl}/newUser`,body)
    }


    public deleteSelectedUser(id:any){
        let body={
           id:id
        }
        return this.http.post(`${this.apiUrl}/deleteUser`,body);
    }

    public updateSelectedUser(id:any,name,password){
        let body={
            id:id,
            name:name,
            password:password
         }
         return this.http.post(`${this.apiUrl}/updateUser`,body);
    }
    public login(){
        this.fb.signinMail('wearedugaonkar@gmail.com','123456').then((value) => {
            console.log(value); //return any validation message like 'the email or password not correct'
          });
          this.fb.signupMail('rk@gmail.com','123456').then((value) => {
            console.log(value); //return any validation message like 'this email not valid'
          });
    }
    
}
