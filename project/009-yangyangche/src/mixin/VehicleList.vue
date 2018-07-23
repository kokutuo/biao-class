<script>
export default {
  methods: {
    get_main_cover_url(row) {
      return row.preview && row.preview[0] && row.preview[0].url
        ? row.preview[0].url
        : "https://i.loli.net/2018/07/06/5b3f160071a17.jpg";
    }
  }
};
</script>