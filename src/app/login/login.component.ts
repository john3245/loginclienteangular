import {Component, OnInit} from '@angular/core'
import {AuthenticationService, TokenPayLoad} from '../authentification.service'
import {Router} from '@angular/router'
import { Token } from '@angular/compiler/src/ml_parser/lexer'
import {trigger,state,style,animate,keyframes,transition} from '@angular/animations'



@Component({
    templateUrl:'./login.component.html',
    animations : [
        trigger('botonanimado',[
            state('inactive',style({
                backgroundColor:'#2E4053',
                transform:'scale(1)'
            })),
            state('active',style({
                backgroundColor:'#ff0000',
                transform:'scale(2)'
            })),
            transition('inactive => active',animate('100ms ease-in')),
            transition('active => inactive',animate('100ms ease-out'))
        ])
    ]
})


export class LoginComponent implements OnInit {

    public state:string='inactive'

    credentials: TokenPayLoad={
        id:0,
        Nombre : '',
        Apellidos:'',
        email : '',
        password : '',
    }

   
   

    constructor (private auth: AuthenticationService,private router : Router){}

    ngOnInit(){
        
    }
    

    login()
    {
        this.auth.login(this.credentials).subscribe(
            ()=>{
                this.router.navigateByUrl('/profile')
            },
            err =>{console.error(err)}
        )
    }

    togleBoton()
    {
      this.state=this.state==='active'? 'inactive' : 'active';
    }



}