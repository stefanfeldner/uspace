import React, { useState } from 'react';
import '../CreateEntryForm/CreateEntryForm.scss';
import { TextInput, Textarea } from '@mantine/core';
import DOMPurify from 'dompurify';
import SpaceWithCreatorType, {
  SpaceDataType,
} from '../../interfaces/Interfaces';
import { useAuth0 } from '@auth0/auth0-react';
import API_SERVICE from '../../Api-Service';
import _ from 'lodash';
import { useNavigate } from 'react-router';

interface Incoming {
  setOpened: Function;
  allSpaces: SpaceWithCreatorType[];
  setAllSpaces: Function;
}

function CreateSpaceForm(props: Incoming) {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const { user } = useAuth0();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const spaceData = {
      name: DOMPurify.sanitize(name),
      description: DOMPurify.sanitize(description),
    };

    // create new space
    const newSpace: SpaceDataType = await API_SERVICE.createSpace(spaceData);

    // check if user exists
    if (user) {
      // fetch user from db to get id
      const foundUser = await API_SERVICE.findUserBySub(user.sub!);
      // create a m-m relationship using the user id, space id and 2 for creator
      await API_SERVICE.createUserSpaceRole(foundUser.id, newSpace.id, 2);
      // add new userSpaceRole array and input new user
      newSpace.User_Space_Role = [
        {
          user: {
            email: foundUser.email,
            username: foundUser.username,
            picture_url: foundUser.picture_url,
          },
        },
      ];

      // overwrite posts state with the cloned posts incl. the new comment
      props.setAllSpaces(cloneSpacesAndAddNewSpace(props.allSpaces, newSpace));

      // direct to new space
      navigate(`/spaces/${newSpace.id}`); //TODO: add this back
    }

    // hide modal
    props.setOpened(false);
  };

  // deep clone given space and add new space
  const cloneSpacesAndAddNewSpace = (
    spaces: SpaceWithCreatorType[],
    newSpace: SpaceDataType
  ) => {
    // deep clone given spaces
    const clonedSpaces = _.cloneDeep(spaces);
    // push space to cloned spaces
    clonedSpaces.push(newSpace);
    return clonedSpaces;
  };

  return (
    <div className="create-entry-form">
      <form onSubmit={handleSubmit}>
        <label>Space name:</label>
        <TextInput
          required
          value={name}
          onChange={(event) => setName(event.currentTarget.value)}
        />
        <label>Description:</label>
        <Textarea
          required
          value={description}
          onChange={(event) => setDescription(event.currentTarget.value)}
        />
        <button className="create-entry-form-submit">Create</button>
      </form>
    </div>
  );
}

export default CreateSpaceForm;
