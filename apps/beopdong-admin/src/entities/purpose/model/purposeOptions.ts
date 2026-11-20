import type { Purpose } from '../ui/PurposeCard';

export interface PurposeOption {
  readonly id: number;
  readonly name: string;
}

export const toPurposeOptions = (purposes: readonly Purpose[]): readonly PurposeOption[] =>
  purposes.map(({ id, purpose }) => ({ id, name: purpose }));

export const findPurposeId = (options: readonly PurposeOption[], name: string): number | null =>
  options.find((option) => option.name === name)?.id ?? null;

export const findPurposeName = (options: readonly PurposeOption[], id: number): string | null =>
  options.find((option) => option.id === id)?.name ?? null;

export const toPurposeIds = (options: readonly PurposeOption[], names: readonly string[]): number[] | null => {
  const ids = names.map((name) => findPurposeId(options, name));
  return ids.some((id) => id === null) ? null : (ids as number[]);
};
