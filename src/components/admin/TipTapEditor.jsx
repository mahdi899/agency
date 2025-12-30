import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import Placeholder from '@tiptap/extension-placeholder';
import Highlight from '@tiptap/extension-highlight';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import { useState, useCallback, useEffect } from 'react';
import { 
  Bold, Italic, Underline as UnderlineIcon, Strikethrough,
  List, ListOrdered, Link as LinkIcon, Image as ImageIcon, 
  AlignLeft, AlignCenter, AlignRight, AlignJustify,
  Heading1, Heading2, Heading3, Heading4,
  Quote, Code, Minus, Undo, Redo, Type, Highlighter,
  X, Upload, Trash2, Settings, GripVertical
} from 'lucide-react';
import api from '../../services/api';

const MenuButton = ({ onClick, isActive, disabled, children, title }) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    className={`p-2 rounded-lg transition-colors ${
      isActive 
        ? 'bg-primary-500/20 text-primary-400' 
        : disabled 
          ? 'text-dark-600 cursor-not-allowed'
          : 'text-dark-400 hover:text-white hover:bg-white/5'
    }`}
    title={title}
  >
    {children}
  </button>
);

const Divider = () => <div className="w-px h-6 bg-white/10 mx-1" />;

const ImageModal = ({ isOpen, onClose, onInsert, initialData = null }) => {
  const [imageUrl, setImageUrl] = useState(initialData?.src || '');
  const [altText, setAltText] = useState(initialData?.alt || '');
  const [title, setTitle] = useState(initialData?.title || '');
  const [caption, setCaption] = useState(initialData?.caption || '');
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setImageUrl(initialData.src || '');
      setAltText(initialData.alt || '');
      setTitle(initialData.title || '');
      setCaption(initialData.caption || '');
    }
  }, [initialData]);

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const response = await api.uploadFile(file, 'blog');
      if (response.success && response.url) {
        setImageUrl(response.url);
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('خطا در آپلود تصویر');
    } finally {
      setUploading(false);
    }
  };

  const handleInsert = () => {
    if (!imageUrl) return;
    onInsert({
      src: imageUrl,
      alt: altText,
      title: title,
      caption: caption,
    });
    onClose();
    setImageUrl('');
    setAltText('');
    setTitle('');
    setCaption('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/80 backdrop-blur-sm">
      <div className="bg-dark-900 border border-white/10 rounded-2xl p-6 w-full max-w-lg">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-white">
            {initialData ? 'ویرایش تصویر' : 'افزودن تصویر'}
          </h3>
          <button onClick={onClose} className="text-dark-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          {/* Upload Section */}
          <div>
            <label className="block text-dark-300 text-sm mb-2">آپلود تصویر</label>
            <div className="flex gap-2">
              <label className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-dark-800 border border-dashed border-white/20 cursor-pointer hover:border-primary-500 transition-colors">
                <Upload className="w-5 h-5 text-dark-400" />
                <span className="text-dark-400">
                  {uploading ? 'در حال آپلود...' : 'انتخاب فایل'}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleUpload}
                  className="hidden"
                  disabled={uploading}
                />
              </label>
            </div>
          </div>

          {/* URL Input */}
          <div>
            <label className="block text-dark-300 text-sm mb-2">آدرس تصویر (URL)</label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="w-full bg-dark-800 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary-500"
            />
          </div>

          {/* Preview */}
          {imageUrl && (
            <div className="relative rounded-xl overflow-hidden bg-dark-800 p-2">
              <img
                src={imageUrl}
                alt="Preview"
                className="w-full h-40 object-contain rounded-lg"
                onError={(e) => e.target.style.display = 'none'}
              />
            </div>
          )}

          {/* Alt Text - Important for SEO */}
          <div>
            <label className="block text-dark-300 text-sm mb-2">
              متن جایگزین (Alt Text) - مهم برای سئو
            </label>
            <input
              type="text"
              value={altText}
              onChange={(e) => setAltText(e.target.value)}
              placeholder="توضیح کوتاه تصویر برای موتورهای جستجو"
              className="w-full bg-dark-800 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary-500"
            />
            <p className="text-dark-500 text-xs mt-1">
              این متن برای کاربران نابینا و موتورهای جستجو نمایش داده می‌شود
            </p>
          </div>

          {/* Title */}
          <div>
            <label className="block text-dark-300 text-sm mb-2">عنوان تصویر (Title)</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="عنوان نمایشی هنگام هاور"
              className="w-full bg-dark-800 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary-500"
            />
          </div>

          {/* Caption */}
          <div>
            <label className="block text-dark-300 text-sm mb-2">کپشن (Caption)</label>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="توضیحات زیر تصویر"
              rows={2}
              className="w-full bg-dark-800 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary-500"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            type="button"
            onClick={handleInsert}
            disabled={!imageUrl}
            className="flex-1 py-3 rounded-xl bg-primary-500 text-white font-medium hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {initialData ? 'بروزرسانی' : 'افزودن'}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 rounded-xl bg-white/5 text-white hover:bg-white/10 transition-colors"
          >
            انصراف
          </button>
        </div>
      </div>
    </div>
  );
};

