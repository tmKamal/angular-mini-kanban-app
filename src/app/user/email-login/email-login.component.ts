import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-email-login',
  templateUrl: './email-login.component.html',
  styleUrls: ['./email-login.component.scss']
})
export class EmailLoginComponent implements OnInit {
  form:FormGroup;
  type:'login'|'signup'|'reset'='signup';
  serverMsg:string;
  loading=false;


  constructor(private fb:FormBuilder,private afAuth:AngularFireAuth) { }

  ngOnInit(): void {
    this.form=this.fb.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.minLength(6),Validators.required]],
      passwordConfirm:['',[]],
    });
  }

  changeType(type){
    this.type=type
  }

  get isLogin(){
    return this.type==='login';
  }

  get isSignup(){
    return this.type==='signup';
  }

  get isReset(){
    return this.type==='reset';
  }

  // below are just to get rid of the verbose in the html template
  get email(){
    return this.form.get('email');
  }

  get password(){
    return this.form.get('password');
  }

  get passwordConfirm(){
    return this.form.get('passwordConfirm');
  }

  get passwordDoesMatch(){
    if(this.type!=='signup'){
      return true;
    }else{
      return this.password.value===this.passwordConfirm.value
    }
  }

  async onSubmit(){
    console.log('lets validate');

    const email=this.email.value;
    const password=this.password.value;


    this.loading=true;
    try {
      if(this.isLogin){
        await this.afAuth.signInWithEmailAndPassword(email,password);
      }else if(this.isSignup){
        await this.afAuth.createUserWithEmailAndPassword(email,password);
      }else if(this.isReset){
        await this.afAuth.sendPasswordResetEmail(email);
        this.serverMsg='check your inbox, we have sent you the reset link'
      }
    } catch (err) {
      console.log('why??');
      console.log('err is :'+err);
      this.serverMsg=err;
    }
    this.loading=false;
    
  }

}
