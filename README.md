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
  :items="allTableItems" 
  :headers="tableHeaders"
  :fixedHeader="true"
  :itemsPerPageOptions="[10, 20, 40]"
>
  <template #['item.agePerson']="{ item }">
    <strong>{{ age }}</strong>
    <svg width="24" height="24" viewBox="0 0 24 24">
      <path :d="$mdi.mdiAccount" />
    </svg>
  </template>
</TableGlobal>
```

You can find the full example in the App.vue