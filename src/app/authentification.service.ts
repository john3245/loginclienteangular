import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable,of} from 'rxjs'
import {map} from 'rxjs/operators'
import {Router} from '@angular/router'
import { Local } from 'protractor/built/driverProviders'
import { JsonPipe } from '@angular/common'
import { request } from 'http'

export interface UserDetails{

    id:number
    Nombre : string
    Apellidos : string
    email : string
    password : string
    exp :number
    iat:number
    uid:number
}


interface TokenResponse{

    token:string 
}

export interface TokenPayLoad
{

    id:number
    Nombre : string 
    Apellidos : string
    email : string
    password : string 
}

@Injectable()

export class AuthenticationService
{
    private token : string 

    constructor(private http: HttpClient,private router : Router){}
    
        private saveToken(token:string):void {

            localStorage.setItem('usertoken',token)
            this.token=token
            
        }

        private getToken():string {
            if(!this.token)
            {this.token=localStorage.getItem('usertoken')}
            return this.token
        }

        public getUserDetails():UserDetails{
            const token =this.getToken()
            let payload 
            if(token){
                payload=token.split('.')[1]
                payload=window.atob(payload)

                return JSON.parse(payload)
            }else {
                return null 
            }
        } 


        public isLoggedIn():boolean{
            const user=this.getUserDetails()

            if(user)
            {
                return true
            }else {
                return false
            }
        }

        public register(user :TokenPayLoad ):Observable<any>{
            return this.http.post('/usuarios/registro',user)
        }

        public login(user: TokenPayLoad): Observable<any>{
            const base = this.http.post('/usuarios/login',user)

            const request=base.pipe(
                map((data:  TokenResponse)=>{
                   if(data.token){
                    this.saveToken(data.token)
                   }

                   return data
                

            })
            )
        return request
   
    }


    public profile(id):Observable<any>{
        return this.http.get('usuarios/mostrar/${id}')
    }

    public logout():void
    
    {
        this.token=''
        window.localStorage.removeItem('usertoken')
        this.router.navigateByUrl('/')
    }
}