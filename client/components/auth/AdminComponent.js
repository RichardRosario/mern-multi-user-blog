import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { isAuth } from "../../actions/auth";

const AdminComponent = ({ children }) => {
	const Router = useRouter();
	useEffect(() => {
		if (!isAuth()) {
			Router.push("/login");
		} else if (isAuth().role !== 1) {
			Router.push("/");
		}
	}, [Router]);

	return <>{children}</>;
};

export default AdminComponent;
