import { Search } from 'lucide-react';
import { useId, type ChangeEventHandler, type KeyboardEventHandler } from 'react';

type SearchInputProps = {
  placeholder?: string;
  value: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
  className?: string;
};

export default function SearchInput({
  placeholder = '빠른 찾기',
  value,
  onChange,
  onKeyDown,
  className,
}: SearchInputProps) {
  const inputId = useId();

  return (
    <label
      htmlFor={inputId}
      className={`flex cursor-text items-center gap-2 bg-card border border-border rounded-input px-3.5 transition-all focus-within:border-accent focus-within:bg-white focus-within:ring-3 focus-within:ring-accent/18 ${className ?? ''}`}
    >
      <Search size={15} className="text-muted shrink-0" />
      <input
        id={inputId}
        type="text"
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        className="min-w-0 flex-1 border-none outline-none bg-transparent py-[13px] text-body-lg text-text placeholder-muted"
      />
    </label>
  );
}
