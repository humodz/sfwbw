export interface Deleted<Id> {
  id: Id;
  deleted: true;
}

export type MaybeDeleted<T> = T & { deleted?: boolean };

export function isDeleted<Type, Id>(
  value: Type | Deleted<Id>,
): value is Deleted<Id> {
  return 'deleted' in value && value.deleted;
}

export function transformResponseDeleted<Result, Id, QueryArg>(
  getId: (args: QueryArg) => Id,
) {
  return (result: Result, _: unknown, args: QueryArg): Result | Deleted<Id> => {
    if (result) {
      return result;
    } else {
      return {
        id: getId(args),
        deleted: true,
      };
    }
  };
}
