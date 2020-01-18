import './styles/styles.scss'

// Import JSON
/**
 * lang => FR / EN
 */
const defaultOptions = {
  lang: 'fr',
}

const widgetDefaultOptions = {
  type: 'select', // select, customSelect, list
  flag: true,
  label: true,
  searchable: true,
}

export class CountryckMe {
  constructor (options) {
    this.options = options
    this.options = {
      ...defaultOptions,
      ...options,
    }
  }

  // Return a json
  getCountry () {

  }

  // return a value
  getPhone () {

  }

  // return a value
  getFlag () {

  }

  // return all
  get () {
    
  }

  // works like a widget
  widget (opt) {
    const options = {
      ...widgetDefaultOptions,
      ...opt,
    }

    //
    return `
    <span>Select</span>
    <label for="" class="">Label</label>
    <select class="" name="" id=""></select>`
  }

  // make searchable
  search (val) {

  }
}


// Widget => Return All phones (with flag / whith country ) // Return All country (whith flag) 
// 

 