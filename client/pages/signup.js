import Layout from "../components/Layout";
import SignupComponent from "../components/auth/SignupComponent";

const signup = () => {
	return (
		<Layout>
			<h2>Sign Up for an Account!</h2>
			<div className='row'>
				<div className='col-md-6 offset-md-3'>
					<SignupComponent />
				</div>
			</div>
		</Layout>
	);
};

export default signup;
