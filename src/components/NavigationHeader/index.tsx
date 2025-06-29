import { Link } from "react-router";
import { TbHome } from "react-icons/tb";

import "./style.css";

type NavigationHeaderProps = {
  heading: string;
};

function NavigationHeader({ heading }: NavigationHeaderProps) {
  return (
    <header className="navigation-header">
      <Link to="/" className="navigation-header__home-link">
        <TbHome size={28} />
      </Link>
      <h1 className="navigation-header__title">{heading}</h1>
    </header>
  );
}

export default NavigationHeader;
