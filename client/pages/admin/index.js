import React from "react";
import Layout from "../../components/Layout";
import AdminComponent from "../../components/auth/AdminComponent";

const adminDashboard = () => {
	return (
		<Layout>
			<AdminComponent>
				<h1>Admin Dashboard</h1>
			</AdminComponent>
		</Layout>
	);
};

export default adminDashboard;
