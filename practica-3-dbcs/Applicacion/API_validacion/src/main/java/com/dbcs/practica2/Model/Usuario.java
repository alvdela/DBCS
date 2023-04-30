package com.dbcs.practica2.Model;

import javax.persistence.*;
import java.time.LocalDate;
import javax.validation.constraints.Size;

@Entity
@Table(name = "Usuario")
public class Usuario {
    @Id
    @GeneratedValue
    @Column(name = "id", nullable = false)
    private int id;
    @Size(max=20)
    @Column(unique=true)
    private String name;
    @Size(max=20)
    private String firstName;
    @Size(max=50)
    private String lastName;
    @Column(name = "email", unique = true)
    private String email;
    private String password;
    private boolean enabled;
    @Enumerated(EnumType.STRING)
    private Rol role;
    private LocalDate createdAt;
    private LocalDate updatedAt;

    public Usuario(String name, String firstName, String lastName, String email,boolean enabled, Rol role, LocalDate createdAt,
    LocalDate updatedAt){
        this.name = name;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.enabled = enabled;
        this.role = role;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public Usuario() {

    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    public Rol getRole() {
        return role;
    }

    public void setRole(Rol role) {
        this.role = role;
    }
    
    public LocalDate getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDate createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDate getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDate updatedAt) {
        this.updatedAt = updatedAt;
    }


}
