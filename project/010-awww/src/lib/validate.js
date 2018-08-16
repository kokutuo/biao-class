export default {
  validate_before_submit,
} 

const validate_before_submit = () => {
  this.$validator.validateAll().then(r => {
    if (!r) {
      alert('请修改错误的信息！');
      return;
    }
  })
}