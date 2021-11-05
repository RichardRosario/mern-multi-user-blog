import { useState } from "react";
import Link from "next/link";
import { APP_NAME } from "../config";
import { isAuth } from "../actions/auth";

import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink,
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem
} from "reactstrap";

const Header = () => {
	const [isOpen, setIsOpen] = useState(false);

	const toggle = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div>
			<Navbar color='light' light expand='md'>
				<NavbarBrand href='/'>rsBlog</NavbarBrand>
				<NavbarToggler onClick={toggle} />
				<Collapse isOpen={isOpen} navbar>
					<Nav className='ml-auto' navbar>
						{isAuth ? (
							<>
								<NavItem>
									<NavLink href='/blog'>MyBlog</NavLink>
								</NavItem>
								<NavItem>
									<NavLink href='/logout'>Logout</NavLink>
								</NavItem>
							</>
						) : (
							<>
								<NavItem>
									<NavLink href='/login'>Login</NavLink>
								</NavItem>
								<NavItem>
									<NavLink href='https://github.com/RichardRosario'>
										GitHub
									</NavLink>
								</NavItem>
							</>
						)}
					</Nav>
				</Collapse>
			</Navbar>
		</div>
	);
};

export default Header;
