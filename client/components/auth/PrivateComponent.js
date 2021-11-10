import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { isAuth } from "../../actions/auth";

const PrivateComponent = ({ children }) => {
	const Router = useRouter();
	useEffect(() => {
		if (!isAuth()) {
			Router.push("/login");
		}
	}, []);

	return <>{children}</>;
};

export default PrivateComponent;
