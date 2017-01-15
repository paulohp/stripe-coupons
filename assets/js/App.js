const dialog = document.querySelector('dialog')
const showDialogButton = document.querySelector('#show-dialog')
const snackbarContainer = document.querySelector('#toast')

let viewModel = {
  coupons: ko.observableArray([]),
  displayLoading: ko.observable(true),
  openModal: () => {
    dialog.showModal()
  },
  closeModal: () => {
    dialog.close()
  },
  save: (data) => {
    const reduceData = $(data).serializeArray().reduce(function(obj, item) {
      if(item.value){
        obj[item.name] = item.value;
      }
      return obj;
    }, {});
    
    fetch(`/coupons`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reduceData)
    })
      .then(res => {
        return res.json()
      })
      .then(data => {
        snackbarContainer.MaterialSnackbar.showSnackbar({ message: `Coupon ${data.coupon.id} successfully created!` })
        window.location = '/'
      })
  },
  delete: (data) => {
    fetch(`/coupons/${data.id}`, {
      method: 'DELETE'
    })
      .then((response) => {
        return response.json()
      })
      .then((response) => {
        const newCoupons = viewModel.coupons().filter(item => item.id !== data.id)
        viewModel.coupons(newCoupons)
        snackbarContainer.MaterialSnackbar.showSnackbar({ message: response.message })
      })
      .catch(err => {
        snackbarContainer.MaterialSnackbar.showSnackbar({ message: err })
      })
  }
}

let init = () => {
  fetch('/coupons')
    .then(response => {
      return response.json()
    })
    .then(data => {
      viewModel.coupons(data.coupons)
      viewModel.displayLoading(false)
    })
}

ko.bindingHandlers.fadeVisible = {
  init: (element, valueAccessor) => {
    let value = valueAccessor()
    $(element).toggle(ko.unwrap(value))
  },
  update: (element, valueAccessor) => {
    let value = valueAccessor()
    ko.unwrap(value) ? $(element).fadeIn() : $(element).fadeOut()
  }
}

ko.applyBindings(viewModel)

init()