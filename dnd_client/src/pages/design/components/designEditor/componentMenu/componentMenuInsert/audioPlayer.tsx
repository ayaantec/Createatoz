import React from 'react';
import { toast } from 'react-toastify';
import { AssetsSvg } from '../../../../../../assets';
import { TypeAudioData } from '../../../../../../models/audio';
import { FabricStateContext } from '../../../../designPage';

type Props = {
  audio: TypeAudioData;
  onSelect?: () => void;
}

type ComponentState = {
  playInLoop?: boolean;
  isPlaying?: boolean;
  showDetails?: boolean;
}

type ComponentActions = { type: 'isPlaying', payload: boolean }
  | { type: 'playInLoop', payload: boolean }
  | { type: 'toggleShowDetails' }
  ;

type ComponentReducerType = React.Reducer<ComponentState, ComponentActions>;

const ComponentReducer: ComponentReducerType = (state, action) => {
  switch (action.type) {
    case 'playInLoop': return { ...state, playInLoop: action.payload };
    case 'isPlaying': return { ...state, isPlaying: action.payload };
    case 'toggleShowDetails': return { ...state, showDetails: !state.showDetails, playInLoop: false };
    default: return state;
  }
}

function GetAudioDuration(duration?: number): string {
  if (!duration) return '0:00';
  const _duration = Math.round(duration);
  return `${Math.round(_duration / 60)}:${_duration % 60}`;
}

export function AudioPlayer(props: Props): JSX.Element {
  const ref = React.useRef<HTMLAudioElement>(null);
  const [, render] = React.useReducer(s => s + 1, 0);
  const [state, stateDispatch] = React.useReducer<ComponentReducerType>(
    ComponentReducer,
    {},
  );
  const fabricState = React.useContext(FabricStateContext);

  const PlayerIcon = state.isPlaying ? AssetsSvg.PauseCircleFilled : AssetsSvg.PlayCircleFilled;
  const PlayerIconClick = (ev: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    ev.stopPropagation();
    ev.preventDefault();
    if (state.isPlaying) {
      if (ref.current) {
        ref.current.pause();
        ref.current.currentTime = 0;
      }
      stateDispatch({ type: 'isPlaying', payload: false });
    } else {
      ref.current?.play();
      stateDispatch({ type: 'isPlaying', payload: true });
    }
  };

  return (
    <div className="mt-1 other--single-itme px-3 py-1">
      <div className={`cur-point p-1 d-flex align-items-center${state.showDetails ? ' bg-Gray' : ''}`} onClick={() => stateDispatch({ type: 'toggleShowDetails' })}>
        <PlayerIcon className="mr-2 audio-play-btn" onClick={PlayerIconClick} />
        <b className="flex-grow-1"> {props.audio.displayName} </b>
        <div className="d-flex align-items-center pr-1">
          <AssetsSvg.WatchLater className="mr-1" />
          {GetAudioDuration(ref.current?.duration)}
        </div>
      </div>
      {state.showDetails && (
        <div className="d-flex flex-column">
          <div className="d-flex align-items-center py-2">
            <input
              className="mr-2"
              id="audioSelectionMenuLoop"
              type="checkbox"
              checked={state.playInLoop} onChange={ev => stateDispatch({ type: 'playInLoop', payload: ev.target.checked })}
            />
            <label className="mb-0 cur-point" htmlFor="audioSelectionMenuLoop">Play In Loop</label>
          </div>
          {/* eslint-disable-next-line */}
          <a
            className="site-primary-btn px-3 py-2 text-center"
            href="javascript:void(0)"
            onClick={() => {
              toast.success('Audio added');
              fabricState.SetAudio(props.audio.id, !!state.playInLoop);
              stateDispatch({ type: 'toggleShowDetails' });
            }}>
            Set Audio
          </a>
        </div>
      )}
      <audio ref={ref} onLoadedMetadata={() => render()}>
        <source src={props.audio.audioUrl} />
      </audio>
    </div>
  )
}