import { useState, useRef } from 'react';
import { 
  Bold, Italic, Underline, List, ListOrdered, Link, Image, 
  AlignLeft, AlignCenter, AlignRight, Heading1, Heading2, Heading3,
  Quote, Code, Minus, Undo, Redo, Type
} from 'lucide-react';

const RichTextEditor = ({ value, onChange, label = 'محتوا' }) => {
  const editorRef = useRef(null);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');

  const execCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    handleChange();
  };

  const handleChange = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const insertLink = () => {
    if (linkUrl) {
      execCommand('createLink', linkUrl);
      setLinkUrl('');
      setShowLinkModal(false);
    }
  };

  const ToolButton = ({ icon: Icon, command, value, title, active }) => (
    <button
      type="button"
      onClick={() => execCommand(command, value)}
      className={`p-2 rounded-lg transition-colors ${active ? 'bg-primary-500/20 text-primary-400' : 'text-dark-400 hover:text-white hover:bg-white/5'}`}
      title={title}
    >
      <Icon className="w-4 h-4" />
    </button>
  );

  return (
    <div>
      <label className="block text-dark-300 text-sm mb-2">{label}</label>
      
      {/* Toolbar */}
      <div className="bg-dark-800 border border-white/10 rounded-t-xl p-2 flex flex-wrap gap-1">
        {/* Text Style */}
        <div className="flex items-center gap-1 border-l border-white/10 pl-2 mr-2">
          <ToolButton icon={Bold} command="bold" title="بولد (Ctrl+B)" />
          <ToolButton icon={Italic} command="italic" title="ایتالیک (Ctrl+I)" />
          <ToolButton icon={Underline} command="underline" title="زیرخط (Ctrl+U)" />
        </div>

        {/* Headings */}
        <div className="flex items-center gap-1 border-l border-white/10 pl-2 mr-2">
          <ToolButton icon={Type} command="formatBlock" value="p" title="پاراگراف" />
          <ToolButton icon={Heading1} command="formatBlock" value="h1" title="تیتر ۱" />
          <ToolButton icon={Heading2} command="formatBlock" value="h2" title="تیتر ۲" />
          <ToolButton icon={Heading3} command="formatBlock" value="h3" title="تیتر ۳" />
        </div>

        {/* Lists */}
        <div className="flex items-center gap-1 border-l border-white/10 pl-2 mr-2">
          <ToolButton icon={List} command="insertUnorderedList" title="لیست نقطه‌ای" />
          <ToolButton icon={ListOrdered} command="insertOrderedList" title="لیست شماره‌ای" />
        </div>

        {/* Alignment */}
        <div className="flex items-center gap-1 border-l border-white/10 pl-2 mr-2">
          <ToolButton icon={AlignRight} command="justifyRight" title="راست‌چین" />
          <ToolButton icon={AlignCenter} command="justifyCenter" title="وسط‌چین" />
          <ToolButton icon={AlignLeft} command="justifyLeft" title="چپ‌چین" />
        </div>

        {/* Special */}
        <div className="flex items-center gap-1 border-l border-white/10 pl-2 mr-2">
          <ToolButton icon={Quote} command="formatBlock" value="blockquote" title="نقل قول" />
          <ToolButton icon={Code} command="formatBlock" value="pre" title="کد" />
          <ToolButton icon={Minus} command="insertHorizontalRule" title="خط افقی" />
        </div>

        {/* Link */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setShowLinkModal(true)}
            className="p-2 rounded-lg text-dark-400 hover:text-white hover:bg-white/5 transition-colors"
            title="لینک"
          >
            <Link className="w-4 h-4" />
          </button>
        </div>

        {/* Undo/Redo */}
        <div className="flex items-center gap-1 mr-auto">
          <ToolButton icon={Undo} command="undo" title="برگرداندن (Ctrl+Z)" />
          <ToolButton icon={Redo} command="redo" title="انجام مجدد (Ctrl+Y)" />
        </div>
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        dir="rtl"
        className="bg-dark-800 border border-t-0 border-white/10 rounded-b-xl p-4 min-h-[300px] text-white focus:outline-none prose prose-invert max-w-none"
        onInput={handleChange}
        onBlur={handleChange}
        dangerouslySetInnerHTML={{ __html: value }}
        style={{
          direction: 'rtl',
          textAlign: 'right',
        }}
      />

      {/* Link Modal */}
      {showLinkModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/80 backdrop-blur-sm">
          <div className="bg-dark-900 border border-white/10 rounded-2xl p-6 w-full max-w-md">
            <h3 className="text-lg font-bold text-white mb-4">افزودن لینک</h3>
            <input
              type="url"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              placeholder="https://example.com"
              className="w-full bg-dark-800 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary-500 mb-4"
            />
            <div className="flex gap-3">
              <button
                type="button"
                onClick={insertLink}
                className="flex-1 py-2 rounded-xl bg-primary-500 text-white font-medium hover:bg-primary-600 transition-colors"
              >
                افزودن
              </button>
              <button
                type="button"
                onClick={() => setShowLinkModal(false)}
                className="px-4 py-2 rounded-xl bg-white/5 text-white hover:bg-white/10 transition-colors"
              >
                انصراف
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RichTextEditor;
