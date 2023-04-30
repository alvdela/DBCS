package com.dbcs.practica2.Controller;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import java.security.Key;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;

import javax.crypto.spec.SecretKeySpec;

import javax.ws.rs.core.MediaType;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import com.dbcs.practica2.Exception.LoginException;
import com.dbcs.practica2.Model.Rol;
import com.dbcs.practica2.Model.Usuario;

@RestController
@CrossOrigin(origins = "*")
public class JwtController {
    private final String salt;
    public JwtController() {
        salt = "35454B055CC325EA1AF2126E27707052";
    }

    /**
     * Verifica la contraseña de usuario y devuelve un token jwt si es correcta.
     * @param login
     * @return token jwt
     */
    @PostMapping(value = "/login", consumes = MediaType.APPLICATION_JSON)
    public String login(@RequestBody Usuario login) {
        try {
            String email = login.getEmail();
            String password = login.getPassword();
            if(email != null && password != null){
                String uri = "http://localhost:8080/users/email?email=" + email;
                RestTemplate apiClientes = new RestTemplate();
                Usuario user = apiClientes.getForObject(uri, Usuario.class);
                if (user != null && user.getPassword().equals(getSecurePassword(password,salt)))
                    return generateToken(user);
            }
            throw new LoginException("Usuario o contraseña incorrecta");
        } catch (Exception e) {
            return "" +e;
            //throw e;
        }
    }

    /**
     * Genera el jwt de usuario.
     * @param user
     * @return token jwt
     */
    private String generateToken(Usuario user) {
        try {
           String secret = "asdfSFS34wfsdfsdfSDSD32dfsddDDerQSNCK34SOWEK5354fdgdf4";
           Key hmacKey = new SecretKeySpec(Base64.getDecoder().decode(secret), SignatureAlgorithm.HS256.getJcaName());
            // CREAR EL TOKEN
            String  tokenJWT = Jwts.builder()
                    .claim("name", user.getName())
                    .claim("email", user.getEmail())
                    .claim("rol", user.getRole().toString())
                    .signWith(hmacKey)
                    .compact();

            return tokenJWT;
        } catch (Exception e) {
            return "Error al crear el token" + e;
        }
    }
    
    /**
     * Descodifica el jwt a json
     * @param jwtString
     * @return
     */
    @PostMapping(value = "/getUser")
    public Usuario parseJwt(@RequestBody String jwtString) {
        String secret = "asdfSFS34wfsdfsdfSDSD32dfsddDDerQSNCK34SOWEK5354fdgdf4";
        Key hmacKey = new SecretKeySpec(Base64.getDecoder().decode(secret), 
                                        SignatureAlgorithm.HS256.getJcaName());
    
        Jws<Claims> jwt = Jwts.parserBuilder()
                .setSigningKey(hmacKey)
                .build()
                .parseClaimsJws(jwtString);
        
        Usuario user = new Usuario();
        user.setName(jwt.getBody().get("name", String.class));
        user.setEmail(jwt.getBody().get("email", String.class));
        user.setRole(Rol.valueOf(jwt.getBody().get("rol", String.class)));
        return user;
    }

    //MD5 with Salt
    private static String getSecurePassword(String passwordToHash,
                                            String salt) {
        String generatedPassword = null;
        try {
            // Create MessageDigest instance for MD5
            MessageDigest md = MessageDigest.getInstance("MD5");

            // Add password bytes to digest
            md.update(salt.getBytes());

            // Get the hash's bytes
            byte[] bytes = md.digest(passwordToHash.getBytes());

            // This bytes[] has bytes in decimal format;
            // Convert it to hexadecimal format
            StringBuilder sb = new StringBuilder();

            for (int i = 0; i < bytes.length; i++) {
                sb.append(Integer.toString((bytes[i] & 0xff) + 0x100, 16)
                        .substring(1));
            }

            // Get complete hashed password in hex format
            generatedPassword = sb.toString();
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        return generatedPassword;
    }
}
