import { useId, type ChangeEventHandler, type KeyboardEventHandler } from 'react';

type TextFieldProps = {
  placeholder?: string;
  title?: string;
  error?: string | null;
  value: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
  maxLength?: number;
  className?: string;
};

export default function TextField({
  placeholder = '텍스트를 입력하세요',
  title,
  error,
  value,
  onChange,
  onKeyDown,
  maxLength,
  className,
}: TextFieldProps) {
  const inputId = useId();
  const errorStyle = 'border-mr-red focus:border-mr-red';
  const primaryStyle = 'border-border focus:border-accent focus:bg-white focus:ring-3 focus:ring-accent/18';

  return (
    <div className='flex flex-col gap-1'>
      {title && <label htmlFor={inputId} className='pl-3 font-body font-bold text-text text-sm'>{title}</label>}
      <input
        id={inputId}
        type="text"
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        maxLength={maxLength}
        placeholder={placeholder}
        className={`w-full bg-card text-body-lg text-text border rounded-input placeholder-muted px-4 py-[13px] focus:outline-none ${error ? errorStyle : primaryStyle} ${className ? className : ''}`}
      />
      {error && <p className='pl-3 font-body text-mr-red text-sm'>{error}</p>}
    </div>
  );
}
