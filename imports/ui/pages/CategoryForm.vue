<script setup>
import { ref } from "vue";
import { Meteor } from "meteor/meteor";

//generate date string to obj

// const createDate = ref("");
// const createDateString = createDate.value;
// const createDateForm = new Date(createDateString);

const form = ref({
  name: "",
});

function submitForm() {
  Meteor.call("category.create", form.value, (err, result) => {
    if (result) {
      console.log("add sus");
    } else {
      console.log("Error: ", err);
    }
  });
}
</script>
<template>
  <v-container>
    <v-card class="w-25 pa-3">
      <v-card-title> Category Form </v-card-title>
      <v-card-text>
        <v-form>
          <v-row>
            <!-- <v-col cols="12" md="6">
              <v-text-field
                variant="outlined"
                placeholder="Date"
                type="date"
                v-model="createDate"
              >
              </v-text-field>
            </v-col> -->
            <v-col cols="12" md="12">
              <v-text-field
                variant="outlined"
                placeholder="MSI"
                label="CategoryName"
                v-model="form.name"
              >
              </v-text-field>
            </v-col>
            <v-col>
              <v-btn color="primary" @click="submitForm">Submit</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>
