"use client";

import { PropsWithChildren, useEffect, useState } from "react";
import { Authenticator } from "@aws-amplify/ui-react";
import { fetchAuthSession } from "aws-amplify/auth";

export function AmplifyGate({ children }: PropsWithChildren) {
	const [requiresAuth, setRequiresAuth] = useState<boolean>(false);
	const [checked, setChecked] = useState<boolean>(false);

	useEffect(() => {
		let isMounted = true;
		const checkAuth = async () => {
			try {
				await fetchAuthSession();
				if (isMounted) setRequiresAuth(true);
			} catch {
				if (isMounted) setRequiresAuth(false);
			} finally {
				if (isMounted) setChecked(true);
			}
		};
		void checkAuth();
		return () => {
			isMounted = false;
		};
	}, []);

	if (!checked) return null;
	if (!requiresAuth) return children;
	return <Authenticator>{children}</Authenticator>;
}