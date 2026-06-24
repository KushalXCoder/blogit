"use client";

import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/shadcn";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/shadcn/style.css";
import "@/app/globals.css";
import { BlogStore } from "@/store/blog.store";
import { Block } from "@blocknote/core";
import { useRef } from "react";

const Editor = () => {
  const editor = useCreateBlockNote();
  const { setDetails } = BlogStore();

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const countWords = (blocks: Block[]) => {
    let total = 0;

    for (const block of blocks) {
      const content = block.content;

      // Check if the content is an array
      if (!Array.isArray(content)) continue;

      for (const item of content) {
        // Check if the type is text, cause then only words can be counted
        if (item.type !== "text") continue;

        // Apply necessary operations and count words
        total += item.text
          .trim() // trim spaces from both ends
          .split(/\s+/) // split by one or more spaces
          .filter(Boolean).length; // filter out empty strings as they are boolean
      }
    }

    // Update the store
    // Total words divided by 200 wpm reading speed
    setDetails({ words: total, readingTime: Math.ceil(total / 200) });
  };

  const handleChange = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      // Set the content and store
      const content = editor.blocksToMarkdownLossy(editor.document);
      setDetails({ content });

      // Count the words in the editor and update the store
      countWords(editor.document);
    }, 300);
  };

  return (
    <div className="flex-1 h-full bn-blog-editor pt-2 pb-3 px-8 sm:px-10 z-0">
      <BlockNoteView editor={editor} theme="light" onChange={handleChange} />
    </div>
  );
};

export default Editor;
