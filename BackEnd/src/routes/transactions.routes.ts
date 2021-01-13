import { Router } from 'express'
import { getCustomRepository } from 'typeorm'
import multer from 'multer'
import path from 'path'

import CreateTransactionService from '../services/CreateTransactionService'
import DeleteTransactionService from '../services/DeleteTransactionService'
import ImportTransactionsService from '../services/ImportTransactionsService'
import ExportTransactionDB from '../services/ExportTransactionDB'
import TransactionsRepository from '../repositories/TransactionsRepository'

import uploadConfig from '../config/upload'
import ExportTransactionsDBService from '../services/ExportTransactionDB'

const upload = multer(uploadConfig)

const transactionsRouter = Router()

transactionsRouter.post('/', async (request, response) => {
  const { title, value, type, category } = request.body

  const createTransaction = new CreateTransactionService()

  const transaction = await createTransaction.execute({
    title,
    value,
    type,
    category,
  })

  return response.json(transaction)
})

transactionsRouter.get('/', async (request, response) => {
  const transactionsRepository = getCustomRepository(TransactionsRepository)
  const transactions = await transactionsRepository.getAllTransactions()
  const balance = await transactionsRepository.getBalance()

  return response.json({ transactions, balance })
})

transactionsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params
  const deleteTransaction = new DeleteTransactionService()

  const transaction = await deleteTransaction.excute(id)

  return response.json(transaction)
})

transactionsRouter.post(
  '/import',
  upload.single('file'),
  async (request, response) => {
    const importTranasctions = new ImportTransactionsService()
    const transactions = await importTranasctions.execute(request.file.path)
    return response.json(transactions)
  }
)

transactionsRouter.get('/download', async (request, response) => {
  const exportTransactionDB = new ExportTransactionsDBService()
  const csvData = await exportTransactionDB.execute()

  response.setHeader('Content-Type', 'text/csv')
  response.setHeader(
    'Content-Disposition',
    'attachment; filename=transactions.csv'
  )
  response.status(200).end(csvData)
})

export default transactionsRouter
