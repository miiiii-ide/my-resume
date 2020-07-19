import { inject } from "@vue/composition-api";
import Vue from 'vue';

function formatDate(date: Date) {
    let year = date.getFullYear();
    let month = (`0${date.getMonth() + 1}`).slice(-2);

    return `${year}/${month}`
}

function getFullAge(birth: Date) {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const date = today.getDate();

    const birthYear = birth.getFullYear();
    const birthMonth = birth.getMonth();
    const birthDate = birth.getDate();

    let fullAge = year - birthYear;
    if (month < birthMonth) {
        fullAge = fullAge - 1;
    }
    if (month === birthMonth) {
        if (date < birthDate) {
            fullAge = fullAge - 1;
        }
    }
    return fullAge;
}

export default ({ }, inject: any) => {
    inject('getFullAge', getFullAge);
}

// export default (Vue: VueConstructor) => {
Vue.filter('formatDate', formatDate);
// }