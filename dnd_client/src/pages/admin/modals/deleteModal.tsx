import axios from "axios";
import React from "react";
import { AssetsSvg } from "../../../assets";
import { Spinner } from "../../../common";
import { DomID, RoutesAppApi } from "../../../config";
import { useSelectorTyped } from "../../../core";
import { useFunctionalityVideoUpload, useFunctionalityElementsChoose, useFunctionalityAudioUpload, useFunctionalityFontsChoose, useFunctionalityImagesChoose } from '../secondaryPages/hooks';

interface propsId {
    type: 'Video' | 'Element' | 'Audio' | 'Font' | 'Image';
    id: string | undefined;
}

export function DeleteModal(props: propsId): JSX.Element {
    
  const { onDeleteVideo } = useFunctionalityVideoUpload();
  const { onDeleteElement } = useFunctionalityElementsChoose();
  const { onDeleteAudio } = useFunctionalityAudioUpload();
  const { onDeleteFont } = useFunctionalityFontsChoose();
  const { onDeleteImage } = useFunctionalityImagesChoose();

  let onDelete: Function;
  if(props.type === 'Video'){
    onDelete = onDeleteVideo
  } else if(props.type === 'Element'){
    onDelete = onDeleteElement
  } else if(props.type === 'Audio'){
    onDelete = onDeleteAudio
  } else if(props.type === 'Font'){
    onDelete = onDeleteFont
  } else if(props.type === 'Image'){
    onDelete = onDeleteImage
  }

  return (
    <>
      <div
        id={DomID.Modals.DeleteModal}
        className="modal fade"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="myLargeModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered template-modal-ctrl">
          <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Delete {props.type}
                </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <p>Do you want to delete?</p>
            </div>
            <div className="modal-footer d-flex">
              <div>
                <a className="secondary-btn-link px-3 py-2  text-center" href="javascript:void(0)" data-dismiss="modal">Cancel</a>
                <a
                    className="site-primary-btn px-3 py-2 text-center"
                    href="javascript:void(0)"
                    onClick={() => onDelete(props.id)}
                >
                    {false ? <Spinner /> : "Delete"}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
