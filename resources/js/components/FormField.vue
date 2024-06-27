<template>
  <DefaultField
    :field="field"
    :errors="errors"
    :show-help-text="showHelpText"
    :full-width-content="fullWidthContent"
  >
    <template #field>
      <input
        :id="field.attribute"
        type="text"
        class="w-full form-control form-input form-input-bordered"
        v-model="value"
        :class="errorClasses"
        :placeholder="field.name"
        v-maska
        :data-maska="mask"
        data-maska-eager
        @change="handleChange"
      />
      <Loader v-if="loading" width="30" height="20" />
    </template>

  </DefaultField>
</template>

<script>
import { FormField, HandlesValidationErrors } from 'laravel-nova'
import { chain, forEach, keys } from 'lodash';
import { vMaska } from 'maska'

export default {
  mixins: [FormField, HandlesValidationErrors],

  directives: {maska: vMaska},

  props: ['resourceName', 'resourceId', 'field'],

  data: () => ({
    apiResourceUrl: '/sereny/nova-cep/cep',
    loading: false,
    mask: '#####-###'
  }),

  methods: {
    setInitialValue() {
      this.value = this.field.value || ''
    },

    fill(formData) {
      formData.append(this.field.attribute, this.value || '')
    },

    handleChange(e) {
      if (!this.value) {
        return
      }

      this.loading = true
      this.clear()

      Nova.request()
        .get(this.apiResourceUrl, {params: {value: this.value}})
        .then(response => {
          if (response.data) {
            this.updateAttributes(response.data)
          } else {
            this.errors.record({[this.validationKey]: [
              this.__('Postcode not found')
            ]});
          }
        })
        .catch(error => console.error(error))
        .finally(() => this.loading = false)
    },

    updateAttributes(data) {
      forEach(this.field.options, (value, key) => {
        const fieldValue = Array.isArray(value)
          ? chain(data).pick(value).values().join(' - ')
          : data[value]


        this.emitFieldValue(key, fieldValue)
      })
    },

    clear() {
      this.errors.clear()
      keys(this.field.options).forEach(key => this.emitFieldValue(key, ''))
    }
  },
}
</script>
