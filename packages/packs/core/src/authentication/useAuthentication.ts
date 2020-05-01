import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../application-configuration';
import { useEffect } from 'react';

export function useAuthentication(secure: boolean) {
	const navigate = useNavigate();
	const isAuthenticated = useSelector(selectIsAuthenticated);

	useEffect(() => {
		if (!secure) return;

		if (!isAuthenticated) {
			navigate('/account/login?returnUrl=');
		}
	}, [isAuthenticated, navigate, secure]);

	const showContent = !secure || (secure && isAuthenticated);

	return [showContent, isAuthenticated];
}

export default useAuthentication;
