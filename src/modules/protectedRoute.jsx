import React, { useEffect, useRef } from 'react';
import { useLocation, Navigate, useNavigate } from 'react-router-dom';

import { useAuthSystem } from '../hooks/useAuthSystem';
{/* import { useClientAction } from '../hooks/useClientAction'; */}

const ProtectedRoute = ({ children }) => {
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const [isLoggedIn] = useAuthSystem();

	const timeoutIdRef = useRef(null);

	const resetTimer = () => {
		if (timeoutIdRef.current) {
			clearTimeout(timeoutIdRef.current);
		}

		timeoutIdRef.current = setTimeout(() => {
			sessionStorage.clear();
			navigate("/login"); // Redirige vers la page de login
		}, 2000 * 60);
	};
	
	{/* useClientAction(resetTimer); */}

	useEffect(() => {
		resetTimer();

		return () => {
			clearTimeout(timeoutIdRef.current);
		};
	}, []);

	if (!isLoggedIn && pathname) {
		return <Navigate to={`/login`} />;
	}

	return children;
}

export { ProtectedRoute };
