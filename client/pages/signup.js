import Layout from "../components/Layout";
import SignupComponent from "../components/auth/SignupComponent";
import Link from "next/link";

const signup = () => {
	return (
		<Layout>
			<h2>Sign Up for an Account!</h2>
			<SignupComponent />
		</Layout>
	);
};

export default signup;
