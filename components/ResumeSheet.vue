<template>
    <div>
        name: {{resume.name}}
    </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from "@vue/composition-api";
import { IResume } from "~/models/Resume";


export default defineComponent({
    name:'ResumeSheet',
    props: {
        resume: {
            required: true,
            type: Object as PropType<IResume>,
            default: {}
        }
    }
})
</script>