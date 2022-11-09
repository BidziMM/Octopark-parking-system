import React, {useEffect, useRef} from 'react'
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
import '../CustomCss/keyboard.css'

const KeyboardMobile = ({onChange, onKeyPress, keyboardRef, layout = "default"}) => new Keyboard({
    onChange: input => onChange(input),
    onKeyPress: button => onKeyPress(button),
    keyboardRef,
    mergeDisplay: true,
    layoutName: layout,
    layout: {
      default: [
        "1 2 3 4 5 6 7 8 9 0",
        "Q W E R T Y U I O P",
        "A S D F G H J K L",
        "{shift} Z X C V B N M {backspace}",
        "{space} {ent}"
      ],
      //numbers: ["1 2 3", "4 5 6", "7 8 9", "{abc} 0 {backspace}"]
    },
    display: {
      //"{numbers}": "123",
      "{ent}": "Enter",
      "{escape}": "esc ⎋",
      "{tab}": "tab ⇥",
      "{backspace}": "⌫",
      "{capslock}": "caps lock ⇪",
      "{shift}": "⇧",
      "{controlleft}": "ctrl ⌃",
      "{controlright}": "ctrl ⌃",
      "{altleft}": "alt ⌥",
      "{altright}": "alt ⌥",
      "{metaleft}": "cmd ⌘",
      "{metaright}": "cmd ⌘",
      "{abc}": "ABC"
    }
  });

export default function KeyboardComponent({onChange, onKeyPress, value}) {
  const keyboard = useRef();
  useEffect(() => {
    keyboard.current.setInput(value)
  }, [value])
  return (
    <KeyboardMobile onChange={(i) => onChange(i)} keyboardRef={r => (keyboard.current = r)} onKeyPress={(button) => onKeyPress && onKeyPress(button)}/>
  )
}
