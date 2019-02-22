export interface Account {
  accountId: string
  mask: string
  name: string
  officialName: string
  type: string
  subtype: string
  balances: {
    available: number
    current: number
    isoCurrencyCode: string,
    limit: number,
    unofficialCurrencyCode: string
  }
}