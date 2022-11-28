import React from 'react';
import { AssetsSvg } from '../../../../../../assets';
import { RoutesAsset } from '../../../../../../config';
import { DesignEditorMenuScreen } from "../../imageEditor"
import { FabricStateContext } from '../../../../designPage';
import { FabricConstants } from '../../../../../../config/fabricConstants';

type Props = { setscreen: (scr: DesignEditorMenuScreen) => void };

export function MenuInsertAnimation(props: Props): JSX.Element {
    const fabricState = React.useContext(FabricStateContext);

    return (
        <div className="mt-3">

            <div className="row">

                <div className="col-xl-12 col-lg-12 col-md-4 col-sm-3 col-3 image-creation-elements-sm">
                    <div className="image-creation-elements image-creation-elements-details">
                        <div className="d-flex site-border-botom" id="headingThree">
                            <div className="back-btn p-3">
                                <AssetsSvg.Back onClick={() => props.setscreen("defaultMenu")} />
                            </div>
                            <p className="mb-0 my-auto ml-2 flex-grow-1 d-xl-block d-lg-block d-md-block d-sm-none d-none">Create New Animations</p>

                        </div>

                        <div className="site-border-botom d-flex">

                            <div className="p-3 m-auto">
                                <AssetsSvg.InsertText />
                            </div>

                            <p className="mb-0 my-auto ml-2 flex-grow-1 d-xl-block d-lg-block d-md-block d-sm-none d-none">Text</p>




                        </div>

                        <div className="site-border-botom px-3">
                            <form>
                                <div className="form-group my-3">
                                    <select className="form-control">
                                        <option>Arial</option>
                                        <option>Roboto</option>
                                        <option>Goldman</option>
                                        <option>Big Shoulders Stencil Display</option>
                                        <option>Open Sans</option>
                                    </select>
                                </div>
                            </form>
                        </div>





                        <div className="site-border-botom px-3 d-flex">
                            <form>
                                <div className="form-group my-3">
                                    <select className="form-control">
                                        <option>12px</option>
                                        <option>14px</option>
                                        <option>16px</option>
                                        <option>18px</option>
                                        <option>20px</option>
                                    </select>
                                </div>
                            </form>
                        </div>

                        <div className="site-border-botom px-3 py-2 d-flex">
                            <div className="edit-elements-single-icon p-1 site-border-radious-sm mr-2">
                                <AssetsSvg.Bold />
                            </div>

                            <div className="edit-elements-single-icon p-1 site-border-radious-sm mr-2">
                                <AssetsSvg.Italic />

                            </div>

                            <div className="edit-elements-single-icon p-1 site-border-radious-sm mr-2">
                                <AssetsSvg.Underline />
                            </div >

                            <div className="edit-elements-single-icon p-1 site-border-radious-sm mr-2">
                                <AssetsSvg.TextColor />

                            </div>

                            <div className="edit-elements-single-icon p-1 site-border-radious-sm mr-2">
                                <AssetsSvg.TextBgColor />
                            </div>
                        </div >

                        <div className="site-border-botom px-3 py-2 d-flex">
                            <div className="edit-elements-single-icon p-1 site-border-radious-sm mr-2">
                                <AssetsSvg.AlignRight />

                            </div>

                            <div className="edit-elements-single-icon p-1 site-border-radious-sm mr-2">
                                <AssetsSvg.AlignMiddle />
                            </div >

                            <div className="edit-elements-single-icon p-1 site-border-radious-sm mr-2">
                                <AssetsSvg.AlignLeft />

                            </div>

                            <div className="edit-elements-single-icon p-1 site-border-radious-sm mr-2">
                                <AssetsSvg.AlignSame />

                            </div>


                        </div >


                        <div className="site-border-botom px-3 py-2 d-flex">
                            <div className="edit-elements-single-icon p-1 site-border-radious-sm mr-2">
                                <AssetsSvg.TextSize />
                            </div>

                            <div className="edit-elements-single-icon p-1 site-border-radious-sm mr-2">



                                <AssetsSvg.BulletPoints />

                            </div >

                            <div className="edit-elements-single-icon p-1 site-border-radious-sm mr-2">
                                <AssetsSvg.NumberPoints />


                            </div>

                            <div className="edit-elements-single-icon p-1 site-border-radious-sm mr-2">
                                <AssetsSvg.NumberPoints />

                            </div>


                        </div >


                        <div className="px-3 d-flex">
                            <form>
                                <div className="form-group my-3">
                                    <select className="form-control">
                                        <option>Text Effects</option>
                                        <option>----</option>
                                        <option>------</option>
                                        <option>--</option>
                                        <option>------------</option>
                                    </select>
                                </div>
                            </form>
                        </div>
                    </div >
                </div >
            </div >
        </div >
    );
}