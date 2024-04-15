<template>
  <div class="flex justify-content-center align-items-center">
    <Dialog
      header="Resource URL"
      v-model:visible="showSettings"
      :draggable="true"
      :breakpoints="{ '960px': '75vw' }"
      :style="{
        width: '20vw',
        border: '1px solid black',
        'box-shadow': '5px 5px',
      }"
      :modal="false"
      :dismissableMask="true"
    >
      <div class="flex flex-wrap justify-content-around p-2">
        <InputText
          placeholder="https://api.npoint.io/..."
          v-model="resourceURL"
          min="1"
          class="col-9 text-center"
          id="displayRow"
        />
        <Button
          icon="pi pi-arrow-circle-right"
          class="p-button-text"
          @click="updateURL()"
        />
      </div>
    </Dialog>
    <div class="col-0 lg:col-4"></div>
    <div class="col-12 lg:col-4">
      <FloatLabel>
        <InputText
          id="searchbar"
          type="text"
          v-model="searchvalue"
          style="width: 100%"
          @mousedown="mousedown"
          @mouseup="mouseup"
        />
        <label for="searchbar">Search Resource (Hold to clear)</label>
      </FloatLabel>

      <ul class="list-none flexwrap ml-0">
        <li
          v-for="resource in filteredResource"
          :key="resource.title"
          style="width: 100%"
          class="ml-0"
        >
          <card-view
            :data="resource"
            :tagcolors="this.resourceData.tagcolors"
            @search="(tag) => tagSearch(tag)"
          ></card-view>
        </li>
      </ul>
    </div>
    <div class="col-0 lg:col-4"></div>
    <div id="settings">
      <button class="settingsButton" @click="openSettings()">Settings</button>
    </div>
  </div>
</template>

<script>
import CardView from "./CardView.vue";
// import resourceData from "../../public/data/test.json"

export default {
  data() {
    return {
      searchvalue: "",
      resourceURL: "",
      resourceData: { 'data': [], 'tagcolors': [] },
      showSettings: false,
    };
  },
  computed: {
    filteredResource() {
      let search = this.searchvalue;
      const regex = /tag:"([^"]+)"/i;
      const match = regex.exec(search);

      if (match) {
        const tagWord = match[1].toLowerCase(); // Convert extracted tag word to lowercase
        return this.resourceData.data.filter((item) =>
          item.tags.some((tag) => tag.toLowerCase() === tagWord)
        );
      } else {
        return this.resourceData.data.filter((item) =>
          item.title.toLowerCase().includes(search.toLowerCase())
        );
      }
    },
  },
  methods: {
    tagSearch(tag) {
      this.searchvalue = 'tag:"' + tag + '"';
    },
    clearSearchBar() {
      // Clear the search bar
      this.searchvalue = "";
    },
    mousedown() {
      this.timerId = setTimeout(this.clearSearchBar.bind(this), 750);
      setTimeout(() => {
        clearTimeout(this.intervalId); // Clear interval if the user doesn't let go for >5 seconds
      }, 5000);
    },
    mouseup() {
      clearTimeout(this.timerId);
    },
    openSettings() {
      this.showSettings = !this.showSettings;
    },
    async updateURL() {
      const url = this.resourceURL;
      const response = await fetch(url, {
        method: "GET",
      });

      let responseData = await response.json();

      this.resourceData = responseData;
      console.log(this.resourceData)
    },
  },
  components: {
    CardView,
  },
};
</script>

<!-- A
    SettingsDialogdd "scoped" attribute to limit CSS to this component only -->
<style scoped>

ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
}
a {
  color: #42b983;
}

.settingsButton {
  background-color: #31b0d5;
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
  border-color: #46b8da;
}

#settings {
  position: fixed;
  bottom: -4px;
  right: 10px;
}
</style>
