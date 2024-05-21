import { JSX } from "solid-js";
import "../app.css";

interface ContainerProps {
  children: JSX.Element;
}

const Container = (props: ContainerProps) => {
  const { children } = props;

  return <div class="container">{children}</div>;
};

export default Container;