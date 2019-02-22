import { Injectable } from "@angular/core"
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment'
import merge from 'lodash-es/merge'

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
}

@Injectable({providedIn: 'root'})
export class RequestService {
  constructor(private http: HttpClient) {}

  post(path: string, body = {}, opts = {}) {
    return this.http.post(
      environment.apiUrl + path,
      body,
      merge(httpOptions, opts)
    )
  }
}