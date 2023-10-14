export default function checkForVariableAlias(valuesByMode: any): boolean {
  for (const mode in valuesByMode) {
    const values = valuesByMode[mode];
    if (!values.type) return true;
  }
  return false;
}
