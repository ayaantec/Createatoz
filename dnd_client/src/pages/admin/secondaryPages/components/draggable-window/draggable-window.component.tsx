import React, { useState } from 'react';
import './draggable-window.styles.scss';
import Draggable from 'react-draggable';
import { Button, ButtonToolbar, Icon, IconButton } from 'rsuite';

const DraggableWindow = (props: any) => {
    const { buttonTxt, onSubmit, onClose, onHandleClose, hideFooter = false } = props;
    const [toggleWindow, setToggleWindow] = useState<boolean>(false)

    const [hideBody, setHideBody] = useState(false);
    const handelHideBody = () => {
        setHideBody(!hideBody);
    }

    const [expander, setExpander] = useState(false);
    const handelExpander = () => {
        setExpander(!expander);
    }

    const handelClose = () => {
        setToggleWindow(false);
        onHandleClose()

    };

    return (
        <Draggable handle="strong">
            <div className={`drag-window card box overflow-hidden ${expander ? "w-100 h-100 expander" : "w-35 compress"}`}>
                <strong className='cursor container-fluid'>
                    <div className="card-header row">
                        <div className='col-md-6'>
                            {/* <IconButton onClick={handelHideBody} icon={<Icon icon={ hideBody ? "angle-down" : "angle-up"} />} className="form-button" size="xs" circle /> */}
                            <span className="pl-4">{props.title}</span>
                        </div>
                        <div className='col-md-6 text-right'>
                            <ButtonToolbar>
                               
                                <button type="button" className="close" aria-label="Close" onClick={handelClose}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                               
                            </ButtonToolbar>

                        </div>
                    </div>
                </strong>
                <div className={`card-body oberflow-auto ${hideBody ? "hidden" : ""}`}>
                    {props.children}
                </div>
                {!hideFooter ?
                    <div className="card-footer form-inline">
                        <Button onClick={onSubmit}>{buttonTxt}</Button>
                       
                    </div>
                    : null}
            </div>
        </Draggable>
    );
};

export default DraggableWindow