// Since it's installed via our package.json we can just import by name
import Vue from 'vue';

// See below for HelloWorld.vue
import HelloWorld from './HelloWorld.vue';

// This defines our component as a <hello-world></hello-world> HTML tag
Vue.component('hello-world', HelloWorld);

// Vue components will only be rendered if they're inside an <... id="app"> ... </...> tag, but you can make this whatever selector you want if it conflicts with anything existing
new Vue({
 el: '#app', // or maybe '#vueable' if #app is too general
});