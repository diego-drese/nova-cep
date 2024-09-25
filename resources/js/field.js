import IndexField from './components/IndexField'
import DetailField from './components/DetailField'
import FormField from './components/FormField'
import Inputmask from 'inputmask'

Nova.booting((app, store) => {
  app.component('index-cep-field', IndexField)
  app.component('detail-cep-field', DetailField)
  app.component('form-cep-field', FormField)
})
