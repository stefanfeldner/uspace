import React, { useState } from 'react';
import './CreateEntryForm.scss';
import { RichTextEditor } from '@mantine/rte';
import { TextInput, MultiSelect } from '@mantine/core';
import DOMPurify from 'dompurify';
import { CreatePostType, PostType } from '../../interfaces/Interfaces';

interface Incoming {
  setOpened: Function;
  space_id?: number;
  user_id?: number;
  setPosts: Function;
}

function CreateEntryForm(props: Incoming) {
  const URL = process.env.REACT_APP_API + '/posts';
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

  const tagsArrToStr = (tags: string[]) => {
    let tagsString: string = '';
    tags.forEach((tag: string) => {
      tagsString += tag + ',';
    });
    return tagsString;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    // console.log(title);
    // console.log(richTextValue);
    // console.log(selectedTags);

    if (props.user_id && props.space_id) {
      const postData = {
        title: DOMPurify.sanitize(title),
        content: DOMPurify.sanitize(richTextValue),
        created_at: new Date(),
        tags: DOMPurify.sanitize(tagsArrToStr(selectedTags)),
        user_id: props.user_id,
        space_id: props.space_id,
        Comment: [],
      };
      createPost(postData);
    }
    props.setOpened(false);
  };

  const createPost = async (data: CreatePostType) => {
    const res = await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const post = await res.json();
    // add comment property to post obj to prevent undefined objects
    post.Comment = [];


    props.setPosts((prevState: PostType[]) => {
      // sort posts before adding new one
      prevState.sort((a, b) => {
        return (
          new Date(b.created_at).valueOf() - new Date(a.created_at).valueOf()
        );
      });
      return [post, ...prevState];
    });
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
        <button className="create-entry-form-submit">Create</button>
      </form>
    </div>
  );
}

export default CreateEntryForm;
