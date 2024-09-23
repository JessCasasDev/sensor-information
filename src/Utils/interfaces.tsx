export interface CommanderInfo {
  channel: string;
  controlunit: number;
  controlunitName: string;
  unit: string;
  values: Array<{
    timestamp: number;
    value: number;
    valid: boolean;
    state: number;
  }>;
}
