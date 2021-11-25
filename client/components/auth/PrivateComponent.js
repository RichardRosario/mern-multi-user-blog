import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { isAuth } from "../../actions/auth";

const PrivateComponent = ({ children }) => {
	const router = useRouter();
	useEffect(() => {
		if (!isAuth()) {
			router.push("/login");
		}
	}, []);

	return <>{children}</>;
};

export default PrivateComponent;
