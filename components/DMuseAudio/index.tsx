'use client'
import { useReducer, useContext, createContext, ReactNode, Dispatch, useRef, useEffect, useState, SetStateAction } from "react";
import Image from "next/image";
import styles from "./DMuseAudio.module.css";
import { default as Play } from "@/public/play.svg";
import { default as VolumeUp } from "@/public/volume-up.svg";
import { SongItem } from "@/data/songs";
// import { default as VolumeDown } from "@/public/volume-down.svg";
// import { default as VolumeMute } from "@/public/volume-mute.svg";
// import { default as VolumeOff } from "@/public/volume-off.svg";




export default function DMuseAudio() {
  const { playingRelease, playing, controls } = useDMuseAudio();
  const dispatch = useDispatchDMuseAudio() as Dispatch<ReducerActionProps>;
  const audioRef = useRef(controls);
  const intervalRef: { current: NodeJS.Timeout | null } = useRef(null);
  const isReady = useRef(false);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);


  const currentPercentage = duration
    ? `${(progress / duration) * 100}%`
    : "0%";

  const trackStyling = `
    -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #fff), color-stop(${currentPercentage}, #777))
  `;

  const handlePause = () => {
    dispatch({
      type: 'PAUSE'
    })
  }

  const startTimer = () => {
    // Clear any timers already running
    clearInterval(intervalRef.current as NodeJS.Timeout);

    intervalRef.current = setInterval(() => {
      if (audioRef.current?.ended) {
        // handlePause();
      } else {
        setProgress(audioRef.current?.currentTime ?? 0);
      }
    }, 1000);
  };

  const onScrub = (value: string | undefined | number) => {
    // Clear any timers already running
    clearInterval(intervalRef.current as NodeJS.Timeout);
    audioRef.current!.currentTime = value as number ?? 0;
    setProgress(audioRef.current?.currentTime ?? 0)
  };

  const onScrubEnd = () => {
    // If not already playing, start
    if (!playing) {
      // setIsPlaying(true);
    }
    startTimer();
  };

  useEffect(() => {
    audioRef.current?.pause();
    setDuration(0);
    audioRef.current = controls
    setProgress(audioRef.current?.currentTime?? 0)
    if (isReady.current) {
      audioRef.current?.play();
      audioRef.current?.addEventListener('loadedmetadata', () => {
        setDuration(audioRef.current?.duration ?? 0)
      })
      startTimer();
    } else {
      // Set the isReady ref as true for the next pass
      isReady.current = true;
    }
  }, [controls]);

  useEffect(() => {
    if (playing) {
      audioRef.current?.play();
      startTimer();
    } else {
      audioRef.current?.pause();
    }
  }, [playing]);

  useEffect(() => {
    // Pause and clean up on unmount
    return () => {
      audioRef.current?.pause();
      clearInterval(intervalRef.current as NodeJS.Timeout);
    };
  }, []);

  if (!playingRelease) {
    return <></>
  }

  return (
    <div className={styles.dmuse_audio}>
      <div className={styles.dmuse_audio_container}>
        <div>
          <div className={`${styles.dmuse_audio_wrapper}`}>
            <div className={styles.dmuse_audio_grid}>
              <div className={styles.dmuse_audio_controls}>
                <div className={styles.dmuse_audio_controls_container}>
                  <button className={styles.dmuse_audio_controls_button}>
                    <Image width={40} height={40} src='/skip-previous.svg' alt='previous'/>
                  </button>
                  <button className={styles.dmuse_audio_controls_button} onClick={handlePause}>
                    {
                      playing ?
                        <Image width={40} height={40} src='/pause.svg' alt='pause'/>
                      : <Image width={40} height={40} src='/play-button.svg' alt='play'/>
                    }
                  </button>
                  <button className={styles.dmuse_audio_controls_button}>
                    <Image width={40} height={40} src='/skip-next.svg' alt='pause'/>
                  </button>
                </div>
              </div>
              <div className={styles.dmuse_audio_state_bar}>
                <span
                  className={styles.dmuse_audio_state_bar_text}
                  style={{ paddingRight: "0.75rem" }}
                >
                  {timeFormat(progress)}
                </span>
                <input
                  type="range"
                  value={progress}
                  step="1"
                  min="0"
                  max={audioRef.current?.duration ? audioRef.current.duration : `${audioRef.current?.duration}`}
                  className={styles.dmuse_audio_state_bar_progress}
                  style={{background: trackStyling}}
                  onChange={(e) => onScrub(e.target.value)}
                  onMouseUp={onScrubEnd}
                  onKeyUp={onScrubEnd}
                />
                <span
                  className={styles.dmuse_audio_state_bar_text}
                  style={{ paddingLeft: "0.75rem" }}
                >
                  {timeFormat(duration)}
                </span>
              </div>
              <div className={styles.dmuse_audio_volume}>
                <div className={styles.dmuse_audio_volume_icon}>
                  <Image width={40} height={40} src='/volume-up.svg' alt='pause'/>
                  {/* <VolumeDown />
                  <VolumeMute />
                  <VolumeOff /> */}
                </div>
                <div className={styles.dmuse_audio_volume_modal}>
                  <input
                    className={styles.dmuse_audio_volume_modal_input}
                    type="range"
                  />
                </div>
              </div>
              <div className={styles.dmuse_audio_info}>
                <div className={styles.dmuse_audio_info_image_wrapper}>
                  <Image
                    src={playingRelease?.image as string}
                    width={42}
                    height={42}
                    alt="song name"
                  />
                </div>
                <div className={styles.dmuse_audio_info_desc_wrapper}>
                  <a href="uppercase">{playingRelease.artist}</a>
                  <h1 className={styles.dmuse_audio_info_desc_song_name}>
                    <a href="">{playingRelease?.name}</a>
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface Payload {
  playingRelease?: Release
  buyReleaseId?: string
}

export interface ReducerActionProps {
  type: any;
  payload?: Payload;
}

interface Release extends SongItem {
  id: number
  name: string
  artist: string,
  image: string
  price: number,
  tokens_qty: number,
  track: string
}

interface ReducerState {
  playingRelease: Release | undefined
  playingList: Release[]
  releases: Release[]
  playing: boolean
  controls: HTMLAudioElement | undefined
}

const intialState: ReducerState = {
  playingList: [],
  playingRelease: undefined,
  releases: [],
  playing: false,
  controls: undefined
}


const DMuseAudioStateContext = createContext(intialState);
const DMuseAudioDispatchContext = createContext({});

const reducer = (state: ReducerState, action: ReducerActionProps) => {
  switch (action.type) {
    case "SKIP_PREV":
      return state;
    case "PLAY":
      let controls = new Audio(action.payload?.playingRelease?.track)
      controls.preload = "metadata"
      return {
        ...state,
        playingRelease: action.payload?.playingRelease,
        playing: true,
        controls
      };
    case "BUY":
      return state;
    case "PLB":
      return state;
    case "PAUSE":
      return {...state, playing: !state.playing};
    case "SKIP_NEXT":
      return state;
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

interface DMuseAudioProviderProps {
  children: ReactNode;
}

export const DMuseAudioProvider = ({
  children,
}: DMuseAudioProviderProps): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, intialState);
  return (
    <DMuseAudioDispatchContext.Provider value={dispatch}>
      <DMuseAudioStateContext.Provider value={state}>
        {children}
      </DMuseAudioStateContext.Provider>
    </DMuseAudioDispatchContext.Provider>
  );
};

export const useDMuseAudio = () => useContext(DMuseAudioStateContext);
export const useDispatchDMuseAudio = () =>
  useContext(DMuseAudioDispatchContext);


function timeFormat(duration: number) {
  // Hours, minutes and seconds
  var hrs = ~~(duration / 3600);
  var mins = ~~((duration % 3600) / 60);
  var secs = ~~duration % 60;

  // Output like "1:01" or "4:03:59" or "123:03:59"
  var ret = "";

  if (hrs > 0) {
    ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
  }

  ret += "" + mins + ":" + (secs < 10 ? "0" : "");
  ret += "" + secs;
  return ret;
}