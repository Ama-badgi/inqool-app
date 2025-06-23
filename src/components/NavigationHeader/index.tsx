import { Link } from "react-router";

type NavigationHeaderProps = {
  heading: string;
};

function NavigationHeader({ heading }: NavigationHeaderProps) {
  return (
    <>
      <Link to="/">Home</Link>
      <h1>{heading}</h1>
    </>
  );
}

export default NavigationHeader;
