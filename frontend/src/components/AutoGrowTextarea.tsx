import React, { useRef, useEffect } from 'react';

type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const AutoGrowTextarea: React.FC<Props> = ({ value, onInput, ...props }) => {
  const ref = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = () => {
    if (ref.current) {
      ref.current.style.height = 'auto';
      ref.current.style.height = `${ref.current.scrollHeight}px`;
    }
  };
  
  useEffect(() => {
    adjustHeight();
  }, [value]);

  useEffect(() => {
    window.addEventListener('resize', adjustHeight);
    return () => window.removeEventListener('resize', adjustHeight);
  }, []);

  const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    adjustHeight();
    if (onInput) onInput(e);
  };

  return (
    <textarea
      {...props}
      value={value}
      ref={ref}
      onInput={handleInput}
      style={{ overflow: 'hidden', resize: 'none', ...props.style }}
    />
  );
};

export default AutoGrowTextarea;
