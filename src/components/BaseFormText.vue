<template>
  <BaseFormField :title="title" :error="error">
    <!-- eslint-disable-next-line -->
    <input v-model="dataValue" class="form__input" :type="type" name="name" :placeholder="placeholder">
  </BaseFormField>
</template>

<script>
import formFieldMixin from '@/mixins/formFieldMixin';

export default {
  // примеси, туда выносим повторяющийся код (подмешиваются к тому, что есть тут)
  mixins: [formFieldMixin],

  // входящие параметры можно описать через объект, тогда можно указывать default значение
  props: {
    type: {
      default: 'text',
    },
  },
};
</script>
