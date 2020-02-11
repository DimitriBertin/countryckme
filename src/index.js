import './styles/styles.scss'
import CountryckMe from './countryckme'

const target = document.querySelector('.add-select-widget')
const countryckme = new CountryckMe({
  lang: 'fr',
})

countryckme.widget(target, {
  type: 'simple',
})