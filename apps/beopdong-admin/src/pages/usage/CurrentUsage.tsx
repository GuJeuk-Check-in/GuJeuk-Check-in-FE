import { CurrentUsageBoard } from '@widgets/usage';
import { previewUsageGroups } from './model/previewUsages';


const CurrentUsage = () => {
  return (
    <CurrentUsageBoard
      groups={previewUsageGroups}
      onEndEarly={() => undefined}
    />
  );
};

export default CurrentUsage;
