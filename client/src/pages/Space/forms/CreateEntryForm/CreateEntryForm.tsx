import React, {useState} from 'react';
import './CreateEntryForm.scss';
import {RichTextEditor} from '@mantine/rte';
import {MultiSelect, TextInput} from '@mantine/core';
import DOMPurify from 'dompurify';
import { PostType} from '../../../../interfaces/Interfaces';
import {getDownloadURL, ref, uploadBytes,} from 'firebase/storage';
import {storage} from '../../../../Firebase/config';
import API_POST_SERVICE from '../../../../services/apiPostService';

interface Incoming {
  setOpened: Function;
  space_id?: number;
  user_id?: number;
  setPosts: Function;
}

function CreateEntryForm(props: Incoming) {
  const [richTextValue, setRichTextValue] = useState('');
  const [title, setTitle] = useState('');
  // todo what about the tags that I created?
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

    if (props.user_id && props.space_id) {
      const postData = {
        title: DOMPurify.sanitize(title),
        content: richTextValue, // TODO: Check how to insert rich text safely without sanitizing here
        created_at: new Date(),
        tags: DOMPurify.sanitize(selectedTags.join(',')),
        user_id: props.user_id,
        space_id: props.space_id,
        Comment: [],
      };

      API_POST_SERVICE.createPost(postData)
          .then((post) => {
            // todo check with DB and models
            // add comment property to post obj to prevent undefined objects
            post.Comment = [];
            props.setPosts((prevState: PostType[]) => {
              return [post, ...prevState];
            });
          })
    }
    props.setOpened(false);
  };

  const handleImageUpload = async (file: File): Promise<string> => {
    // create a reference to the place I want to store the file
    const storageRef = ref(storage, `space${props.space_id}/${file.name}`);

    // upload the file
    await uploadBytes(storageRef, file);
    // get the download link
    // return url to the rich text editor
    return await getDownloadURL(storageRef);
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
          onImageUpload={handleImageUpload}
          controls={[
            ['bold', 'italic', 'underline', 'link', 'image', 'video'],
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
