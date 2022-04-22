import './Welcome.scss';
import placeholderSpaces from '../../assets/img/placeholder-spaces.png';
import placeholderNotes from '../../assets/img/placeholder-notes.png';
import placeholderPost from '../../assets/img/placeholder-post.png';
import LoginButton from '../LoginButton/LoginButton';
import SignupButton from '../SignupButton/SignupButton';

function Welcome() {
  return (
    <div className="welcome">
      <div className="container">
        <div className="welcome-heading">
          <div className="welcome-heading-left">
            <h1>
              Share updates, notes, or memories and stay connected to the world!
            </h1>
            <p>
              Sign up now and create your first space or join others and catch
              up on what they are posting!
            </p>
            <LoginButton />
            <SignupButton />
          </div>
          <div className="welcome-heading-right">
            <img src={placeholderSpaces} alt="uspace Spaces" />
          </div>
        </div>
        <div className="welcome-content">
          <div className="welcome-content-wrapper">
            <div className="welcome-content-info-left">
              <img src={placeholderNotes} alt="uspace Notes" />
            </div>
            <div className="welcome-content-info-right">
              <div className="welcome-content-spaces">
                <div className="title-left">What are</div>
                <div className="title-right">Spaces?</div>
              </div>
              <div className="welcome-content-info">
                Spaces are your creative outlet! Your place to share what you
                want the world to see! You can share updates on your latest
                trip, save notes for yourself and your colleagues, present what
                you cooked that day, and more. It's up to your imagination.
                Create your space now and share it with your friends and family!
                <br />
                <br />
                You're a company and want to share the newest development of
                your product or communicate changes? uspace helps you convey
                your message to your customers.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
