package com.dbcs.practica2.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dbcs.practica2.Model.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario,Integer> {
    List<Usuario> findByEnabled(boolean enabled);
    Optional<Usuario> findByEmail(String email);
}
