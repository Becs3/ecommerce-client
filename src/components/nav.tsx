import { NavLink } from "react-router"
import { SearchField } from "./searchfield"

export const Nav = () =>{

    return (
        <nav>
            <ul>
                <li>
                    <NavLink to={"/"}>Home</NavLink>
                </li>
                <li>
                    <NavLink to={"/products"}>Products</NavLink>
                </li>
                <li>
                    <NavLink to={"/admin"}>Admin</NavLink>
                </li>
                <li>
                    <NavLink to={"/cart"}>Cart</NavLink>
                </li>
                <li>
                    <SearchField />
                </li>
            </ul>
        </nav>
    )
}