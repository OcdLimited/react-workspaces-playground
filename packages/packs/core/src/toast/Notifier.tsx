import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useToasts } from 'react-toast-notifications';

import { selectNotifications, remove } from './toastSlice';

let displayed: string[] = [];

export interface SnackbarMessage {
	message: string;
	key: number;
}

export interface State {
	open: boolean;
	snackPack: SnackbarMessage[];
	messageInfo?: SnackbarMessage;
}

export const Notifier = () => {
	const notifications = useSelector(selectNotifications);
	const { addToast, removeToast } = useToasts();
	const dispatch = useDispatch();

	const storeDisplayed = (id: string) => {
		displayed = [...displayed, id];
	};

	const removeDisplayed = (id: string) => {
		displayed = [...displayed.filter(key => id !== key)];
	};

	useEffect(() => {
		notifications.forEach(({ key, message, options = {}, dismissed = false }) => {
			if (dismissed) {
				removeDisplayed(key);
				removeToast(key);
				return;
			}

			if (displayed.includes(key)) return;

			addToast(message, {
				id: key,
				...options,
				onDismiss: key => {
					dispatch(
						remove({
							key,
						}),
					);
					removeDisplayed(key);
				},
			});
			storeDisplayed(key);
		});
	}, [notifications, addToast, removeToast, dispatch]);

	return null;
};

export default Notifier;
