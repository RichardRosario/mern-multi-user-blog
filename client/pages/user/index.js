import React from "react";
import Layout from "../../components/Layout";
import PrivateComponent from "../../components/auth/PrivateComponent";

const userDashboard = () => {
	return (
		<Layout>
			<PrivateComponent>
				<h1>User Dashboard</h1>
			</PrivateComponent>
		</Layout>
	);
};

export default userDashboard;
