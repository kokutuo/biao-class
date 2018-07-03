import Vue from 'vue';

export default Vue.directive('validator', {
    bind: function (el, binding) {
        let rule = binding.value;

        if (typeof rule === 'string') {
            rule = parse_validator_rule(rule); // {required: true, min_length: 3}
        }

        el.addEventListener('keyup', {
            for (const r of rule) {
                let arg = rule[r];
                let validator = valid[r];

                if (validator && !validator(el.value)) {

                }
            }
        })
    }
});

function parse_validator_rule(str) { // 'required|min_length:3'
    let rule = {};

    str
        .split('|') // ['required', 'min_length:3']
        .forEach(r => {
            let arr = r.split(':');
            let key = arr[0];
            let val = arr[1];

            val = val === undefined ? true : val;

            rule[key] = val;
        });

    return rule;
}

const valid = {
    username() {},

    required(val) {
        return !!val;
    },

    min_length(val, min) {
        return val.length >= min;
    },

    max_length(val, max) {
        return val.length <= max;
    }
};