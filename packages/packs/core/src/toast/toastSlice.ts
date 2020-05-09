/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Options, AppearanceTypes } from 'react-toast-notifications';

export interface SnackbarMessageOptions extends Options {
	autoDismiss: boolean;
}

export interface SnackbarMessage {
	message: string;
	key: string;
	options?: SnackbarMessageOptions;
	dismissed?: boolean;
}
interface ToastState {
	notifications: SnackbarMessage[];
}

const initialState: ToastState = {
	notifications: [],
};

type NotificationPayload = SnackbarMessage;

interface ClosePayload {
	all?: boolean;
	key: string;
}

const quickSend = (appearance: AppearanceTypes) => (state: ToastState, action: PayloadAction<NotificationPayload>) => {
	state.notifications.push({
		options: {
			appearance,
			autoDismiss: true,
		},
		...action.payload,
	});
};

export const toastSlice = createSlice({
	name: 'toast',
	initialState,
	reducers: {
		error: quickSend('error'),
		success: quickSend('success'),
		warning: quickSend('warning'),
		info: quickSend('info'),
		enqueue: (state: ToastState, action: PayloadAction<NotificationPayload>) => {
			state.notifications.push(action.payload);
		},
		close: (state: ToastState, action: PayloadAction<ClosePayload>) => {
			return {
				...state,
				notifications: state.notifications.map(notification =>
					action.payload.all || notification.key === action.payload.key
						? { ...notification, dismissed: true }
						: { ...notification },
				),
			};
		},
		remove: (state: ToastState, { payload }: PayloadAction<ClosePayload>) => {
			if (payload.all) {
				state.notifications = [];
			} else {
				state.notifications = state.notifications.filter(x => x.key !== payload.key);
			}
		},
	},
});

export const { enqueue, close, remove, error, info, success, warning } = toastSlice.actions;

export const toastActions = toastSlice.actions;

export default toastSlice.reducer;

interface RootState {
	toast: ToastState;
}

export const selectNotifications = (state: RootState) => state.toast.notifications;
