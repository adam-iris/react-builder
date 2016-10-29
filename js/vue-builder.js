(function($) {

    Vue.component('text-input', {
        template: '\
            <div class="form-group">\
              <label v-bind:for="randomId">{{ label }}:</label>\
              <input v-bind:id="randomId" v-bind:value="value" v-on:input="onInput">\
            </div>\
          ',
          props: ['value', 'label'],
          data: function () {
            return {
              randomId: 'input-' + Math.random()
            }
          },
          methods: {
            onInput: function (event) {
              this.$emit('input', event.target.value)
            }
          },
    });

    Vue.component('builder', {
        template: '\
            <div> \
                <h2>Builder</h2> \
                <slot>fields</slot> \
                <div>link here</div> \
            </div> \
        ',
        props: ['fields']
    });

})(jQuery);
