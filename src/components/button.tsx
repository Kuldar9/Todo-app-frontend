import { JSX } from "solid-js";

interface ButtonProps {
  onPress: () => void;
  children: JSX.Element;
}

const Button = (props: ButtonProps) => {
  const { onPress, children } = props;

  return (
    <button class="style focus active" onClick={onPress}>
      {children}
    </button>
  );
};

export default Button;