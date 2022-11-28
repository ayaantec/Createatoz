import React from "react";
import defaultImg from '../../../assets/default-thumbnail.jpg'

interface DesignResponse {
  thumbnailUrl: string,
  id: number
}

interface Props {
  designResponse: DesignResponse;
}

export default function MyDesign({designResponse}: Props) {
  if (
    designResponse.thumbnailUrl
  ) {
    return (
      <div className="mb-4 col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12 d-flex w-100">
         <img className="page-thumb my-design-thumb" src={designResponse.thumbnailUrl} alt="preview" />
      </div>
    );
  } else return (
    <div className="mb-4 col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12 d-flex w-100">
        <img className="page-thumb my-design-thumb" src={defaultImg} alt="preview"/>
    </div>
  );
}

