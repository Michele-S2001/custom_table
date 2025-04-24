<script setup lang="ts">
import { mdiArrowCollapseLeft, mdiArrowLeft, mdiArrowRight, mdiArrowCollapseRight } from '@mdi/js';

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
const currentPage = ref<number>(1);

//Computed table
const getItemsToDisplay = computed(() => {
  const items = p.items ?? [];
  if (items.length === 0) return items;
  
  const start:number = (currentPage.value - 1) * selectedItemsPerPageOption.value;
  const end:number = start + selectedItemsPerPageOption.value;
  
  return items.slice(start, end);
});

const totalPages = computed<number>(() => 
  Math.max(1, Math.ceil(getTotalNumOfItems.value / selectedItemsPerPageOption.value))
);

const getTotalNumOfItems = computed<number>(() => p.items?.length ?? 0);

const pageRangeText = computed<string>(() => {
  if (getTotalNumOfItems.value === 0) return '0-0 di 0';
  
  const start:number = (currentPage.value - 1) * selectedItemsPerPageOption.value + 1;
  const end:number = Math.min(
    currentPage.value * selectedItemsPerPageOption.value,
    getTotalNumOfItems.value
  );
  
  return `${start}-${end} di ${getTotalNumOfItems.value}`;
});

//Fns table
const showNextItems = ():void => { currentPage.value = Math.min(currentPage.value + 1, totalPages.value); };
const showPrevItems = ():void => { currentPage.value = Math.max(currentPage.value - 1, 1); };
const goToFirstPage = ():void => { currentPage.value = 1; };
const goToLastPage = ():void => { currentPage.value = totalPages.value; };

//Navigation arrows
const navigationArrows = ref<navigationArrow[]>([
  {
    icon: mdiArrowCollapseLeft,
    action: goToFirstPage,
    disabled: computed<boolean>(() => currentPage.value === 1)
  },
  {
    icon: mdiArrowLeft,
    action: showPrevItems,
    disabled: computed<boolean>(() => currentPage.value === 1)
  },
  {
    icon: mdiArrowRight,
    action: showNextItems,
    disabled: computed<boolean>(() => currentPage.value === totalPages.value)
  },
  {
    icon: mdiArrowCollapseRight,
    action: goToLastPage,
    disabled: computed<boolean>(() => currentPage.value === totalPages.value)
  },
]);

//watchers
watch(selectedItemsPerPageOption, () => {
  currentPage.value = 1;
});

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
        {{ pageRangeText }}
      </div>
      <div class="t-nav-indicators">
        <button
          v-for="navArrow in navigationArrows"
          :key="navArrow.icon"
          @click.stop="navArrow.action"
          :disabled="navArrow.disabled" 
          :class="{ 'disabled': navArrow.disabled }"
        >
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path :d="navArrow.icon" />
          </svg>
        </button>
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
    gap: 4rem;
    flex-wrap: wrap;
    padding: var(--default-table-cells-padding);

    .t-IPPSelect {
      font-size: inherit;
      font-family: inherit;
      padding: 5px 15px 5px 5px;
      border-radius: 0.7rem;
      border-color: var(--grey);
    }

    .t-nav-indicators {
      display: flex;
      align-items: center;
      gap: 2rem;

      button {
        background-color: var(--white);
        border: none;
        border-radius: 1rem;
        width: 30px;
        aspect-ratio: 1;
        cursor: pointer;
        transition: all 80ms ease-in-out;

        &.disabled {
          fill: var(--light-grey);
          cursor: auto;
        }

        &:hover:not(.disabled) {
          background-color: var(--light-grey);
        }

        &:active {
          scale: .9;
        }
      }
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