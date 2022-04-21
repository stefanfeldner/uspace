import React, { useState } from 'react';
import './CreateEntryForm.scss';
import { RichTextEditor } from '@mantine/rte';
import { TextInput, MultiSelect } from '@mantine/core';
import DOMPurify from 'dompurify';

interface Incoming {
  setOpened: Function;
}

function CreateEntryForm(props: Incoming) {
  const [richTextValue, setRichTextValue] = useState('');
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState<string[]>([
    'Travel',
    'News',
    'Bug',
    'Important',
    'Diary',
    'Notes',
  ]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    // setTitle('');
    // setRichTextValue('');
    // setTags([]);
    // setSelectedTags([]);

    console.log(title);
    console.log(richTextValue);
    console.log(selectedTags);

    // post_id?,
    // created_at?,
    // user?,

    // title,
    // content,
    // tags,

    props.setOpened(false);
  };

  // TODO: Fix Rich Text Editor Bugs
  return (
    <div className="create-entry-form">
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <TextInput
          required
          value={title}
          onChange={(event) => setTitle(event.currentTarget.value)}
        />
        <label>Text:</label>
        <RichTextEditor
          value={richTextValue}
          onChange={setRichTextValue}
          controls={[
            ['bold', 'italic', 'underline', 'link' /*, 'image'*/],
            ['unorderedList', 'h1', 'h2', 'h3'],
            ['sup', 'sub'],
            ['alignLeft', 'alignCenter', 'alignRight'],
          ]}
        />
        <label>Select tags or create your own:</label>
        <MultiSelect
          data={tags}
          searchable
          creatable
          onChange={setSelectedTags}
          getCreateLabel={(query) => `+ Create ${query}`}
          onCreate={(query) => setTags((current) => [...current, query])}
        />
        <button className="create-entry-form-submit">Submit</button>
      </form>
    </div>
  );
}

export default CreateEntryForm;
