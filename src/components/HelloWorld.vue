<template>
  <div class="hello">
    <img src="../assets/images/video-image.jpg" alt="title" />
    <h1>{{ msg }}</h1>
    <p>{{ token }}</p>
    <p>{{ name }}</p>
  </div>
</template>

<script>
import api from "../api/index.js";

export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      token: "",
      name: ""
    };
  },
  mounted() {
    this.login();
  },
  methods: {
    async login() {
      let postData = {
        appCode: "edurp",
        username: "13669235750",
        password: "123456"
      };
      let data = await api.request("post", api.settings.login, postData);
      this.token = data.body.tokenType + " " + data.body.token;
      this.name = data.body.userDisplayName;
      console.log(data);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
