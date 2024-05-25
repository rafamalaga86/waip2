import { useState } from 'react';

export function useSwitch(initialState: boolean): [boolean, Function] {
  const [switchState, setSwitchState] = useState(initialState);

  function toggleSwitch() {
    if (switchState) setSwitchState(false);
    else setSwitchState(true);
  }

  return [switchState, toggleSwitch];
}
