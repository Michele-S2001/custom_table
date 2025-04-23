import * as mdiIcons from '@mdi/js';

export default defineNuxtPlugin(() => {
  return {
    provide: {
      mdi: mdiIcons
    }
  };
});