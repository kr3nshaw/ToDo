import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToDo } from '../models/todo';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ToDoService {
    private apiUrl = 'http://localhost:5251/api/todo';

    constructor(private http: HttpClient) { }

    getItems(): Observable<ToDo[]> {
        return this.http.get<ToDo[]>(this.apiUrl);
    }

    addItem(toDo: Partial<ToDo>): Observable<ToDo> {
        return this.http.post<ToDo>(this.apiUrl, toDo);
    }

    deleteItem(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
