<template>
    <div class="some-globally-inherited-style">
        <h1>{{ title }}</h1>
        <p :style="{color: welcomeMessageColor}">
            {{ welcomeMessage }}
        </p>
        <hr>
        Welcome message:
        <input type="text" v-model="welcomeMessage">
        <br>
        Color:
        <input type="text" v-model="welcomeMessageColor">
    </div>
</template>

<script>
    /*
        Inside this <script> tag, but outside the export default {...} is where we can import other libraries or components
        used in this component like axios (HTTP library), which you'd also need to add to your package.json
        We don't need axios in this example, but keeping it here for reference
    */
    // import axios from 'axios';
    export default {
        /*
            To start, all these below (data, props, methods, etc) share the same 'namespace' as they are all
            mapped to properties in the component instance, so they do need to all be different (you can't 
            have a data property and a method named "isLoading" for example)
        */
        /*
            This is local scoped component data
            You can reference this data in these other methods as this.* (ex. this.title) or
            in the template above as just * (ex. title)
        */
        data() {
            return {
                title: 'Hello World.',
                welcomeMessage: 'Welcome to Vue',
                welcomeMessageColor: this.initialWelcomeMessageColor,
            };
        },
        
        /*
            These are any props we pass in from the outside HTML world
            Ex. If this was defined by our main Vue app as <hello-world>, it'd look something like (in HTML convert camel case to kebab case)
            <hello-world welcome-message-color="blue"></hello-world>
            These CANNOT be the same as the data properties, and CANNOT be modified within this component
            If you need to pass data that can then be modified (which is common), setup a pattern like -
            the prop being 'initialWelcomeMessageColor' and the data attribute being 'welcomeMessageColor'
        */
        props: {
            initialWelcomeMessageColor: {
                type: String,
                default: '',
            }
        },
        /*
            There are a few life cycle hooks, but created() is the most commonly used
        */
        created() {
            // Make an initial AJAX request to update some data maybe?
        },
        /*
            Stash your methods here, all are scoped to this component and similar to the data() properties above can be referenced
            either in these methods as this.*() or in the template above as *()
            Ex. this.customConsoleLog('message') or customConsoleLog('message')
        */
        methods: {
            customConsoleLog(message) {
                console.log(Date.now() +' '+ message);
            }
        }
    };
</script>

<style lang="scss" scoped>
    /*
        SCSS and/or CSS here, you can switch by using the "lang" attribute (ex. lang="[css|scss]", but probably just leave it as scss,
        and the scoped attribute is optional, but it'll turn for example -
        
        h3 { color: green; }
        
        into
        
        h3[data-v-d95a720e] { color: green; }
        
        Keeping styles scoped to this component
    */
    
    h3 {
        color: green;
    }
</style>