interface ToggleProps {
  text: string;
  done?: boolean;
  onToggle?: () => void;
}

const ToggleButton = (props: ToggleProps) => {
  const { text, done = false, onToggle } = props;

  const handleToggle = () => {
    if (onToggle) {
      onToggle();
    }
  };

  return (
    <div class={`style focus ${done ? 'done' : ''}`} onClick={handleToggle} style={{ opacity: done ? 0.5 : 1 }}>
      {done ? <s>{text}</s> : text}
    </div>
  );
};

export default ToggleButton;