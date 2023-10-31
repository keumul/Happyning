import { Injectable } from "@nestjs/common";

@Injectable({})
export class AuthService{
    signup(){
        return 'SIGNUP!'
    }

    signin(){
        return 'SIGNIN!'
    }
}