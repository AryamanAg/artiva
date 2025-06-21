import { useRef, useEffect } from 'react';

export default function AccordionSection({ title, isOpen, onToggle, children }) {
  const contentRef = useRef(null);

  useEffect(() => {
    if (isOpen && contentRef.current) {
      contentRef.current.style.maxHeight = contentRef.current.scrollHeight + 'px';
    } else if (contentRef.current) {
      contentRef.current.style.maxHeight = '0px';
    }
  }, [isOpen]);

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 text-lg font-semibold focus:outline-none"
      >
        <span>{title}</span>
        <span
          className={`transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`}
        >
          ⌄
        </span>
      </button>
      <div
        ref={contentRef}
        className="px-4 pb-4 overflow-hidden text-sm text-gray-700 transition-all"
        style={{ maxHeight: isOpen ? contentRef.current?.scrollHeight : 0 }}
      >
        {children}
      </div>
    </div>
  );
}
