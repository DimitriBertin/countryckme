const defaultOptions = {
  lang: 'fr',
}

const widgetDefaultOptions = {
  type: 'simple', // select, customSelect, list
  flag: true,
  searchable: true,
  
}
// Import 
export default class CountryckMe {
  constructor(options) {
    this.options = options || {}
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

  getIso(country) {
    return this.filter('country', country, 'iso')
  }

  // -------------------------------
  // GET ALL JSON DATA BY OPTIONS
  get() {
    return this.data
  }

  widget(target, widgetOption, iso = null) {
    /**
     * Add options class like this => label: {
     *  name: '...',
     *  id: '...',
     *  classes: '...',
     * }
     */
    this.options = {
      ...this.options,
      widget: {
        ...widgetDefaultOptions,
        ...widgetOption,
      }
    }
    iso = iso || this.options.lang // Choose default lang
    // Widget -> 
    /**
     * select
     * simple
     * custom
     */
    let widget = null
    switch (this.options.widget.type) {
      case 'select':
        widget = this.getSelectWidget()
        break;
      case 'custom':
        widget = this.getCustomWidget()
        break;
    
      default:
        widget = this.getSimpleWidget(iso)
        break;
    }

    // const select = `<select name="${label.select.name}" id="${label.select.id}" class="${label.select.class}">
    //   ${this.data.map((item) => {
    //     return `<option value="${item.phone}">${item.country}</option>`
    //   })}
    // </select>`

    target.innerHTML = widget
  }

  // WIDGET -----
  getSelectWidget() {
    const { label } = this.options.widget
    const select = `<select name="${label.select.name}" id="${label.select.id}" class="${label.select.class}">
      ${this.data.map((item) => {
        return `<option value="${item.phone}">${item.country} ${item.phone}</option>`
      })}
    </select>`
    return select
  }

  getCustomWidget() {
    return 'Custom'
  }

  getSimpleWidget(iso) {
    const data = this.data.filter((item) => item.iso.toLowerCase() === iso)
    const item = data[0]
    return `
    <div class="countryckme__widget">
      <svg width="30" height="30" focusable="false" aria-hidden="true" class="iccon" xmlns="http://www.w3.org/2000/svg">
        <use xlink:href="flags.svg#icon-${iso}"></use>
      </svg>
      <span class="name">${item.country}</span>
      <span class="phone">${item.phone}</span>
    </div>`
  }
}
