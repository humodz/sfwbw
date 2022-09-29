export interface Deleted<Id> {
  id: Id;
  deleted: true;
}

export type MaybeDeleted<T> = T & { deleted?: boolean };

export function makeDeleted<Id>(id: Id): Deleted<Id> {
  return { id, deleted: true };
}

export function isDeleted<Type, Id>(
  value: Type | Deleted<Id>,
): value is Deleted<Id> {
  return 'deleted' in value && value.deleted;
}
