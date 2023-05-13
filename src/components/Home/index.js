import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import TransactionItem from '../TransactionItem'
import MoneyDetails from '../MoneyDetails'

import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'WITHDRAW',
    displayText: 'Withdraw',
  },
  {
    optionId: 'TRANSFER',
    displayText: 'Transfer',
  },
]

class Home extends Component {
  state = {
    transactionsList: [],
    titleInput: '',
    amountInput: '',
    optionId: transactionTypeOptions[0].optionId,
  }

  deleteTransaction = id => {
    const {transactionsList} = this.state
    const updatedTransactionList = transactionsList.filter(
      eachTransaction => id !== eachTransaction.id,
    )

    this.setState({
      transactionsList: updatedTransactionList,
    })
  }

  onAddTransaction = event => {
    event.preventDefault()
    const {titleInput, amountInput, optionId} = this.state
    const typeOption = transactionTypeOptions.find(
      eachTransaction => eachTransaction.optionId === optionId,
    )
    const {displayText} = typeOption
    const newTransaction = {
      id: uuidv4(),
      title: titleInput,
      amount: parseInt(amountInput),
      type: displayText,
    }

    this.setState(prevState => ({
      transactionsList: [...prevState.transactionsList, newTransaction],
      titleInput: '',
      amountInput: '',
      optionId: transactionTypeOptions[0].optionId,
    }))
  }

  onChangeOptionId = event => {
    this.setState({optionId: event.target.value})
  }

  onChangeAmountInput = event => {
    this.setState({amountInput: event.target.value})
  }

  onChangeTitleInput = event => {
    this.setState({titleInput: event.target.value})
  }

  getExpenses = () => {
    const {transactionsList} = this.state
    let expensesAmount = 0

    transactionsList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[1].displayText) {
        expensesAmount += eachTransaction.amount
      }
    })

    return expensesAmount
  }

  getIncome = () => {
    const {transactionsList} = this.state
    let incomeAmount = 0
    transactionsList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTransaction.amount
      }
    })

    return incomeAmount
  }

  getBalance = () => {
    const {transactionsList} = this.state
    let balanceAmount = 0
    let incomeAmount = 0
    let expensesAmount = 0

    transactionsList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTransaction.amount
      } else {
        expensesAmount += eachTransaction.amount
      }
    })

    balanceAmount = incomeAmount - expensesAmount

    return balanceAmount
  }

  render() {
    const balanceAmount = this.getBalance()
    const incomeAmount = this.getIncome()
    const expensesAmount = this.getExpenses()

    return (
      <div className="app-container">
        <div className="responsive-container">
          <div className="header-container">
            <h1 className="heading">Hello User</h1>
            <p className="header-content">Welcome To Your Money Bank</p>
          </div>
          <MoneyDetails
            balanceAmount={balanceAmount}
            incomeAmount={incomeAmount}
            expensesAmount={expensesAmount}
          />
          <div className="transaction-details">
            <form className="transaction-form" onSubmit={this.onAddTransaction}>
              <h1 className="transaction-header">Add Transaction</h1>
              <div className="transaction-container">
                <h1>WITHDRAW CASH</h1>

                <input
                  type="text"
                  placeholder="AccountNumber"
                  className="input1"
                />
                <input
                  type="text"
                  placeholder=" Amount To Withdraw"
                  className="input2"
                />
                <button className="btn btn-primary submit-button" type="button">
                  Click To Debt Cash
                </button>
              </div>

              <div className="transaction-container">
                <h1>DEPOSIT CASH</h1>

                <input
                  type="text"
                  placeholder="AccountNumber"
                  className="input1"
                />
                <input
                  type="text"
                  placeholder="Amount To Deposit"
                  className="input2"
                />
                <button className="btn btn-primary submit-button" type="button">
                  Click To Credit Cash
                </button>
              </div>

              <div className="transaction-container">
                <h1>TRANSFER CASH</h1>

                <input
                  type="text"
                  placeholder="Beneficiary AccountNumber"
                  className="input1"
                />
                <input
                  type="text"
                  placeholder="Amount To Transfer"
                  className="input2"
                />
                <button className="btn btn-primary submit-button" type="button">
                  Click To Transfer Cash
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Home
