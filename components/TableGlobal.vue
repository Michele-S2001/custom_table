<script setup lang="ts">
interface	props {
  items?: any[];
  headers: Header[];
  itemsPerPageOptions?: number[]
}

const p = withDefaults(defineProps<props>(), {
  itemsPerPageOptions: () => [10, 25, 50]
});

//NOTE: questa gestione è sicuramente migliorabile
const setupHeaderValue = (fn: any, arg: any): any => {
  if(!fn) return null;
  if(typeof fn === 'function') {
    return fn(arg);
  } else {
    return fn;
  }
}

//Config table vars
const selectedItemsPerPageOption = ref<number>(p.itemsPerPageOptions[0] ?? 10);

//Computed table
const getItemsToDisplay = computed(() => {
  const items = p.items ?? [];
  if(items.length === 0) return items;
  const max = Math.min(items.length, selectedItemsPerPageOption.value);
  return items.slice(0, max);
});
</script>

<template>
  <table>
    <thead v-if="headers">
      <tr>
        <th 
          v-for="(header, idx) in headers" 
          :key="header.key"  
          scope="col"
          :style="`text-align: ${header.align ?? 'left'}`"
        >
          <slot :name="`header.${header.key}`" :item="header" :index="idx">
            {{ header?.title ?? '' }}
          </slot>
        </th>
      </tr>
    </thead>
    <tbody>
      <template v-if="!!items && items?.length > 0">
        <tr v-for="(item, idx) in getItemsToDisplay" :key="idx">
          <td 
            v-for="(header, idx) in headers" 
            :key="header.key"
            :style="`text-align: ${header.align ?? 'left'}`"
          >
            <slot :name="`item.${header.key}`" :item="item" :index="idx">
              {{ setupHeaderValue(header?.value, item) ?? item?.[header.key] ?? '-' }}
            </slot>
          </td>
        </tr>
      </template>

      <tr v-else>
        <td :colspan="headers.length" style="text-align: center;">Nessun elemento disponibile</td>
      </tr>
    </tbody>
    <tfoot v-if="items?.length && items?.length > 10">
      <tr>
        <td :colspan="headers.length">
          <div>
            <!-- NOTE: per semplificare le cose, questo per ora non è un componente -->
            <label for="itemsPerPage-select">Elementi per pagina: </label>
            <select 
              v-model="selectedItemsPerPageOption" 
              name="itemsPerPageOptions" 
              id="itemsPerPage-select"
            >
              <option v-for="opt in itemsPerPageOptions" :value="opt">{{ opt }}</option>
            </select>
          </div>
        </td>
      </tr>
    </tfoot>
  </table>
</template>

<style scoped>
table {
  border-spacing: 0;
  font-size: 1.4rem;
  border: var(--default-table-border);
  border-radius: var(--default-table-border-radius);

  & tr:not(:last-child) > td {    
    border-bottom: var(--default-table-border);
  }

  tfoot > tr:first-child{
    padding: var(--default-table-cells-padding);
    
    & > td {
      text-align: right;
    }
  }
}

th {
  padding-bottom: 2px;
  font-size: 1.6rem;
  text-transform: uppercase;
  font-weight: 500;
  border-bottom: var(--default-table-border);
}

th, td {
  padding: var(--default-table-cells-padding);  
  min-width: var(--default-table-cells-min-width);
}


</style>