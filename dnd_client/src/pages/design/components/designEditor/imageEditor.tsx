import React from 'react';
import { DesignCanvas } from './imageCanvas';
import { PageSelection } from './pageSelection';
import {
  MenuTemplates,
  MenuInsert,
  MenuBackground,
  MenuInsertAnimation,
  MenuInsertElement,
  MenuInsertImage,
  MenuInsertText,
  SelectionMenuElement,
  SelectionMenuImage,
  SelectionMenuText,
  MenuInsertVideo,
  SelectionMenuAny,
  MenuInsertAudio,
} from './componentMenu';
import { FabricElementTypes } from '../../../../models';
import { shallowEqual } from 'react-redux';
import { useSelectorTyped } from '../../../../core';

export type DesignEditorMenuScreen = "defaultMenu"
  | "textProperties"
  | "imageProperties"
  | "audioProperties"
  | "videoProperties"
  | "elementProperties"
  | "animationProperties"
  | "videoProperties"
  ;

function DesignEditorComponent(): JSX.Element {
  const [screen, setScreen] = React.useState<DesignEditorMenuScreen>("defaultMenu");
  const fabricObjectSelectionType = useSelectorTyped(state => state.fabricData.selection?.type, shallowEqual);

  return (
    <div>
      <div className="container-fluid">
        <div className="image-creation-working-area">
          <div className="h-100 row">
            <PageSelection />
            <DesignCanvas />
            <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
              {fabricObjectSelectionType ? (
                <>
                  <SelectionMenuAny />
                  {(fabricObjectSelectionType === FabricElementTypes.IText || fabricObjectSelectionType === FabricElementTypes.Text) ? (
                    <SelectionMenuText />
                  ) : fabricObjectSelectionType === FabricElementTypes.Image ? (
                    <SelectionMenuImage />
                  ) : fabricObjectSelectionType === null ? (
                    <SelectionMenuImage />
                  ) : (fabricObjectSelectionType === FabricElementTypes.Rectangle || fabricObjectSelectionType === FabricElementTypes.Circle || fabricObjectSelectionType === FabricElementTypes.Path) ? (
                    <SelectionMenuElement />
                  ) : (fabricObjectSelectionType === FabricElementTypes.Group) ? (
                    <SelectionMenuElement />
                  ) : null}
                </>
              ) : (
                  screen === "defaultMenu" ? (
                    <div id="accordion" className="mt-3">
                      <div className="row">
                        <MenuTemplates />
                        <MenuInsert setscreen={setScreen} />
                        <MenuBackground />
                        {/* <MenuTransitions /> */}
                      </div>
                    </div>
                  ) : screen === "textProperties" ? (
                    <MenuInsertText setscreen={setScreen} />
                  ) : screen === "imageProperties" ? (
                    <MenuInsertImage setscreen={setScreen} />
                  ) : screen === "audioProperties" ? (
                    <MenuInsertAudio setscreen={setScreen} />
                  ) : screen === "videoProperties" ? (
                    <MenuInsertVideo setMenuScreen={setScreen} />
                  ) : screen === "animationProperties" ? (
                    <MenuInsertAnimation setscreen={setScreen} />
                  ) : screen === "elementProperties" ? (
                    <MenuInsertElement setscreen={setScreen} />
                  ) : null
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const DesignEditor = React.memo(DesignEditorComponent);