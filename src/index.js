import './styles/exemples/styles.scss'
import CountryckMe from './countryckme'

const targetSimple = document.querySelector('.countryckme-simple')
const targetSelect = document.querySelector('.countryckme-select')
const targetCustom = document.querySelector('.countryckme-custom')

const countryckme = new CountryckMe()

/**
 * OPTIONS -----> 
 const widgetDefaultOptions = {
  type: 'simple',
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
*/

/** SIMPLE */
countryckme.widget(targetSimple, {
  type: 'simple',
  country: true,
})

/** Select */
countryckme.widget(targetSelect, {
  type: 'select',
})

/** Custom */
countryckme.widget(targetCustom, {
  type: 'custom',
  country: true,
})