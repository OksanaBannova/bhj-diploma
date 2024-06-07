/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element);
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    if (User.current()) {
      let data = {
        mail: User.current().email,
        password: User.current().password,
      };
      Account.list(data, (err, response) => {
        if (response?.success) {
          if (this.element.id == 'new-income-form') {
            let incomeSelect = this.element.querySelector('#income-accounts-list');
            incomeSelect.innerHTML = response.data.reduce((acc, current) => {
              return acc += `<option value="${current.id}">${current.name}</option>`;
            }, '');
          };
          if (this.element.id == 'new-expense-form') {
            let expenseSelect = this.element.querySelector('#expense-accounts-list');
            expenseSelect.innerHTML = response.data.reduce((acc, current) => {
              return acc += `<option value="${current.id}">${current.name}</option>`;
            }, '');
          };
        } else {
          console.log(response.error);
        }
      })
    } 
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    Transaction.create(data, (err, response) => {
      if (response?.success) {
          App.update();
          this.element.reset();
          App.getModal('newIncome').close();
          App.getModal('newExpense').close();
      } else {
        alert(response.error)
      }
    })
  }
}