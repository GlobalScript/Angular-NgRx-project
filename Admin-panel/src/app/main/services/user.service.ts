import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/auth/models/authUser';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(environment.API_URL + '/api/users')
  }

  updateRole(data: User): Observable<User> {
    return this.http.put<User>(environment.API_URL + '/api/user-role', data)
  }

  removeUser(id: string): Observable<any> {
    return this.http.delete(environment.API_URL + `/api/user-remove/${id}`)
  }
}
