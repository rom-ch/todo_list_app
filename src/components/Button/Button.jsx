import classNames from "classnames";
import './Button.css'

function Button({ children, className, ...rest }) {
	const classes = classNames("button", className);

	return <button {...rest} className={classes}>{children}</button>;
}

export default Button;
