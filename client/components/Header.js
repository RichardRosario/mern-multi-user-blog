import { useState } from "react";
import Link from "next/link";
import { APP_NAME } from "../config";
import { isAuth, logout } from "../actions/auth";

import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink
} from "reactstrap";

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
					{isAuth() ? (
						<>
							<NavItem>
								<NavLink
									href={isAuth().role === 1 ? "/admin" : "/user"}
									onClick={() => logout()}
								>
									Dashboard
								</NavLink>
							</NavItem>
							<NavItem>
								<NavLink href='/logout' onClick={() => logout()}>
									Logout
								</NavLink>
							</NavItem>
						</>
					) : (
						<>
							<NavItem>
								<NavLink href='/login'>Login</NavLink>
							</NavItem>
							<NavItem>
								<NavLink href='/signup'>Register</NavLink>
							</NavItem>
						</>
					)}
				</Nav>
			</Collapse>
		</Navbar>
	);
};

export default Header;
