import { Account } from '../account/account';

export interface BankAccount {
  ownerId: string
  institutionId: string
  itemId: string
  accounts: Account[]
}

// export class BankAccount {
//   ownerId: string
//   institutionId: string
//   itemId: string
//   accounts: {

//   }

//   constructor({ ownerId, institutionId, itemId, accounts }: {
//     ownerId?: string,
//     institutionId: string,
//     itemId: string,
//     accounts: Account[]
//   }) {
//     this.ownerId = ownerId
//     this.institutionId = institutionId
//     this.itemId = itemId
//     this.accounts = accounts
//   }
// }