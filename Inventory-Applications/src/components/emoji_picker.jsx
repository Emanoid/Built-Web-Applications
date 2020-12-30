import React, { useState } from 'react';
import Picker, { SKIN_TONE_MEDIUM_DARK } from 'emoji-picker-react';
import {Link} from 'react-router-dom'

export default class Emoji extends React.Component {

  render() { 
    return ( 
        <App />
     );
  }
}
 
  const App = () => {
    const [chosenEmoji, setChosenEmoji] = useState(null);

    const onEmojiClick = (event, emojiObject) => {
        setChosenEmoji(emojiObject);
    }

    return (
      <>
        <h1 style={{textAlign: 'center'}}>Demo emoji picker</h1>
        <Link to='/'>Home</Link>
        <div style={{textAlign: 'center',marginLeft:'10px'}}>
            <Picker  onEmojiClick={onEmojiClick} skinTone={SKIN_TONE_MEDIUM_DARK}/>
            { chosenEmoji && <EmojiData chosenEmoji={chosenEmoji}/>}
        </div>
      </>
    );
};
//{ chosenEmoji && <EmojiData chosenEmoji={chosenEmoji}/>}
const EmojiData = ({chosenEmoji}) => (
  <div style={{textAlign: 'center',marginRight: '820px'}}>
    <br></br>
    <br></br>
    <hr></hr>
    <strong>Names:</strong> {chosenEmoji.names.join(', ')}<br/>
    <strong>Symbol:</strong> {chosenEmoji.emoji}<br/>
  </div>
);
