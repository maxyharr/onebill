import { Injectable } from '@angular/core';
import { RequestService } from '../request/request.service';

@Injectable({providedIn: 'root'})
export class PlaidService {
  constructor(private requestService: RequestService) {}

  getAccounts({ publicToken }: { publicToken: string }): Promise<any> {
    return this.requestService.post('/accounts', { publicToken }).toPromise()
  }

}