/**
 * @see https://react.dev/learn/passing-data-deeply-with-context
 */

import { createContext } from 'react';

// We can set up a drop down menu for user to select it on stretch feature and update it dynamically
export const AccountContext = createContext<string>('1')//Hardcoded for now, update for stretch feature
