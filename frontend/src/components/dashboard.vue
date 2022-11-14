<template>
  <main>
    <div>
      <h1 class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10">Welcome</h1>
    </div>
    <div>
      <p v-for="query in queryData" :key = "query._id"> {{"Number of Attendees: " + query.total + " Event Name: " + query._id}}</p>
    </div>
  </main>
</template>
<script>
import axios from "axios";


// export default {
//   methods: {
//     routePush(routeName) {
//       this.$router.push({ name: routeName });
//     },
//   },
// };

export default {
  data() {
    return {
      queryData: [],
      //Parameter for search to occur
      _id: "",
      total: "",
    };
  },

mounted() {
    let apiURL = 'http://localhost:3000/eventdata/eventAttendees';
    axios.get(apiURL).then((resp) => {
      this.queryData = resp.data;
    });
    window.scrollTo(0, 0);
  }}


</script>
