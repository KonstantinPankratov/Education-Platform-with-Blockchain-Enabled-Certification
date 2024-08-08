import type { MaskitoOptions } from '@maskito/core'
import { maskitoDateOptionsGenerator, maskitoWithPlaceholder } from '@maskito/kit'

export const DATE_PLACEHOLDER = 'dd.mm.yyyy'
export const DATE_REGEX = /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[012])\.(19|20)\d\d$/

const dateOptions = maskitoDateOptionsGenerator({
  mode: 'dd/mm/yyyy',
  max: new Date()
})

const {
  plugins,
  ...placeholderOptions
} = maskitoWithPlaceholder(DATE_PLACEHOLDER, false)

export default {
  ...dateOptions,
  plugins: plugins.concat(dateOptions.plugins || []),
  preprocessors: [
    // Always put it BEFORE all other preprocessors
    ...placeholderOptions.preprocessors,
    ...dateOptions.preprocessors,
  ],
  postprocessors: [
    ...dateOptions.postprocessors,
    // Always put it AFTER all other postprocessors
    ...placeholderOptions.postprocessors,
  ],
} as Required<MaskitoOptions>