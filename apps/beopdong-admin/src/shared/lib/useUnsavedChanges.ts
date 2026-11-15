import { useUnsavedChangesGuard } from './useUnsavedChangesGuard';

interface UnsavedChangesOptions<T> {
  readonly value: T;
  readonly initial: T;
  readonly enabled?: boolean;
}

export const useUnsavedChanges = <T,>({ value, initial, enabled = true }: UnsavedChangesOptions<T>) => {
  const isDirty = enabled && JSON.stringify(value) !== JSON.stringify(initial);
  const guard = useUnsavedChangesGuard(isDirty);

  return { isDirty, guard };
};
