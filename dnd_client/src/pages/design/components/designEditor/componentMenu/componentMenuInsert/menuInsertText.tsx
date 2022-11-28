import React from 'react';
import { AssetsSvg } from '../../../../../../assets';
import { DesignEditorMenuScreen } from "../../imageEditor"
import { FabricStateContext } from '../../../../designPage';
import { FabricConstants } from '../../../../../../config/fabricConstants';
import { useFunctionalityFontsChoose } from '../../../../../admin';
import { Spinner } from '../../../../../../common';

type Props = { setscreen: (scr: DesignEditorMenuScreen) => void };

export function MenuInsertText(props: Props): JSX.Element {
  const fabricState = React.useContext(FabricStateContext);
  const {
    searchText,
    fonts,
    isBusy,
    setSearchText,
  } = useFunctionalityFontsChoose();

  return (
    <div className="mt-3">
      <div className="row">
        <div className="col-xl-12 col-lg-12 col-md-4 col-sm-3 col-3 image-creation-elements-sm">
          <div className="image-creation-elements image-creation-elements-details">
            <div className="d-flex site-border-botom align-items-center" id="headingThree">
              <div className="back-btn p-3">
                <div>
                  <AssetsSvg.Back className="cur-point" onClick={() => props.setscreen("defaultMenu")} />
                </div>
              </div>
              <p className="mb-0 my-auto ml-2 flex-grow-1 d-xl-block d-lg-block d-md-block d-sm-none d-none">Insert Text</p>
              {isBusy && <div className="d-flex align-items-center"><div><Spinner /></div>Updating</div>}
            </div>

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

            <div className="px-3 py-3 site-border-botom ">
              <div
                className="text-style px-2 py-1 site-all-border site-border-radious-sm mb-3 cur-point"
                onClick={() => fabricState.ControlFontText?.Addtext(FabricConstants.Text.FontSize.Heading, "This is a heading")}>
                <p className="mb-0">Add a heading </p>
              </div>
              <div
                className="text-style px-2 py-1 site-all-border site-border-radious-sm mb-3 cur-point"
                onClick={() => fabricState.ControlFontText?.Addtext(FabricConstants.Text.FontSize.Subheading, "This is a subheading")}>
                <p className="mb-0"> Add a subheading</p>
              </div>
              <div
                className="text-style px-2 py-1 site-all-border site-border-radious-sm mb-3 cur-point"
                onClick={() => fabricState.ControlFontText?.Addtext(FabricConstants.Text.FontSize.Body, "This is a body")}>
                <p className="mb-0">Add a body</p>
              </div>
            </div>

            <div className="choose-designs">
              {/* <div className="mt-1 current-itmes">
                <div className="p-3">
                  <p className="">Currently using this design</p>
                  <div className="current-singleitem-background">
                    <img className="img-fluid" src={RoutesAsset.ImageCreationTexts.Font01} alt="" />
                  </div>
                </div>
              </div> */}
              <div className="mt-1 other-itmes">
                <div className="p-3">
                  <div className="d-flex">
                    <p className="flex-grow-1 mb-1">Trending</p>
                    {/* <div>
                      <p className="flex-grow-1 mb-1">See All</p>
                    </div> */}
                  </div>
                  <div className="row">
                    {fonts?.map(fnt => (
                      <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 d-flex w-100 pt-3">
                        <div key={fnt.id} className="mt-1 other-itmes w-100 h-100">
                          <div
                            className="other--single-itme cur-point  w-100 h-100 "
                            onClick={() => fabricState.ControlFontText?.AddTextByFontFamily(fnt.id, fnt.displayName || 'Insert Text')}>
                            <img className="img-fluid img-cover " src={fnt.previewImgUrl} alt={fnt.displayName} />
                          </div>

                        </div>
                      </div>
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