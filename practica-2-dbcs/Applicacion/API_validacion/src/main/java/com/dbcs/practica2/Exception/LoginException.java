package com.dbcs.practica2.Exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.FORBIDDEN)
public class LoginException extends RuntimeException{
    public LoginException(String mensaje){
        super(mensaje);
    }
}
