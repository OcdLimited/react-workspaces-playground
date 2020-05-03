import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { buildSelectIsAuthenticated } from '../application-configuration';
import { useEffect } from 'react';

export function useAuthentication(secure: boolean) {
	const navigate = useNavigate();
	const isAuthenticated = useSelector(buildSelectIsAuthenticated());

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
