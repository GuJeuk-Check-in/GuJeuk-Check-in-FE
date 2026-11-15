import { useBlocker } from 'react-router-dom';
import { adminTokens } from '@center/tokens';
import { useTheme } from '@emotion/react';
import { LuFileWarning } from 'react-icons/lu';
import type { ModalConfig } from '@center/ui/modal';

export const useUnsavedChangesGuard = (isDirty: boolean) => {
  const blocker = useBlocker(isDirty);
  const { colors } = adminTokens(useTheme());

  const config: ModalConfig | null =
    blocker.state === 'blocked'
      ? {
          icon: <LuFileWarning />,
          title: '저장되어 있지 않습니다',
          subtitle: '되돌아 가시겠습니까?',
          theme: 'warning',
          buttons: [
            { label: '아니요', onClick: () => blocker.reset() },
            {
              label: '예',
              variant: 'primary',
              bgColor: colors.error,
              onClick: () => blocker.proceed(),
            },
          ],
        }
      : null;

  return {
    isOpen: config !== null,
    config,
    onClose: () => blocker.reset?.(),
  };
};
