import path from 'path'
import { Parser } from 'json2csv'
import { getCustomRepository } from 'typeorm'

import TransactionsRepository from '../repositories/TransactionsRepository'
import AppError from '../errors/AppError'
import JSON2CSVParser from 'json2csv/JSON2CSVParser'

class ExportTransactionsDBService {
  public async execute(): Promise<string> {
    const transactionsRepository = getCustomRepository(TransactionsRepository)
    const transactions = await transactionsRepository.find()
    if (!transactions) {
      throw new AppError('Database not found', 404)
    }

    let transactionsParse: Object[] = []

    transactions.forEach((transaction) => {
      const {
        id,
        title,
        value,
        type,
        category_id,
        created_at,
        updated_at,
      } = transaction
      transactionsParse.push({
        id,
        title,
        value,
        type,
        category_id,
        created_at,
        updated_at,
      })
    })
    console.log(transactionsParse)

    const csvFields = [
      'id',
      'title',
      'value',
      'type',
      'category_id',
      'created_at',
      'updated_at',
    ]
    const csvParser = new Parser({ fields: csvFields })
    const csvData = csvParser.parse(transactionsParse)

    return csvData
  }
}
export default ExportTransactionsDBService
