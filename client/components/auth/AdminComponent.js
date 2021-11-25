import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { isAuth } from "../../actions/auth";

const AdminComponent = ({ children }) => {
	const router = useRouter();

	useEffect(() => {
		if (!isAuth()) {
			router.push("/login");
		} else if (isAuth().role !== 1) {
			router.push("/");
		}
	}, [router]);

	return <>{children}</>;
};

export default AdminComponent;
