import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';
import conf from '../../conf.js';

export default function RTE({ name, control, label, defaultValue = "" }) {
  const [useSimpleEditor, setUseSimpleEditor] = useState(false);

  return (
    <div className='w-full mb-4'>
      <div className="flex justify-between items-center mb-1 pl-1">
        {label && <label className='inline-block font-medium'>{label}</label>}
        <button
          type="button"
          onClick={() => setUseSimpleEditor(!useSimpleEditor)}
          className="text-xs text-blue-600 hover:underline cursor-pointer"
        >
          {useSimpleEditor ? "Switch to Rich Text Editor" : "Switch to Simple Editor"}
        </button>
      </div>

      <Controller
        name={name || "content"}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { onChange, value } }) => (
          useSimpleEditor ? (
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 min-h-[300px] bg-white text-black font-sans"
              placeholder="Write your post content here..."
              value={value ?? defaultValue}
              onChange={onChange}
            />
          ) : (
            <Editor
              apiKey={conf.tinymceApiKey || undefined}
              initialValue={defaultValue}
              value={value}
              init={{
                height: 500,
                menubar: true,
                plugins: [
                  "image",
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "charmap",
                  "preview",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "help",
                  "wordcount",
                ],
                toolbar:
                  "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
                content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
              }}
              onEditorChange={onChange}
            />
          )
        )}
      />
    </div>
  );
}
