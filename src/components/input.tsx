interface InputProps {
  onChange: (value: string) => void;
  value: string;
  maxlength?: number;
}

const Input = (props: InputProps) => {
  const { onChange, value, maxlength } = props;

  const handleChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    onChange(target.value);
  };

  return (
    <input
      class="style focus"
      type="text"
      value={value}
      onInput={handleChange}
      maxlength={maxlength ?? undefined}
    />
  );
};

export default Input;