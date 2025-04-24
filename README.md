# Vuetify-like Table Experiment

## Overview
A simplified Vue 3 table component inspired by Vuetify's v-table, focusing on:
- Pagination
- Slot-based customization
- Responsive design
- TypeScript support

## Features
✔ Dynamic pagination  
✔ Customizable headers/cells via slots  
✔ Fixed headers with scrollable body  
✔ Type-safe props  
... and so on

## Usage example
```
<TableGlobal 
  :items="itemsToTable" 
  :headers="headersToTable"
  :fixedHeader="true"
  :itemsPerPageOptions="[10, 20, 40]"
>
  <template #['item.agePerson']="{ item }">
    <strong>{{ agePerson }}</strong>
  </template>
</TableGlobal>
```

You can find a more articulated example in the App.vue