import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useToasts } from 'react-toast-notifications';

import { selectNotifications, remove, SnackbarMessage } from './toastSlice';

let displayed: string[] = [];

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
		notifications.forEach(({ key, message, options = { appearance: 'info' }, dismissed = false }) => {
			if (dismissed) {
				removeDisplayed(key);
				removeToast(key);
				return;
			}

			if (displayed.includes(key)) return;

			addToast(message, {
				...options,
				onDismiss: k => {
					dispatch(
						remove({
							key: k,
						}),
					);
					removeDisplayed(k);
				},
			});
			storeDisplayed(key);
		});
	}, [notifications, addToast, removeToast, dispatch]);

	return null;
};

export default Notifier;
