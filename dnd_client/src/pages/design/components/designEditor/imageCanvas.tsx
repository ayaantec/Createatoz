import React from 'react';
import { Spinner } from '../../../../common';
import { useSelectorTyped } from '../../../../core';
import { useFunctionalityDesignCanvas } from '../../hooks';
import CustomLoader from '../../../../common/CustomLoader';

export function DesignCanvas(): JSX.Element {
  const {
    isBusy,
    containerRef,
    boundingRef,
    canvasRef,
  } = useFunctionalityDesignCanvas();
  const isWorking = useSelectorTyped(state => state.fabricData.isWorking);
  return (
    <div ref={boundingRef} className="col-xl-7 col-lg-7 col-md-12 col-sm-12 col-12">
      <div ref={containerRef} className="d-flex justify-content-center main-canvas-ctl mt-3">
        {isWorking ? <CustomLoader /> : null }

        {isBusy ? (
          <div className="d-flex w-100 align-items-center justify-content-center">
            <span><Spinner height="60px" width="60px" /></span> Initializing Design...
          </div>
        ) : (
            <div className="main-canvas-workingareas"><canvas ref={canvasRef} /></div>
          )}
      </div>
    </div>
    // <div ref={boundingRef} className="col-xl-7 col-lg-7 col-md-12 col-sm-12 col-12">
    //   <div ref={containerRef} className="d-flex justify-content-center initializing-spinner mt-3">
    //   <p>{isWorking ? "true" : "false"}</p>
    //     {isBusy ? (
    //       <div className="d-flex w-100 align-items-center justify-content-center">
    //         <span><Spinner height="60px" width="60px" /></span> Initializing Design...
    //       </div>
    //     ) : (
    //       <div className="main-canvas-workingareas"><canvas ref={canvasRef} /></div>
    //     )}
    //   </div>
    // </div>
  );
}