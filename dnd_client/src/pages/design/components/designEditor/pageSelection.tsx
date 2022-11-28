import React from 'react';
import { AssetsSvg } from '../../../../assets';
import { FabricStateContext } from '../../designPage';

export function PageSelection(): JSX.Element {
  const intervalId = React.useRef<number>();
  const [, render] = React.useReducer(s => s + 1, 0);
  const fabricState = React.useContext(FabricStateContext);
  React.useEffect(() => {
    intervalId.current = setInterval(() => render(), 3000) as unknown as number;
    return () => clearInterval(intervalId.current);
    // eslint-disable-next-line
  }, []);

  const previewUrl = fabricState.GetPreviewUrl();

  return (
    <div className="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
      <div className="row mt-3">
        <div className="col-xl-12 col-lg-12 col-md-10 col-sm-10 col-10 canvas-page">
          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-4 col-sm-4 col-4">
              <div className="page-thumb-ctl p-2">
                <div className="row">
                  <div className="col-xl-2 col-lg-1 col-md-3 col-sm-3 col-3  p-xl-2 p-lg-2 p-md-2 p-sm-0 p-0">
                    <p className="mb-auto pl-2">1</p>
                  </div>
                  <div className="col-xl-10 col-lg-11 col-md-9 col-sm-9 col-9 pl-0 p">
                    <div className="page-thumb" >
                      {/* {previewUrl && <img width={236} height={158} src={previewUrl} alt="preview" />} */}
                      {previewUrl && <img className="page-thumb" src={previewUrl} alt="preview" />}

                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="col-xl-12 col-lg-12 col-md-4 col-sm-4 col-4">
              <div className="page-thumb-ctl p-2">
                <div className="row">
                  <div className="col-xl-2 col-lg-1 col-md-3 col-sm-3 col-3  p-xl-2 p-lg-2 p-md-2 p-sm-0 p-0">
                    <p className="mb-auto pl-2">2</p>
                  </div>
                  <div className="col-xl-10 col-lg-11 col-md-9 col-sm-9 col-9 pl-0 p">
                    <div className="page-thumb">
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-12 col-lg-12 col-md-4 col-sm-4 col-4">
              <div className="page-thumb-ctl p-2">
                <div className="row">
                  <div className="col-xl-2 col-lg-1 col-md-3 col-sm-3 col-3  p-xl-2 p-lg-2 p-md-2 p-sm-0 p-0">
                    <p className="mb-auto pl-2">3</p>
                  </div>
                  <div className="col-xl-10 col-lg-11 col-md-9 col-sm-9 col-9 pl-0 p">
                    <div className="page-thumb">
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-12 col-lg-12 col-md-4 col-sm-4 col-4">
              <div className="page-thumb-ctl p-2">
                <div className="row">
                  <div className="col-xl-2 col-lg-1 col-md-3 col-sm-3 col-3  p-xl-2 p-lg-2 p-md-2 p-sm-0 p-0">
                    <p className="mb-auto pl-2">4</p>
                  </div>
                  <div className="col-xl-10 col-lg-11 col-md-9 col-sm-9 col-9 pl-0 p">
                    <div className="page-thumb">
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-12 col-lg-12 col-md-4 col-sm-4 col-4">
              <div className="page-thumb-ctl p-2">
                <div className="row">
                  <div className="col-xl-2 col-lg-1 col-md-3 col-sm-3 col-3  p-xl-2 p-lg-2 p-md-2 p-sm-0 p-0">
                    <p className="mb-auto pl-2">5</p>
                  </div>
                  <div className="col-xl-10 col-lg-11 col-md-9 col-sm-9 col-9 pl-0 p">
                    <div className="page-thumb">
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-12 col-lg-12 col-md-4 col-sm-4 col-4">
              <div className="page-thumb-ctl p-2">
                <div className="row">
                  <div className="col-xl-2 col-lg-1 col-md-3 col-sm-3 col-3  p-xl-2 p-lg-2 p-md-2 p-sm-0 p-0">
                    <p className="mb-auto pl-2">6</p>
                  </div>
                  <div className="col-xl-10 col-lg-11 col-md-9 col-sm-9 col-9 pl-0 p">
                    <div className="page-thumb">
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-12 col-lg-12 col-md-4 col-sm-4 col-4">
              <div className="page-thumb-ctl p-2">
                <div className="row">
                  <div className="col-xl-2 col-lg-1 col-md-3 col-sm-3 col-3  p-xl-2 p-lg-2 p-md-2 p-sm-0 p-0">
                    <p className="mb-auto pl-2">7</p>
                  </div>
                  <div className="col-xl-10 col-lg-11 col-md-9 col-sm-9 col-9 pl-0 p">
                    <div className="page-thumb">
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
        {/* <div className="col-xl-12 col-lg-12 col-md-2 col-sm-2 col-2 canvas-page-add">
          <div>
            <div>
              <div className="p-2 d-flex">
                <span className="ml-auto">
                  <AssetsSvg.Plus />
                </span>
                <p className="mb-0 mr-2 mr-auto my-auto ml-2 d-xl-block d-lg-block d-md-block d-sm-none d-none">Add new page</p>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}