import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Course } from '../models/course.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor( private http: HttpClient) { }

  get token(): string{
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  createCourse( course: {name: string, schedule: string }) {
    const url = `${base_url}/courses` 
    return this.http.post(url, course, this.headers )
  }
  
  updateCourse( course: Course) {
    const url = `${base_url}/courses/${course._id}`;
    return this.http.put(url, course, this.headers);
  }

  loadCourses() {
    const url = `${base_url}/course`;
    return this.http.get(url, this.headers)
              .pipe(
                // map( ( resp: { ok: boolean, courses: Course[]} ) => resp.courses)
              )
  }

  getCourseById(id: string) {
    const url = `${base_url}/course/${id}`;
    return this.http.get<Course>(url, this.headers)
              .pipe(
                map( (courses: Course) => courses)
              ) 
  }
  
}
