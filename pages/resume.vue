<template>
  <div>
    <ResumeSheet :resume="state.resume" />
    <ResumeInput @upsertResume="upsert" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from '@vue/composition-api';
import ResumeInput from '@/components/ResumeInput.vue';
import { IResume } from '../models/Resume';
import ResumeSheet from '@/components/ResumeSheet.vue';

export default defineComponent({
  name: 'Resume',
  components: {
    ResumeInput,
    ResumeSheet
  },
  setup(props, context) {
    const state = reactive({
      resume: {} as IResume,
    })

    function upsert(item: any) {
      localStorage.clear()
      localStorage.setItem('resume', JSON.stringify(item.resume))

      if (localStorage.getItem('resume')) {
        // @ts-ignore
        state.resume = JSON.parse(localStorage.getItem('resume'))
      }
    }

    return {
      state,
      upsert,
    }
  },
})
</script>
