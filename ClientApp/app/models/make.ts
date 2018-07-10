import { KeyValuePair } from './keyValuePair';
export interface Make extends KeyValuePair {
    models: KeyValuePair[];
}