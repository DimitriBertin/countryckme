
const defaultOptions = {
  lang: 'fr',
}

const widgetDefaultOptions = {
  type: 'select', // select, customSelect, list
  flag: true,
  label: true,
  searchable: true,
}
// Import 
export default class CountryckMe {
  constructor(options, target) {
    this.options = options || {}
    this.target = target || null
    this.options = {
      ...defaultOptions,
      ...options,
    }
    this.data = require(`./data/${this.options.lang}.json`)
  }

  filter (col, name, type) {
    let filter = ''
    const country = this.data.filter((item) => item[col].toLowerCase() === name.toLowerCase())
    if (country.length > 0) filter = country[0][type]
    return filter
  }

  // GET FLAG ------------
  getFlag(name) {
    return this.filter('country', name, 'flag')
  }

  getFlagByIso(iso) {
    return this.filter('iso', iso, 'flag')
  }

  // -------------------------------
  // GET PHONE ------------
  getPhone(name) {
    return this.filter('country', name, 'phone')
  }

  getPhoneByIso(iso) {
    return this.filter('iso', iso, 'phone')
  }

  // -------------------------------
  // GET ALL JSON DATA BY OPTIONS
  get() {
    return this.data
  }

  widget() {
    /**
     * Add options class like this => label: {
     *  name: '...',
     *  id: '...',
     *  classes: '...',
     * }
     */
    const select = `<select name="" id="" class="">
      ${this.data.map((item) => {
        return `<option value="${item.phone}">${item.country}</option>`
      })}
    </select>`

    this.target.innerHTML = select
  }
}
