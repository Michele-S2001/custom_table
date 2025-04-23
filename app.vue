<script setup lang="ts">
interface Item {
  id: number; 
  person?: string; 
  focusArea?: string | null; 
  age: number; 
  role?: string;
}

const itemsToTable: Item[] = [
  { id: 1, person: "Alice Johnson", focusArea: "Technology", age: 29, role: "Developer" },
  { id: 2, person: "Bob Smith", focusArea: "Finance", age: 35, role: "Accountant" },
  { id: 3, person: undefined, focusArea: "Marketing", age: 42, role: "Manager" },
  { id: 4, person: "Diana Evans", focusArea: "Healthcare", age: 31, role: "Doctor" },
  { id: 5, person: "Edward Green", focusArea: "Education", age: 27 },
  { id: 6, person: "Fiona Harris", focusArea: "Engineering", age: 38, role: "Engineer" },
  { id: 7, person: "George Lewis", focusArea: "Design", age: 24, role: "Designer" },
  { id: 8, person: "Hannah Moore", focusArea: "Law", age: 45, role: "Lawyer" },
  { id: 9, person: "Ian Nelson", focusArea: null, age: 33, role: "Researcher" },
  { id: 10, person: "Jessica Owens", focusArea: "Business", age: 30, role: "Consultant" },
  { id: 11, person: "Michele Serafini", focusArea: "Web dev", age:24,  role: "Front-End Jr"},
  { id: 12, person: "Hammed Baka", age: 67}
];

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
    title: "Most interested in",
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
      :items="itemsToTable" 
      :headers="headersToTable"
      :fixedHeader="true"
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
  display: grid;
  place-items: center;
  margin-top: 4rem;
}
</style>