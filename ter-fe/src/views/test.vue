<template>
    <div>
      <v-btn @click="openDialog">Open Dialog</v-btn>
      <v-dialog v-model="dialog" persistent>
        <v-card>
          <v-card-title>
            Select Role
          </v-card-title>
          <v-card-text>
            <v-radio-group v-model="selectedRole">
              <v-radio value="head">As Head</v-radio>
              <v-radio value="peer-peer">As Peer-peer</v-radio>
              <v-radio value="student">As Student</v-radio>
            </v-radio-group>
            <v-select v-if="selectedRole === 'student'" v-model="selectedStudent" :items="students" label="Select Student"></v-select>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="dialog = false">Cancel</v-btn>
            <v-btn @click="confirmSelection">OK</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </template>
  
  <script>
    export default {
      data() {
        return {
          dialog: false,
          selectedRole: '',
          selectedStudent: '',
          students: ['Student 1', 'Student 2', 'Student 3'],
          resolve: null
        }
      },
      methods: {
        openDialog() {
          this.dialog = true
          return new Promise((resolve, reject) => {
            this.resolve = resolve
          })
        },
        confirmSelection() {
          this.dialog = false
          this.resolve({ role: this.selectedRole, student: this.selectedStudent })
          this.selectedRole = ''
          this.selectedStudent = ''
        }
      }
    }
  </script>
  