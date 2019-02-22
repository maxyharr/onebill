import { Component, OnInit } from '@angular/core'
import { BankAccountsService } from '../services/bank-accounts/bank-accounts.service';
import { environment } from 'src/environments/environment';
import flatten from 'lodash-es/flatten'
import reduce from 'lodash-es/reduce'
import { PlaidService } from '../services/plaid/plaid.service';
import { BankAccount } from '../models/bank-account/bank-account';
import { Account } from '../models/account/account'

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
})
export class SchedulePage implements OnInit {
  bankAccounts: BankAccount[] = []

  constructor(
    private bankAccountService: BankAccountsService,
    private plaidService: PlaidService,
  ) { }

  ngOnInit() {
    this._loadBankAccounts()
  }

  get plaidKey(): string {
    return environment.plaidKey
  }

  get total(): number {
    return reduce(this.accounts.map(a => a.balances.current), (sum, current) => {
      return sum + current
    })
  }

  get primaryCurrencyCode(): string {
    const currencyCodes = this.accounts.map(a => a.balances.isoCurrencyCode)
    return currencyCodes.length > 0 ? currencyCodes[0] : 'USD'
  }

  get accountsLinked(): boolean {
    return this.bankAccounts.length > 0
  }

  get accounts(): Account[] {
    return flatten(this.bankAccounts.map(ba => ba.accounts))
  }

  onPlaidSuccess(event) {
    const publicToken = event.token
    this.plaidService.getAccounts({ publicToken }).then(result => {
      const bankAccount = {
        institutionId: result.institution_id,
        itemId: result.item_id,
        accounts: result.accounts
      }
      this.bankAccountService.addBankAccount({ bankAccount: bankAccount }).then(() => {
        this._loadBankAccounts()
      })
    })
  }

  colorForAccountValue(type: string, amount: number): string {
    if (type === 'depository') {
      return amount >= 0 ? 'success' : 'danger'
    } else if (type === 'credit') {
      return amount >= 0 ? 'danger' : 'success'
    }
  }

  onPlaidExit(event) {
    // console.log('exit: ', event)
  }

  onPlaidLoad(event) {
    // console.log('load:', event)
  }

  onPlaidEvent(event) {
    // console.log('event: ', event)
  }

  onPlaidClick(event) {
    // console.log('click: ', event)
  }

  _loadBankAccounts() {
    this.bankAccountService.getBankAccounts().then(bankAccounts => {
      this.bankAccounts = bankAccounts
    })
  }

}
