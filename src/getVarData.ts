import checkForVariableAlias from "./propertyChecker";

export function getVarData() {
  const vars = figma.variables
    .getLocalVariables()
    .filter((v) => v.resolvedType === "COLOR")
    .filter((v) => checkForVariableAlias(v.valuesByMode));

  const varData = vars.map((v) => {
    return {
      id: v.id,
      name: v.name,
      valuesByMode: v.valuesByMode,
      key: v.key,
    };
  });
  return varData;
}
