import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'prismjs/themes/prism-coy.css';
import './assets/styles/layout.scss';

import 'primevue/resources/themes/aura-light-green/theme.css'

import App from './App.vue'

import { createApp } from 'vue';
import PrimeVue from 'primevue/config';

import InputText from 'primevue/inputtext';
import FloatLabel from 'primevue/floatlabel';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';

const app = createApp(App);
app.use(PrimeVue);
app.use(ToastService);

app.component('InputText', InputText);
app.component('FloatLabel', FloatLabel);
app.component('Button', Button);
app.component('Dialog', Dialog);
app.component('Toast', Toast);

app.mount("#app");
