import type {
  PropType as VuePropType,
} from 'vue';

type ProjectConfig = {
  hosts:T
}

declare global {
  interface Window {
    projectConfig: ProjectConfig;
  }
  
  declare type PropType<T> = VuePropType<T>;
}
