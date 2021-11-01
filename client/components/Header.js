import { useState } from "react";
import Link from "next/link";
import { APP_NAME } from "../config";
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
						<NavItem>
							<NavLink href='/components/'>Components</NavLink>
						</NavItem>
						<NavItem>
							<NavLink href='https://github.com/RichardRosario'>GitHub</NavLink>
						</NavItem>
					</Nav>
				</Collapse>
			</Navbar>
		</div>
	);
};

export default Header;
