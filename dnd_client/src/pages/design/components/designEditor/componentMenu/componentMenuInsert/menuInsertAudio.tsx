import React from 'react';
import { Uploader } from '.';
import { AssetsSvg } from '../../../../../../assets';
import { Spinner } from '../../../../../../common';
import { ApiHooks, useSelectorTyped } from '../../../../../../core';
import { DesignEditorMenuScreen } from "../../imageEditor"
import { AudioPlayer } from './audioPlayer';

type Props = { setscreen: (scr: DesignEditorMenuScreen) => void };

export function MenuInsertAudio(props: Props): JSX.Element {
  const { data: apiAudioData, isValidating } = ApiHooks.Admin.Audio.GetAllAudio.useHook();
  const currentAudioId = useSelectorTyped(state => state.design.currentDesignConfig?.audioData?.audioId);
  const [searchText, setSearchText] = React.useState<string>('');
  const audioData = React.useMemo(() => {
    const data = Array.isArray(apiAudioData) ? apiAudioData : [];
    if (searchText) {
      const _searchText = searchText.toLowerCase();
      return data.filter(a => a.displayName?.toLowerCase().includes(_searchText));
    } else {
      return data;
    }
  }, [searchText, apiAudioData])
  const currentAudioData = audioData?.find(a => a.id === currentAudioId);
  return (
    <div className="mt-3">
      <div className="row">
        <div className="col-xl-12 col-lg-12 col-md-4 col-sm-3 col-3 image-creation-elements-sm">
          <div className="image-creation-elements image-creation-elements-details">
            <div className="d-flex site-border-botom" id="headingThree">
              <div className="back-btn p-3">
                <div>
                  <AssetsSvg.Back
                    className="cur-point"
                    onClick={() => props.setscreen("defaultMenu")}
                  />
                </div>
              </div>
              <p className="mb-0 my-auto ml-2 flex-grow-1 d-xl-block d-lg-block d-md-block d-sm-none d-none">Insert Audio</p>
              {isValidating && <><Spinner /><div className="m-auto">Updating</div></>}
            </div>

            <Uploader type="Audio"/>
            
            <div className="d-flex site-border-botom p-3">
              <div className="input-group site-search-sm">
                <input type="text" className="form-control" placeholder="Search" value={searchText} onChange={ev => setSearchText(ev.target.value)} />
                <div className="input-group-append">
                  <span className="input-group-text">
                    <AssetsSvg.SearchIcon />
                  </span>
                </div>
              </div>
              <div className="ml-2 d-none">
                <div>
                  <div className="search-filter p-1">
                    <AssetsSvg.SearchFilter />
                  </div>
                </div>
              </div>
            </div>
            <div className="choose-designs">
              <div className="mt-1 other-itmes">
                {!!currentAudioData && (
                  <div className="p-3">
                    <p className="flex-grow-1 mb-1">Currently Using</p>
                    <div className="row flex-column">
                      <AudioPlayer audio={currentAudioData} />
                    </div>
                  </div>
                )}
                <div className="p-3">
                  <div className="d-flex">
                    <p className="flex-grow-1 mb-1">Recently used</p>
                    <div>
                      <p className="flex-grow-1 mb-1">See All</p>
                    </div>
                  </div>
                  <div className="row flex-column">
                    {audioData?.map(audio => (
                      <AudioPlayer audio={audio} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}