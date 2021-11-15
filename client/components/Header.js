import { useState } from "react";
import Link from "next/link";
import NProgress from "nprogress";
import Router from "next/router";

import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink
} from "reactstrap";
import { isAuth, logout } from "../actions/auth";

Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

const Header = () => {
	const [isOpen, setIsOpen] = useState(false);

	const toggle = () => {
		setIsOpen(!isOpen);
	};

	return (
		<Navbar color='light' light expand='md'>
			<NavbarBrand href='/'>rsBlog</NavbarBrand>
			<NavbarToggler onClick={toggle} />
			<Collapse isOpen={isOpen} navbar>
				<Nav className='ml-auto' navbar>
					{isAuth() && isAuth().role === 1 && (
						<NavItem>
							<Link href='/admin'>
								<NavLink style={{ cursor: "pointer" }}>{`${
									isAuth().name
								}'s Dashboard`}</NavLink>
							</Link>
						</NavItem>
					)}
					{isAuth() && isAuth().role === 0 && (
						<NavItem>
							<Link href='/user'>
								<NavLink style={{ cursor: "pointer" }}>{`${
									isAuth().name
								}'s Dashboard`}</NavLink>
							</Link>
						</NavItem>
					)}
					{isAuth() && (
						<NavItem>
							<Link href='/logout'>
								<NavLink style={{ cursor: "pointer" }} onClick={() => logout()}>
									Logout
								</NavLink>
							</Link>
						</NavItem>
					)}

					{!isAuth() && (
						<>
							<NavItem>
								<Link href='/login'>
									<NavLink style={{ cursor: "pointer" }}>Login</NavLink>
								</Link>
							</NavItem>
							<NavItem>
								<Link href='/signup'>
									<NavLink style={{ cursor: "pointer" }}>Register</NavLink>
								</Link>
							</NavItem>
						</>
					)}
				</Nav>
			</Collapse>
		</Navbar>
	);
};

export default Header;
