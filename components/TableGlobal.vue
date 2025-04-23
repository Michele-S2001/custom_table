<script setup lang="ts">
interface	props {
  items?: any[];
  headers: Header[];
  itemsPerPageOptions?: number[],
  fixedHeader?: boolean
}

const p = withDefaults(defineProps<props>(), {
  itemsPerPageOptions: () => [10, 25, 50],
  fixedHeader: () => false
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

const getTotalNumOfItems = computed<number>(() => p.items?.length ?? 0);
</script>

<template>
  <div class="t-main">
    <section class="t-wrapper">
      <table>
        <thead :class="{ 'fixedHeader': fixedHeader }" v-if="headers">
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
      </table>
    </section>
    <section class="t-toolbar" v-if="items?.length && items?.length > 10"> 
      <div>
        <!-- NOTE: per semplificare le cose, questo per ora non è un componente -->
        <label for="itemsPerPage-select">Elementi per pagina: </label>
        <select 
          class="t-IPPSelect"
          v-model="selectedItemsPerPageOption" 
          name="itemsPerPageOptions" 
          id="itemsPerPage-select"
        >
          <option v-for="opt in itemsPerPageOptions" :value="opt">{{ opt }}</option>
        </select>
      </div>
      <div>
        1 - {{ getItemsToDisplay.length }} di {{ getTotalNumOfItems }}
      </div>
    </section>
  </div>
</template>

<style scoped>
.t-main {
  padding: 1.8rem;
  font-size: 1.4rem;
  border: var(--default-table-border);
  border-radius: var(--default-table-border-radius);
  overflow-x: auto;

  .t-wrapper {
    max-height: 550px;
    overflow: auto;
  }

  .t-toolbar {
    display: flex;
    align-items: center;
    justify-content: end;
    gap: 2.4rem;
    padding: var(--default-table-cells-padding);

    .t-IPPSelect {
      font-size: inherit;
      font-family: inherit;
      padding: 5px 15px 5px 5px;
      border-radius: 0.7rem;
      border-color: var(--grey);
    }
  }
}

table {
  position: relative;
  border-spacing: 0;
  width: 100%;

  thead {
    background-color: var(--white);
  }

  & tr:not(:last-child) > td {    
    border-bottom: var(--default-table-border);
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

.fixedHeader {
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 20;
}
</style>