import { Injectable } from '@angular/core';
import { StitchService } from '../stitch/stitch.service';
import { RemoteInsertOneResult } from 'mongodb-stitch-browser-sdk';
import { BankAccount } from 'src/app/models/bank-account/bank-account';
import camelCase from 'lodash-es/camelCase';
import * as mapKeysDeep from 'map-keys-deep-lodash'

@Injectable({providedIn: 'root'})
export class BankAccountsService {

  constructor(
    private stitchService: StitchService,
  ) {}

  addBankAccount({ bankAccount }: { bankAccount: any }): Promise<RemoteInsertOneResult> {
    return new Promise(res => {
      this.stitchService.database().then(database => {
        database.collection('bankAccounts').insertOne({
          ownerId: this.stitchService.currentUser.id,
          bankAccount: mapKeysDeep(bankAccount, (v, k) => camelCase(k))
        }).then(result => res(result))
      })
    })
  }

  getBankAccounts({page, perPage}: { page: number, perPage: number } = { page: 1, perPage: 20 }): Promise<BankAccount[]> {
    return new Promise(resolve => {
      this.stitchService.database().then(database => {
        database.collection('bankAccounts').find({}, {limit: perPage}).toArray().then(results => {
          console.log('results:', results)
          resolve(results.map(r => (<any>r).bankAccount) as BankAccount[])
        })
      })
    })
  }
}

export type BankAccount = any