const LinkModal = ({ isOpen, onClose, onInsert, initialUrl = '' }) => {
  const [url, setUrl] = useState(initialUrl);

  useEffect(() => {
    setUrl(initialUrl);
  }, [initialUrl]);

  const handleInsert = () => {
    if (url) {
      onInsert(url);
    }
    onClose();
    setUrl('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/80 backdrop-blur-sm">
      <div className="bg-dark-900 border border-white/10 rounded-2xl p-6 w-full max-w-md">
        <h3 className="text-lg font-bold text-white mb-4">افزودن لینک</h3>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
          className="w-full bg-dark-800 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary-500 mb-4"
          autoFocus
        />
        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleInsert}
            className="flex-1 py-2 rounded-xl bg-primary-500 text-white font-medium hover:bg-primary-600 transition-colors"
          >
            افزودن
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white/5 text-white hover:bg-white/10 transition-colors"
          >
            انصراف
          </button>
        </div>
      </div>
    </div>
  );
};

const TipTapEditor = ({ value, onChange, label = 'محتوا', placeholder = 'محتوای مقاله را اینجا بنویسید...' }) => {
  const [showImageModal, setShowImageModal] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [editingImage, setEditingImage] = useState(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4],
        },
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-primary-400 hover:text-primary-300 underline',
          rel: 'noopener noreferrer',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'rounded-xl max-w-full h-auto my-4',
        },
        allowBase64: true,
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Placeholder.configure({
        placeholder,
      }),
      Highlight.configure({
        multicolor: true,
      }),
      TextStyle,
      Color,
    ],
    content: value || '',
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-invert max-w-none focus:outline-none min-h-[300px] p-4',
        dir: 'rtl',
      },
      handleDrop: (view, event, slice, moved) => {
        if (!moved && event.dataTransfer?.files?.length) {
          const file = event.dataTransfer.files[0];
          if (file.type.startsWith('image/')) {
            event.preventDefault();
            handleImageDrop(file, view, event);
            return true;
          }
        }
        return false;
      },
    },
  });

  const handleImageDrop = async (file, view, event) => {
    try {
      const response = await api.uploadFile(file, 'blog');
      if (response.success && response.url) {
        const { schema } = view.state;
        const coordinates = view.posAtCoords({ left: event.clientX, top: event.clientY });
        const node = schema.nodes.image.create({ src: response.url });
        const transaction = view.state.tr.insert(coordinates?.pos || 0, node);
        view.dispatch(transaction);
      }
    } catch (error) {
      console.error('Drop upload error:', error);
    }
  };

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || '');
    }
  }, [value, editor]);

  const insertImage = useCallback((imageData) => {
    if (editor) {
      const imgHtml = `<figure class="my-6">
        <img src="${imageData.src}" alt="${imageData.alt || ''}" title="${imageData.title || ''}" class="rounded-xl max-w-full h-auto" />
        ${imageData.caption ? `<figcaption class="text-center text-dark-400 text-sm mt-2">${imageData.caption}</figcaption>` : ''}
      </figure>`;
      editor.chain().focus().insertContent(imgHtml).run();
    }
  }, [editor]);

  const insertLink = useCallback((url) => {
    if (editor) {
      if (url) {
        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
      } else {
        editor.chain().focus().extendMarkRange('link').unsetLink().run();
      }
    }
  }, [editor]);

  if (!editor) {
    return (
      <div className="animate-pulse">
        <div className="h-10 bg-dark-800 rounded-t-xl"></div>
        <div className="h-64 bg-dark-800 rounded-b-xl mt-px"></div>
      </div>
    );
  }

  return (
    <div>
      <label className="block text-dark-300 text-sm mb-2">{label}</label>
      
      {/* Main Toolbar */}
      <div className="bg-dark-800 border border-white/10 rounded-t-xl p-2 flex flex-wrap gap-1 items-center">
        {/* Text Style */}
        <MenuButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive('bold')}
          title="بولد (Ctrl+B)"
        >
          <Bold className="w-4 h-4" />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive('italic')}
          title="ایتالیک (Ctrl+I)"
        >
          <Italic className="w-4 h-4" />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          isActive={editor.isActive('underline')}
          title="زیرخط (Ctrl+U)"
        >
          <UnderlineIcon className="w-4 h-4" />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          isActive={editor.isActive('strike')}
          title="خط‌خورده"
        >
          <Strikethrough className="w-4 h-4" />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          isActive={editor.isActive('highlight')}
          title="هایلایت"
        >
          <Highlighter className="w-4 h-4" />
        </MenuButton>

        <Divider />

        {/* Headings */}
        <MenuButton
          onClick={() => editor.chain().focus().setParagraph().run()}
          isActive={editor.isActive('paragraph')}
          title="پاراگراف"
        >
          <Type className="w-4 h-4" />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          isActive={editor.isActive('heading', { level: 1 })}
          title="تیتر ۱ (H1)"
        >
          <Heading1 className="w-4 h-4" />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          isActive={editor.isActive('heading', { level: 2 })}
          title="تیتر ۲ (H2)"
        >
          <Heading2 className="w-4 h-4" />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          isActive={editor.isActive('heading', { level: 3 })}
          title="تیتر ۳ (H3)"
        >
          <Heading3 className="w-4 h-4" />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
          isActive={editor.isActive('heading', { level: 4 })}
          title="تیتر ۴ (H4)"
        >
          <Heading4 className="w-4 h-4" />
        </MenuButton>

        <Divider />

        {/* Lists */}
        <MenuButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive('bulletList')}
          title="لیست نقطه‌ای"
        >
          <List className="w-4 h-4" />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive('orderedList')}
          title="لیست شماره‌ای"
        >
          <ListOrdered className="w-4 h-4" />
        </MenuButton>

        <Divider />

        {/* Alignment */}
        <MenuButton
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          isActive={editor.isActive({ textAlign: 'right' })}
          title="راست‌چین"
        >
          <AlignRight className="w-4 h-4" />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          isActive={editor.isActive({ textAlign: 'center' })}
          title="وسط‌چین"
        >
          <AlignCenter className="w-4 h-4" />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          isActive={editor.isActive({ textAlign: 'left' })}
          title="چپ‌چین"
        >
          <AlignLeft className="w-4 h-4" />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().setTextAlign('justify').run()}
          isActive={editor.isActive({ textAlign: 'justify' })}
          title="تراز دوطرفه"
        >
          <AlignJustify className="w-4 h-4" />
        </MenuButton>

        <Divider />

        {/* Special Blocks */}
        <MenuButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          isActive={editor.isActive('blockquote')}
          title="نقل قول"
        >
          <Quote className="w-4 h-4" />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          isActive={editor.isActive('codeBlock')}
          title="بلاک کد"
        >
          <Code className="w-4 h-4" />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          title="خط افقی"
        >
          <Minus className="w-4 h-4" />
        </MenuButton>

        <Divider />

        {/* Link & Image */}
        <MenuButton
          onClick={() => setShowLinkModal(true)}
          isActive={editor.isActive('link')}
          title="لینک"
        >
          <LinkIcon className="w-4 h-4" />
        </MenuButton>
        <MenuButton
          onClick={() => setShowImageModal(true)}
          title="تصویر"
        >
          <ImageIcon className="w-4 h-4" />
        </MenuButton>

        {/* Undo/Redo */}
        <div className="mr-auto flex items-center gap-1">
          <MenuButton
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            title="برگرداندن (Ctrl+Z)"
          >
            <Undo className="w-4 h-4" />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            title="انجام مجدد (Ctrl+Y)"
          >
            <Redo className="w-4 h-4" />
          </MenuButton>
        </div>
      </div>

      {/* Bubble Menu for selected text */}
      {editor && (
        <BubbleMenu
          editor={editor}
          tippyOptions={{ duration: 100 }}
          className="bg-dark-800 border border-white/10 rounded-xl p-1 flex items-center gap-1 shadow-xl"
        >
          <MenuButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            isActive={editor.isActive('bold')}
          >
            <Bold className="w-4 h-4" />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            isActive={editor.isActive('italic')}
          >
            <Italic className="w-4 h-4" />
          </MenuButton>
          <MenuButton
            onClick={() => setShowLinkModal(true)}
            isActive={editor.isActive('link')}
          >
            <LinkIcon className="w-4 h-4" />
          </MenuButton>
        </BubbleMenu>
      )}

      {/* Editor Content */}
      <div className="bg-dark-800 border border-t-0 border-white/10 rounded-b-xl overflow-hidden">
        <EditorContent 
          editor={editor} 
          className="min-h-[300px] text-white [&_.ProseMirror]:min-h-[300px] [&_.ProseMirror]:outline-none [&_.ProseMirror_p.is-editor-empty:first-child::before]:content-[attr(data-placeholder)] [&_.ProseMirror_p.is-editor-empty:first-child::before]:text-dark-500 [&_.ProseMirror_p.is-editor-empty:first-child::before]:float-right [&_.ProseMirror_p.is-editor-empty:first-child::before]:pointer-events-none [&_.ProseMirror_p.is-editor-empty:first-child::before]:h-0"
        />
      </div>

      {/* Word Count */}
      <div className="flex items-center justify-between mt-2 text-dark-500 text-xs">
        <span>
          {editor.storage.characterCount?.characters?.() || editor.getText().length} کاراکتر
        </span>
        <span>
          تقریباً {Math.ceil((editor.getText().split(/\s+/).filter(Boolean).length) / 200)} دقیقه مطالعه
        </span>
      </div>

      {/* Modals */}
      <ImageModal
        isOpen={showImageModal}
        onClose={() => {
          setShowImageModal(false);
          setEditingImage(null);
        }}
        onInsert={insertImage}
        initialData={editingImage}
      />

      <LinkModal
        isOpen={showLinkModal}
        onClose={() => setShowLinkModal(false)}
        onInsert={insertLink}
        initialUrl={editor.isActive('link') ? editor.getAttributes('link').href : ''}
      />
    </div>
  );
};

export default TipTapEditor;
