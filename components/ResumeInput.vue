<template>
  <div class="section">
    <form @submit.prevent="upsertResume">
      <b-field label="Kana">
        <b-input v-model="state.resume.kana"></b-input>
      </b-field>
      <b-field label="Name">
        <b-input v-model="state.resume.name"></b-input>
      </b-field>
      <div class="columns">
        <b-field label="Birthday" class="column">
          <b-datepicker icon="calendar-today" v-model="state.resume.birth" />
        </b-field>
        <span class="column fullAge-wrapper">Full Age: {{fullAge}} 歳</span>
      </div>
      <b-field label="Address">
        <b-input v-model="state.resume.address"></b-input>
      </b-field>
      <b-field label="Telephone">
        <b-input v-model="state.resume.telephone"></b-input>
      </b-field>
      <b-field label="Email">
        <b-input v-model="state.resume.email"></b-input>
      </b-field>
      <div class="date-picker-wrapper">
        <span class="multiple-input">JobHistory</span>
        <div v-for="(job, index) in state.resume.jobs" :key="index">
          <div v-if="job.name">{{job.date | formatDate}} {{job.name}}</div>
        </div>
        <div class="columns">
          <b-field label="Job Term" class="column is-one-quarter">
            <b-datepicker type="month" icon="calendar-today" trap-focus v-model="state.job.date" />
          </b-field>
          <b-field label="Job Name" class="column">
            <b-input v-model="state.job.name"></b-input>
          </b-field>
        </div>
        <button class="icon-button" @click="addJob">
          <b-icon icon="plus" type="is-primary" />
        </button>
      </div>
      <div class="date-picker-wrapper">
        <span class="multiple-input">License</span>
        <div v-for="(license, index) in state.resume.licenses" :key="index">
          <div v-if="license.name">{{license.date | formatDate}} {{license.name}}</div>
        </div>
        <div class="columns">
          <b-field label="Obtain Date" class="column is-one-quarter">
            <b-datepicker
              type="month"
              icon="calendar-today"
              trap-focus
              v-model="state.license.date"
            />
          </b-field>
          <b-field label="License Name" class="column">
            <b-input v-model="state.license.name"></b-input>
          </b-field>
        </div>
        <button class="icon-button" @click="addLicense">
          <b-icon icon="plus" type="is-primary" />
        </button>
      </div>
      <b-field label="ExpectCondition">
        <b-input type="textarea" v-model="state.resume.condition"></b-input>
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
  computed,
  watchEffect,
} from '@vue/composition-api'
import { IResume, IJob } from '@/models/Resume'

export default defineComponent({
  name: 'ResumeInput',
  setup(props, { root, emit }) {
    const state = reactive({
      resume: {
        name: '' as String,
        kana: '' as String,
        birth: new Date() as Date,
        address: '' as String,
        telephone: '' as String,
        email: '' as String,
        jobs: [
          {
            name: '' as String,
            date: new Date() as Date,
          },
        ],
        licenses: [
          {
            name: '' as String,
            date: new Date() as Date,
          },
        ],
        fullAge: 0 as Number,
      } as IResume,
      job: {
        name: '' as String,
        date: new Date() as Date,
      } as IJob,
      license: {
        name: '' as String,
        date: new Date() as Date,
      },
    })

    const fullAge = ref<number>(0)
    watchEffect(async () => {
      // @ts-ignore
      fullAge.value = await root.context.$getFullAge(state.resume.birth)
      state.resume.fullAge = fullAge.value
    })

    function upsertResume() {
      emit('upsertResume', state)
    }

    function addJob() {
      const items = {
        name: state.job.name,
        date: state.job.date,
      }

      state.resume.jobs.push(items)
      state.job.name = ''
      state.job.date = new Date()
    }

    function addLicense() {
      const items = {
        name: state.license.name,
        date: state.license.date,
      }

      state.resume.licenses.push(items)
      state.license.name = ''
      state.license.date = new Date()
    }

    return {
      state,
      fullAge,
      upsertResume,
      addJob,
      addLicense,
    }
  },
})
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