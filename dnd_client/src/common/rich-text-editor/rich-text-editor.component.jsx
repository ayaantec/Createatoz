import React, { useState, useRef, useEffect } from "react";
import {
  EditorState,
  convertToRaw,
  convertFromHTML,
  ContentState,
} from "draft-js";
import Editor from "draft-js-plugins-editor";
import createMentionPlugin from "draft-js-mention-plugin";
import "draft-js/dist/Draft.css";
import "draft-js-mention-plugin/lib/plugin.css";
import "draft-js-static-toolbar-plugin/lib/plugin.css";
import "./rich-text-editor.styles.scss";

import {
  ItalicButton,
  BoldButton,
  UnorderedListButton,
  OrderedListButton,
  HeadlineOneButton,
  HeadlineTwoButton,
  HeadlineThreeButton,
} from "draft-js-buttons";
import createToolbarPlugin from "draft-js-static-toolbar-plugin";
import draftToHtml from "draftjs-to-html";
import {
  decodeHtml,
  removeFirstThreeCharFromString,
  removeLastFourCharFromString,
  removeLineBreakFromEndOfString,
} from "../constants";

// Draft-JS-Toolbar plugin configuration
const toolbarPlugin = createToolbarPlugin();
const { Toolbar } = toolbarPlugin;

const CustomMentionObjectConfig = ({ mention: { text }, children }) => {
  return (
    <React.Fragment>
      <span
        dangerouslySetInnerHTML={{
          __html: text,
        }}
      ></span>
      <span style={{ display: "none" }}>{children}</span>
    </React.Fragment>
  );
};




// Draft-JS-Mentions plugin configuration
const mentionPlugin = createMentionPlugin({
  mentionTrigger: "#",
  mentionComponent: CustomMentionObjectConfig,
});

const { MentionSuggestions } = mentionPlugin;

const plugins = [mentionPlugin, toolbarPlugin];

const getHtml = (editorState) => {
  const html = draftToHtml(convertToRaw(editorState.getCurrentContent()));
  const line = html.split(/\r\n|\r|\n/).length;
  let data = decodeHtml(html);
  data = removeLineBreakFromEndOfString(data);
  if(line && line <= 2) {
    data = removeFirstThreeCharFromString(data);
    data = removeLastFourCharFromString(data);
  }
  return data;
};

const djEditor = (value) => {
  if (value && value !== "") {
    return EditorState.createWithContent(
      ContentState.createFromBlockArray(convertFromHTML(value))
    );
  }
  return EditorState.createEmpty();
};

const RichTextEditor = (props) => {
  const { placeholder, getValue, value, reset=false } = props;

  // Draft-JS editor configuration
  const [editorState, setEditorState] = useState(djEditor(value));

  // Draft-JS mention configuration
  const [suggestions, setSuggestions] = useState([]);

  const editor = useRef(null);

  const handelChange = (state) => {
    setEditorState(state);
    getValue(getHtml(editorState));
    // console.log("in rich  ",editorState)
  };

  // Check editor text for mentions
  const onSearchChange = async ({ value }) => {
    if (value) {
      const suggestionValue = await getSuggestion(value);
      console.log("suggestion", suggestionValue);
      setSuggestions(suggestionValue);
    } else {
      setSuggestions([]);
    }
  };

  const onAddMention = (mention) => {
    mention.name = mention.text;
  };

  const focusEditor = () => {
    editor.current.focus();
  };



  const getSuggestion = async (name) => {
    // return await GetSnippetByName(name)
    //   .then((response) => {
    //     const snippetsData = response.data.data;
    //     return snippetsData;
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     return [];
    //   });
  };

  useEffect(() => {
    if(reset) {
      setEditorState(djEditor(value))
    }
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reset]);

  return (
    <div onClick={() => focusEditor()} className="editor">
      <Editor
        ref={editor}
        editorState={editorState}
        plugins={plugins}
        onChange={handelChange}
        placeholder={placeholder}
        {...props}
      />
      <MentionSuggestions
        onSearchChange={onSearchChange}
        suggestions={suggestions}
        onAddMention={onAddMention}
      />
      <Toolbar>
        {(externalProps) => (
          <React.Fragment>
            <BoldButton {...externalProps} />
            <ItalicButton {...externalProps} />
            {/*<UnderlineButton {...externalProps} />*/}
            <UnorderedListButton {...externalProps} />
            <OrderedListButton {...externalProps} />
            {/*<BlockquoteButton {...externalProps} />*/}
            {/* <HeadlineOneButton {...externalProps} />
            <HeadlineTwoButton {...externalProps} />
            <HeadlineThreeButton {...externalProps} /> */}
          </React.Fragment>
        )}
      </Toolbar>
    </div>
  );
};

export default RichTextEditor;
