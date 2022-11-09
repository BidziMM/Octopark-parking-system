import { useState, useEffect, forwardRef, useImperativeHandle, useRef } from "react";
import TimeColumn from "./atom/timeColumn";
import { createUseStyles } from "react-jss";


type TimeitProps = {
  onChange?: (value: string) => any;
  defaultValue?: string;
  minuteExclude?: Array<number>;
  hourExclude?: Array<number>;
  notShowExclude?: boolean;
  ref?:React.RefObject<HTMLElement>
};

const useStyles = createUseStyles(
  {
    wrapper: {
      display: "flex",
      direction: "ltr",
      "&>*": {
        margin: "0 5px",
      },
      "&>:last-child": {
        marginRight: "0",
      },
      "&>:first-child": {
        marginLeft: "0",
      },
    },
  },
  {
    name: "timeit",
  }
);

const Timeit = forwardRef(({
  onChange,
  defaultValue,
  minuteExclude,
  hourExclude,
  notShowExclude,
}: TimeitProps, ref) => {
  const classes = useStyles();
  const TimerRef = useRef()
  const defVal = defaultValue ? defaultValue.split(":") : '';
  const [hour, setHour] = useState(defaultValue ? defVal[0] : "00");
  const [minute, setMinute] = useState(defaultValue ? defVal[1] : "00");
  console.log(defVal)
  useEffect(() => {
    onChange && onChange(`${hour}:${minute}`);
  }, [hour, minute]);

  useImperativeHandle(ref, () => ({
    addHour
  }));

  const addHour = (v:number) =>{
      TimerRef?.current?.addH(v)
  }

  // useEffect(() => {
  //   if(value){
  //     const v = value.split(":");
  //     setHour(v[0])
  //     setMinute(v[1])
  //   }
  // }, [value])

  return (
    <div className={classes.wrapper}>
      <TimeColumn
        notShowExclude={notShowExclude}
        start={0}
        end={23}
        value={hour}
        setValue={setHour}
        exclude={hourExclude}
        ref={TimerRef}
      />
      <TimeColumn
        notShowExclude={notShowExclude}
        start={0}
        end={59}
        value={minute}
        setValue={setMinute}
        exclude={minuteExclude}
      />
    </div>
  );
});

export default Timeit;
