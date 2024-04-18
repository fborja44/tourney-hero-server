import { combineReducers } from 'redux';
import dataReducer from './dataReducer';
import { OverlayData } from '@common/interfaces/Data';

export interface AppState {
	dataState: OverlayData;
}

const rootReducer = combineReducers({
	dataState: dataReducer,
});

export default rootReducer;
