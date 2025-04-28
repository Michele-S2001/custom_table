<script setup lang="ts">
import tableItems from './data/tableItems';

interface Item {
  id: number; 
  person?: string; 
  focusArea?: string | null; 
  age: number; 
  role?: string;
}

const itemsToTable: Item[] = tableItems;

const headersToTable: Header[] = [
  {
    title: "ID",
    key: "id"
  },
  {
    title: "Person",
    key: "person",
    value: (arg: Item) => arg?.person?.toUpperCase()
  },
  {
    title: "Focus area",
    key: "focusArea"
  },
  {
    title: "Age",
    key: "agePerson"
  },
  {
    title: "Role",
    key: "role",
    align: "center"
  }
];

</script>

<template>
  <div class="app_container">
    <TableGlobal 
      title="Le persone"
      :items="itemsToTable" 
      :headers="headersToTable"
      :fixedHeader="true"
      :itemsPerPageOptions="[10, 20, 40]"
    >
      <template #['header.role']="{ item: column }">
        &trade; {{ column.title }}
      </template>
      <template #['item.agePerson']="{ item }">
        <div class="tcs-flex">
          <span>
            {{ item.age  }}  
          </span>
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path :d="$mdi.mdiAccount" />
          </svg>
        </div>
      </template>
    </TableGlobal>
  </div>
</template>

<style scoped>
.tcs-flex {
  display: flex;
  align-items: center;
  gap: .2rem;
}

.app_container {
  margin: 2rem 5rem;
}
</style>