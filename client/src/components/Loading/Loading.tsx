import { Loader } from '@mantine/core';
import './Loading.scss';

const Loading = () => {
  return (
    <div className='loading-wrapper'>
      <Loader variant="bars" color="#8dab88" />
    </div>
  );
}

export default Loading;