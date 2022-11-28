import React from 'react';
import { SketchPicker } from 'react-color';
import { shallowEqual } from 'react-redux';
import { FabricStateContext } from '../../../..';
import { AssetsSvg } from '../../../../../../assets';
import { useSelectorTyped } from '../../../../../../core';
import { FabricElementTypes } from '../../../../../../models';

type ColorPickerComponentProps = {
  label: string;
  onChange: (hex: string) => void;
}

function ColorPickerComponent(props: ColorPickerComponentProps): JSX.Element {
  const [color, setColor] = React.useState<string>('#FFFFFF');
  return (
    <div className="w-100 item-slider-control my-2">
      <p className="mr-2 my-auto"> {props.label} </p>
      <SketchPicker color={color} onChangeComplete={(c) => (props.onChange(c.hex), setColor(c.hex))} />
    </div>
  );
}

export function SelectedTextEffect(): JSX.Element {
  const fabricState = React.useContext(FabricStateContext);
  const fabricObjectSelection = useSelectorTyped(state => state.fabricData.selection, shallowEqual);
  const textData = fabricObjectSelection?.type === FabricElementTypes.IText ? fabricObjectSelection.data : undefined;
  return (
    <>
      <div id="transition" className="cur-point" data-toggle="collapse" data-target="#transitioncollaps" aria-expanded="false" aria-controls="transitioncollaps">
        <div className="d-flex" id="headingThree" data-toggle="collapse" data-target="#transitioncollaps" aria-expanded="false" aria-controls="transitioncollaps">
          <div className="collapsed p-3 m-auto">
            <AssetsSvg.Transition />
          </div>
          <p className="mb-0 my-auto ml-2 flex-grow-1 d-xl-block d-lg-block d-md-block d-sm-none d-none">Text Effects</p>
          <span className="collapsed collapsed-custom py-3 d-xl-block d-lg-block d-md-block d-sm-none d-none">
            <AssetsSvg.DownArrow />
          </span>
        </div>
      </div>

      <div id="transitioncollaps" className="collapse" aria-labelledby="transition" data-parent="#accordion">
        <div>
          <div className="mt-1">
            <div className="px-3">
              <div className="row">
                <div className="w-100 item-slider-control my-2">
                  <p className="mr-2 my-auto">Shadow Offset X-Axis</p>
                  <input type="range" min="-180" max="180" step="1" defaultValue="0" className="my-auto mr-2 flex-grow-1" id="direction" onChange={(e) => fabricState.ControlTextEffects?.SetShadowOffsetX(e.target.value)} />
                  {/* <input type="text" className="my-auto number-field" id="offsetEffectView" value={textData?.offsetEffect} /> */}
                </div>
                <div className="w-100 item-slider-control my-2">
                  <p className="mr-2 my-auto">Shadow Offset Y-Axis</p>
                  <input type="range" min="-180" max="180" step="1" defaultValue="0" className="my-auto mr-2 flex-grow-1" id="direction" onChange={(e) => fabricState.ControlTextEffects?.SetShadowOffsetY(e.target.value)} />
                  {/* <input type="text" className="my-auto number-field" id="offsetEffectView" value={textData?.shadowDirection} /> */}
                </div>
                <div className="w-100 item-slider-control my-2">
                  <p className="mr-2 my-auto">Shadow Blur</p>
                  <input type="range" min="30" max="100" className="my-auto mr-2 flex-grow-1" step="1" onChange={(e) => fabricState.ControlTextEffects?.SetShadowBlur(e.target.value)} />
                  {/* <input type="text" className="my-auto number-field" id="offsetEffectView" value={textData?.blurEffect} /> */}
                </div>
                <ColorPickerComponent label="Shadow Color" onChange={hex => fabricState.ControlTextEffects?.SetShadowColor(hex)} />
                <ColorPickerComponent label="Stroke Color" onChange={hex => fabricState.ControlTextEffects?.SetStrokeColor(hex)} />
                <div className="w-100 item-slider-control my-2">
                  <p className="mr-2 my-auto">Stroke Thickness</p>
                  <input type="range" min="0" max="5" step=".5" defaultValue={0} className="my-auto mr-2 flex-grow-1" onChange={(e) => fabricState.ControlTextEffects?.SetStrokeThickness(e.target.value)} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}