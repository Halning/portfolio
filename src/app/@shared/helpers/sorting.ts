export function compareString(a: string, b: string, isAsc: boolean): number {
  return a.localeCompare(b) * (isAsc ? 1 : -1);
}

export function compareBoolean(a: boolean, b: boolean, isAsc: boolean): number {
  return (+a - +b) * (isAsc ? -1 : 1);
}
