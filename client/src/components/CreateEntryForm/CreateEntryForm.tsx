import React, { useState } from 'react';
import './CreateEntryForm.scss';
import { RichTextEditor } from '@mantine/rte';
import { TextInput, MultiSelect } from '@mantine/core';

interface Incoming {
  setOpened: Function;
}

function CreateEntryForm(props: Incoming) {
  const [richTextValue, setRichTextValue] = useState('');
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  const data = [
    { value: 'bug', label: 'Bug' },
    { value: 'waiting', label: 'Waiting for Support' },
    { value: 'not-assigned', label: 'Not assigned' },
    { value: 'done', label: 'Done' },
    { value: 'important', label: 'Important' },
    { value: 'assigned', label: 'Assigned' },
  ];

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setTitle('');
    setRichTextValue('');
    setTags([]);

    console.log(title);
    console.log(richTextValue);
    console.log(tags);

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
        <label>Title</label>
        <TextInput
          required
          value={title}
          onChange={(event) => setTitle(event.currentTarget.value)}
        />
        <label>Text</label>
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
        <label>Tags</label>
        <MultiSelect clearable value={tags} onChange={setTags} data={data} />
        <button className="create-entry-form-submit">Submit</button>
      </form>
    </div>
  );
}

export default CreateEntryForm;
