package com.dbcs.practica1.Controller;

import com.dbcs.practica1.Exception.UsuarioException;
import com.dbcs.practica1.Model.Usuario;
import com.dbcs.practica1.Repository.UsuarioRepository;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("users")
@CrossOrigin(origins = "*")
public class Controller {
    private final UsuarioRepository repository;

    public Controller(UsuarioRepository repository) {
        this.repository = repository;
    }

    /**
     * Registra un nuevo usuario al sistema.
     * @param newUser Nuevo usuario que se registra al sistema
     * @return String que confirma el registro
     */
    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public String newUser(@RequestBody Usuario newUser){
        try {
            Usuario usuario = new Usuario();
            usuario.setName(newUser.getName());
            usuario.setFirstName(newUser.getFirstName());
            usuario.setLastName(newUser.getLastName());
            usuario.setEmail(newUser.getEmail());
            usuario.setPassword(newUser.getPassword());
            usuario.setRole(newUser.getRole());
            usuario.setCreatedAt(LocalDate.now());
            usuario.setUpdatedAt(LocalDate.now());
            usuario.setEnabled(true);
            repository.save(usuario);
            return "Nuevo registro de usuario creado";
        } catch (Exception e) {
            throw new UsuarioException("Error al crear el nuevo registro. " + e.toString());
        }
    }

    /**
     * Devuelve una lista de todos los usuarios registrados.
     * @return Lista con los usuarios
     */
    @GetMapping()
    public List<Usuario> getUsers(){
        return repository.findAll();
    }

    /**
     * Devuelve un usuario concreto.
     * @param id Id del usuario
     * @return Usuario con el id introducido
     */
    @GetMapping(value={"/{id}"})
    public Usuario getUserById(@PathVariable int id){
        return repository.findById(id).orElseThrow(() -> new UsuarioException("No existe el usuario especificado"));
    }

    /**
     * Modifica los datos de un usuario concreto.
     * @param id Id del usuario
     * @param newUser Json con los datos nuevos
     * @return String que confirma la modificacion del usuario
     */
    @PutMapping(value={"/{id}"}, consumes = MediaType.APPLICATION_JSON_VALUE)
    public String modificaUser(@PathVariable int id,@RequestBody Usuario newUser){
        try {
            Usuario oldUser = repository.findById(id).orElseThrow(() -> new UsuarioException("El usuario no existe"));
            oldUser.setFirstName(newUser.getFirstName());
            oldUser.setLastName(newUser.getLastName());
            oldUser.setEmail(newUser.getEmail());
            if(newUser.getPassword() != "")
                oldUser.setPassword(newUser.getPassword());
            oldUser.setUpdatedAt(LocalDate.now());
            repository.save(oldUser);

            return "El usuario con id " + id + " se ha modificado";
        } catch (Exception e) {
            throw new UsuarioException("Error al modificar el usuario. " + e.toString());
        }
    }

    /**
     * Elimina un usuario de la base de datos.
     * @param id Id del usuario
     * @return String que confirma que se ha eliminado al usuario
     */
    @DeleteMapping(value={"/{id}"})
    public String deleteUser(@PathVariable int id){
        try {
            repository.deleteById(id);
            return "Usuario con id " + id + " eliminado.";
        } catch (Exception e) {
            throw new UsuarioException("Error al eliminar el usuario. " + e.toString());
        }
    }

    /**
     * Devuelve una lista con los usuarios habilitados|inhabilitados.
     * @param enable true -> habilitados | false -> inhabilitados
     * @return Lista con los usuarios habilitados|inhabilitados 
     */
    @GetMapping("/enabled")//Le he tenido que cambiar el nombre porque el GET/users ya existe
    public List<Usuario> getActivosInactivos(@RequestParam boolean enable){
        try {
            List<Usuario> lista = repository.findByEnabled(enable);
            return lista;
        } catch (Exception e) {
            throw new UsuarioException("Error al obtener usuarios. " + e.toString());
        }
    }

    /**
     * Inhabilita un usuario.
     * @param user_id Id del usuario
     * @return String que confirma que se ha inhabilitado al usuario.
     */
    @PutMapping("/disable")
    public String desactivarUsers(@RequestParam List<Integer> user_id){
        try{
            Usuario user;
            for(int i=0; i<user_id.size(); i++){
                user = repository.findById(user_id.get(i)).orElseThrow(() -> new UsuarioException("No existe el usuario especificado"));
                if(user.isEnabled()){
                    user.setEnabled(false);
                    user.setUpdatedAt(LocalDate.now());
                }
                repository.save(user);
            }
            return "Se han desactivado todos los usuarios correctamente.";
        }catch (Exception e){
            throw new UsuarioException("Error al desactivar los usuarios. " + e.toString());
        }
    }

    /**
     * Habilita un usuario.
     * @param user_id Id del usuario
     * @return String que confirma que se ha habilitado al usuario.
     */
    @PutMapping("/enable")
    public String activarUsers(@RequestParam List<Integer> user_id){
        try{
            Usuario user;
            for(int i=0; i<user_id.size(); i++){
                user = repository.findById(user_id.get(i)).orElseThrow(() -> new UsuarioException("No existe el usuario especificado"));
                if(!user.isEnabled()) {
                    user.setEnabled(true);
                    user.setUpdatedAt(LocalDate.now());
                }
                repository.save(user);
            }
            return "Se han activado todos los usuarios correctamente.";
        }catch (Exception e){
            throw new UsuarioException("Error al activar los usuarios. " + e.toString());
        }
    }

}
