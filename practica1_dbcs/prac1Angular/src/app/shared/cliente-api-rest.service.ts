import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Usuario } from './app.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ClienteApiRestService {
  private static readonly BASE_URI = 'http://localhost:8080/users';

  /**
   * Inyectamos el servicio rest.
   * @param http servicio rest
   */
  constructor(private http: HttpClient) { }

  /**
   * Devuelve todos los usuarios.
   * @returns todos los usuarios en el sistema
   */
  getAllUsers() {
    console.log('Dentro de getAllUsers');
    let url = ClienteApiRestService.BASE_URI;
    return this.http.get<Usuario[]>(url);
  }

  getAllUsers_ConResponse(): Observable<HttpResponse<Usuario[]>> {
    console.log('Dentro de getAllUsers_ConResponse');
    let url = ClienteApiRestService.BASE_URI;
    return this.http.get<Usuario[]>(url, { observe: 'response' });
  }

  /**
   * Elimina un usuario por id
   * @param id
   * @returns respuesta del servicio Rest
   */
  deleteUser(id: String): Observable<HttpResponse<any>> {
    console.log('Dentro de deleteUser ' + id);
    let url = ClienteApiRestService.BASE_URI + "/" + id;
    return this.http.delete(url, { observe: 'response', responseType: 'text' });
  }

  /**
   * Annade un nuevo usuario al sistema
   * @param usuario
   * @returns respuesta del servicio Rest
   */
  addUser(usuario: Usuario): Observable<HttpResponse<any>> {
    console.log('Dentro de addUser');
    let url = ClienteApiRestService.BASE_URI;
    return this.http.post(url, usuario, {
      observe: 'response',
      responseType: 'text',
    });
  }

  /**
   * Modifica el usuario con el id especificado
   * @param id
   * @param usuario nuevos datos
   * @returns
   */
  modifyUser(id: String, usuario: Usuario): Observable<HttpResponse<any>> {
    console.log('Dentro de modifyUser' + id);
    let url = ClienteApiRestService.BASE_URI + "/" + id;
    return this.http.put(url, usuario, {
      observe: 'response',
      responseType: 'text',
    });
  }

  /**
   * Obtiene un usuario concreto por id
   * @param id
   * @returns
   */
  getUsuario(id: String): Observable<HttpResponse<Usuario>> {
    console.log('Dentro de getUsuario' + id);
    let url = ClienteApiRestService.BASE_URI + "/" + id;
    return this.http.get<Usuario>(url, { observe: 'response' });
  }

  /**
   * Devuelve solo los usuarios activos
   * @returns
   */
  getUsersEnabled(): Observable<HttpResponse<Usuario[]>> {
    console.log('Dentro de getUsersEnabled');
    let url = ClienteApiRestService.BASE_URI + "/enabled?enable=true";
    return this.http.get<Usuario[]>(url, { observe: 'response' });
  }

  /**
   * Devuelve solo los usuarios inactivos
   * @returns
   */
  getUsersDisabled(): Observable<HttpResponse<Usuario[]>> {
    console.log('Dentro de getUsersDisabled');
    let url = ClienteApiRestService.BASE_URI + "/enabled?enable=false";
    return this.http.get<Usuario[]>(url, { observe: 'response' });
  }

  /**
   * Habilita una serie de usuario (lo usaremos para habilitar unicamente uno)
   * @param ids
   * @returns
   */
  enableUsers(ids: String[]): Observable<HttpResponse<any>> {
    console.log('Dentro de enableUsers');
    let url = ClienteApiRestService.BASE_URI + "/enable?user_id=" + ids;
    return this.http.put(url, ids, {
      observe: 'response',
      responseType: 'text',
    });
  }

  /**
   * Deshabilita una serie de usuario (lo usaremos para deshabilitar unicamente uno)
   * @param ids
   * @returns
   */
  disableUsers(ids: String[]): Observable<HttpResponse<any>> {
    console.log('Dentro de disableUsers');
    let url = ClienteApiRestService.BASE_URI + "/disable?user_id=" + ids;
    return this.http.put(url, ids, { observe: 'response', responseType: 'text' });
  }

}
