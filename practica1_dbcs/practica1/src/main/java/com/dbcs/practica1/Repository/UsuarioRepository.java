package com.dbcs.practica1.Repository;

import com.dbcs.practica1.Model.Usuario;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario,Integer> {
    List<Usuario> findByEnabled(boolean enabled);
}
