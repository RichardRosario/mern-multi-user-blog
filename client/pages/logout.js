import Layout from "../components/Layout";
import Link from "next/link";

const Logout = () => {
	return (
		<Layout>
			<div className='row'>
				<div className='col-md-6 offset-md-3'>
					<h2>
						Logout Successful. <Link href='/login'>Login Back?</Link>
					</h2>
				</div>
			</div>
		</Layout>
	);
};

export default Logout;
