<template>
  <div>
    kana: {{ resume.kana }} name: {{ resume.name }} birth: {{ resume.birth }}
    {{ resume.fullAge }} add: {{ resume.address }} email:
    {{ resume.email }} phpne: {{ resume.phone }}
    jobs:
    <!-- foreach -->
    license:
    <!-- foreach -->

    other: {{ resume.condition }}
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api';
import { IResume } from '~/models/Resume';

export default defineComponent({
  name: 'ResumeSheet',
  props: {
    resume: {
      required: true,
      type: Object as PropType<IResume>,
      default: {},
    },
  },
});
</script>
