export function env(name: string): string;
export function env<T>(
  name: string,
  options: { type?: (value: any) => T; defaultsTo?: T },
): T;
export function env(name: string, options?: any): any {
  const type = !options
    ? String
    : options.type || options.defaultsTo?.constructor;

  if (!type) {
    throw new Error(`Please provide a type for env ${name}`);
  }

  const rawValue = process.env[name];

  if (!rawValue) {
    if (options && 'defaultsTo' in options) {
      return options.defaultsTo;
    } else {
      throw new Error(`Missing value for env: ${name}`);
    }
  }

  if (type === Boolean) {
    if (rawValue === 'true') {
      return true;
    } else if (rawValue === 'false') {
      return false;
    } else {
      throw new Error(`Invalid boolean ${name}: ${rawValue}`);
    }
  } else if (type === Number) {
    const value = Number(rawValue);

    if (Number.isNaN(value)) {
      throw new Error(`Invalid number ${name}: ${rawValue}`);
    }

    return value;
  }

  return type(rawValue);
}
