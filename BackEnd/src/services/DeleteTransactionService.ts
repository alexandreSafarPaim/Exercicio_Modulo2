import { getCustomRepository } from 'typeorm'
import TransactionsRepository from '../repositories/TransactionsRepository'
import Transaction from '../models/Transaction';
import {isUuid} from 'uuidv4';

import AppError from '../errors/AppError'



class DeleteTransictionService {
  public async excute(id: string): Promise<Transaction> {
    if(!isUuid(id)){
      throw new AppError('Transaction does not exist')
    }
    const transactionsRepository = getCustomRepository(TransactionsRepository)

    const transaction = await transactionsRepository.findOne(id)

    if (!transaction) {
      throw new AppError('Transaction does not exist')
    }

    await transactionsRepository.remove(transaction)

    return transaction
  }
}

export default DeleteTransictionService
