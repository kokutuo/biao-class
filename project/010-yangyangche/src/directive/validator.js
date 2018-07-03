/* eslint-disable */
import Vue from 'vue';

export default Vue.directive('validator', {
    bind: function (el, binding) {
        let rule = binding.value;

        if (typeof rule === 'string') {
            rule = parse_validator_rule(rule); // {required: true, min_length: 3}
        }

        el.addEventListener('keyup', () => {
            for (const r in rule) {
                if (!rule.hasOwnProperty(r))
                    continue;

                let arg = rule[r];
                let validator = valid[r];

                if (validator && !validator(el.value, arg)) {
                    console.log(r + "不合法");
                } else {
                    console.log(r + "合法");
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

            val = val == undefined ? true : val;

            rule[key] = val;
        });

    return rule;
}

const valid = {
    // username() {},

    required(val) {
        return !!val;
    },

    min_length(val, min) {
        console.log("min", min)
        return val.length >= min;
    },

    max_length(val, max) {
        console.log("max", max)
        return val.length <= max;
    }
};