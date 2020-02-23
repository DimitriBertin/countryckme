import './styles/styles.scss'
import { cloneDeep } from 'lodash'

const navLang = navigator.language
const defaultOptions = {
  lang: navLang === 'fr-FR' ? 'fr' : 'en',
}
/**
 * Widget Options
 */
const widgetDefaultOptions = {
  type: 'simple', // select, custom, list
  flag: true,
  country: false,
  phone: true,
  searchable: true,
  label: {
    container: '',
    icon: '',
    country: '',
    phone: '',
    // SELECT
    selectName: 'countryckme-phone',
    selectID: 'countryckme-phone',
    selectClass: '',
    selectLabel: 'Je suis un label',
    selectLabelClass: '',
  }
}
export default class CountryckMe {
  constructor(options) {
    this.options = options || {}
    this.options = {
      ...defaultOptions,
      ...this.options,
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

  widget(target, options, iso = null) {
    /**
     * @TODO :
     * ---> PREVENT DEEP COPY
     */

    const widgetOption = cloneDeep({
      ...widgetDefaultOptions,
      ...options,
    })

    this.options = {
      ...this.options,
      widget: widgetOption,
    }
    
    this.options.widget.label = {
      ...widgetDefaultOptions.label,
      ...this.options.widget.label,
    }

    iso = iso || this.options.lang // Choose default lang

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

    target.innerHTML = widget
  }

  /**
   * Create a select widget
   */
  getSelectWidget() {
    const { label, country, phone } = this.options.widget
    const select = `
    ${label.selectLabel && label.selectLabel !== '' ? `<label for="${label.selectID}" class="countryckme__label ${label.selectLabelClass}">${label.selectLabel}</label>`: '' }
    <select name="${label.selectName}" id="${label.selectID}" class="countryckme__select ${label.selectClass}">
      ${this.data.map((item) => {
        return `<option value="${item.phone}">${ country ? item.country : ''}${phone ? item.phone : ''}</option>`
      })}
    </select>`
    return select
  }

  /**
   * Create a custom widget with researchable
   */
  getCustomWidget() {
    const { label, country, phone } = this.options.widget
    
    return `
      <div class="widget countryckme__widget">
        <div class="fake">
          <ul>
          </ul>

          <select name="" id="" class="">
            
          </select>
        </div>
      </div>
    `
  }

  /**
   * 
   * @param {STRING} iso
   * Create a simple widget 
   */ 
  getSimpleWidget(iso) {
    const data = this.data.filter((item) => item.iso.toLowerCase() === iso)
    const item = data[0]
    const { flag, country, phone, label } = this.options.widget

    return `
    <div class="countryckme__widget widget ${label.container}">
      ${ flag ? `<svg width="30" height="30" focusable="false" aria-hidden="true" class="countryckme__icon ${label.icon}" xmlns="http://www.w3.org/2000/svg">
        <use xlink:href="flags.svg#icon-${iso}"></use>
      </svg>` : ''}
      ${ country ? `<span class="countryckme__country ${label.country}">${item.country}</span>` : ''}
      ${ phone ? `<span class="countryckme__phone ${label.phone}">${item.phone}</span>` : '' }
    </div>`
  }
}
