import Layout from "../components/Layout";
import LoginComponent from "../components/auth/LoginComponent";

const Login = () => {
	return (
		<Layout>
			<div className='row'>
				<div className='col-md-6 offset-md-3'>
					<h2>Sign in to your account</h2>
					<LoginComponent />
				</div>
			</div>
		</Layout>
	);
};

export default Login;
