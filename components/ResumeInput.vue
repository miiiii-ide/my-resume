<template>
  <div class="section">
    <form @submit.prevent="upsertResume">
      <b-field label="Kana">
        <b-input v-model="state.resume.kana" />
      </b-field>
      <b-field label="Name">
        <b-input v-model="state.resume.name" />
      </b-field>
      <div class="columns">
        <b-field label="Birthday" class="column">
          <b-datepicker v-model="state.resume.birth" icon="calendar-today" />
        </b-field>
        <span class="column fullAge-wrapper">Full Age: {{ fullAge }}</span>
      </div>
      <b-field label="Address">
        <b-input v-model="state.resume.address" />
      </b-field>
      <b-field label="Telephone">
        <b-input v-model="state.resume.telephone" />
      </b-field>
      <b-field label="Email">
        <b-input v-model="state.resume.email" />
      </b-field>
      <div class="date-picker-wrapper">
        <span class="multiple-input">JobHistory</span>
        <div v-for="(job, index) in state.resume.jobs" :key="index">
          <div v-if="job.name">{{ job.date | formatDate }} {{ job.name }}</div>
        </div>
        <div class="columns">
          <b-field label="Job Term" class="column is-one-quarter">
            <b-datepicker
              v-model="state.job.date"
              type="month"
              icon="calendar-today"
              trap-focus
            />
          </b-field>
          <b-field label="Job Name" class="column">
            <b-input v-model="state.job.name" />
          </b-field>
        </div>
        <button class="icon-button" @click="addJob">
          <b-icon icon="plus" type="is-primary" />
        </button>
      </div>
      <div class="date-picker-wrapper">
        <span class="multiple-input">License</span>
        <div v-for="(license, index) in state.resume.licenses" :key="index">
          <div v-if="license.name">
            {{ license.date | formatDate }} {{ license.name }}
          </div>
        </div>
        <div class="columns">
          <b-field label="Obtain Date" class="column is-one-quarter">
            <b-datepicker
              v-model="state.license.date"
              type="month"
              icon="calendar-today"
              trap-focus
            />
          </b-field>
          <b-field label="License Name" class="column">
            <b-input v-model="state.license.name" />
          </b-field>
        </div>
        <button class="icon-button" @click="addLicense">
          <b-icon icon="plus" type="is-primary" />
        </button>
      </div>
      <b-field label="ExpectCondition">
        <b-input v-model="state.resume.condition" type="textarea" />
      </b-field>
      <button type="submit">
        <b-icon icon="content-save" />
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  ref,
  watchEffect,
} from '@vue/composition-api';
import { IResume, IJob } from '@/models/Resume';

export default defineComponent({
  name: 'ResumeInput',
  setup(props, { root, emit }) {
    const state = reactive({
      resume: {
        name: '' as string,
        kana: '' as string,
        birth: new Date() as Date,
        address: '' as string,
        telephone: '' as string,
        email: '' as string,
        jobs: [
          {
            name: '' as string,
            date: new Date() as Date,
          },
        ],
        licenses: [
          {
            name: '' as string,
            date: new Date() as Date,
          },
        ],
        condition: '' as string,
        fullAge: 0 as number,
      } as IResume,
      job: {
        name: '' as string,
        date: new Date() as Date,
      } as IJob,
      license: {
        name: '' as string,
        date: new Date() as Date,
      },
    });

    const fullAge = ref<number>(0);
    watchEffect(async () => {
      // @ts-ignore
      fullAge.value = await root.context.$getFullAge(state.resume.birth);
      state.resume.fullAge = fullAge.value;
    });

    function upsertResume() {
      emit('upsertResume', state);
    }

    function addJob() {
      const items = {
        name: state.job.name,
        date: state.job.date,
      };

      state.resume.jobs.push(items);
      state.job.name = '';
      state.job.date = new Date();
    }

    function addLicense() {
      const items = {
        name: state.license.name,
        date: state.license.date,
      };

      state.resume.licenses.push(items);
      state.license.name = '';
      state.license.date = new Date();
    }

    return {
      state,
      fullAge,
      upsertResume,
      addJob,
      addLicense,
    };
  },
});
</script>

<style scoped>
div span.multiple-input {
  margin-bottom: 0.5em;
  color: #363636;
  display: block;
  font-size: 1rem;
  font-weight: 600;
}
div.date-picker-wrapper {
  margin-bottom: 0.75rem;
}
.fullAge-wrapper {
  align-items: flex-end;
  display: flex;
  margin-bottom: 0.75rem;
}
</style>
