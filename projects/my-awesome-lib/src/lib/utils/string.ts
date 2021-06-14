export function concatStrTemplate(strings: TemplateStringsArray, ...values: any[]): string {
  let str = '';

  for (let i = 0; i < values.length; i++) {
    if (values[i]) {
      str += strings[i];
      str += values[i];
    }
  }

  str += strings[strings.length - 1];
  return str;
}
