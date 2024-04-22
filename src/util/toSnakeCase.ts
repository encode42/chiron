export function toSnakeCase(string: string) {
	return string.replaceAll(/([a-z])([A-Z])/g, "$1_$2").toLowerCase();
}
