import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {auth, User} from 'firebase';
import { async } from '@angular/core/testing';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isOkay = false;
  constructor(private xauth: AngularFireAuth) {
    this.xauth.authState.subscribe(user =>{
      if(user){
        this.isOkay = true;
      }else{
        this.isOkay = false;
      }
      });
  }

  registro(email,pass){
    return this.xauth.createUserWithEmailAndPassword(email,pass).then(async (user) =>{
      await this.correoVerificacion();
      await this.cerrarSesion();
    });
  }

  correoVerificacion(){
      this.xauth.currentUser.then((verifiedUser:User) =>{
        verifiedUser.sendEmailVerification().then(() =>{
          alert('Verificar correo de verificacion');
        })
      });
    }

  iniciarConEmail(email, pass){
    return this.xauth.signInWithEmailAndPassword(email,pass).then((user:any) =>{
      if(user.user.emailVerified == false){
        alert('Por favor verifique su correo');
        this.cerrarSesion();
      }
      console.log(user);
      alert('Iniciando....');
    }).catch(() =>{
      alert('error');
    })
  }

  GoogleAuth(){
    return this.AutenticarProveedor(new auth.GoogleAuthProvider());
  }

  AutenticarProveedor(proveedor){
    return this.xauth.signInWithPopup(proveedor).then(() =>{
      alert('Estas en la app');
    });
  }

  cerrarSesion(){
    return this.xauth.signOut().then(() =>{
      console.log('Sesion finalizada');
      alert('Sesion finalizada');
    })
  }
}
