import { EntityRepository, Repository, getRepository } from 'typeorm'

import Transaction from '../models/Transaction'
import Category from '../models/Category'

interface Balance {
  income: number
  outcome: number
  total: number
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const transactions = await this.find()

    const { income, outcome }= transactions.reduce(
      (acumulator: any, transaction) => {
        switch (transaction.type) {
          case 'income':
            acumulator.income += Number(transaction.value)
            break
          case 'outcome':
            acumulator.outcome += Number(transaction.value)
            break
          default:
            break
        }
        return acumulator
      },
      {
        income: 0,
        outcome: 0,
      }
    )

    const total = income - outcome

    return { income, outcome, total }
  }
  public async getAllTransactions(){
    const transactions = await this.find()
    const categoryRepository = getRepository(Category)
    const allTransactions = [... transactions]

    await allTransactions.map(async transaction => {
      const category = await categoryRepository.findOne({where:{id : transaction.category_id}})
      if(category){
        transaction.category = category
      }
      delete transaction.category_id

      return transaction
    })
   
    return allTransactions
  }
}

export default TransactionsRepository
