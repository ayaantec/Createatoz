import { fabric } from 'fabric';
import { FabricConstants } from '../config/fabricConstants';
import { FabricElementTypes, TFabricDesignData, TypeDesignConfigData } from '../models';
import { UtilsFabric } from '../utils';
import {
  FabricControlZoom,
  FabricControlSelectionImage,
  FabricControlImage,
  FabricControlFontText,
  FabricControlImport,
  FabricControlVideo,
  FabricControlObjectStacking,
  FabricControlKeybord,
  FabricControlTextEffects,
  FabricControlDownload,
} from './controls';
import { FabricInit } from './FabricInit';
import { ActionsDesign, ActionsFabricCurrentData, DragAndDropStore } from '../core';
(fabric as any).DPI = 213;

FabricInit();

var lowerUpper = true;
var hasbullets = true;
var cloneText = "";


let currentMode: string;
const modes = {
  pan: "pan",
  drawing: "drawing"
};

enum FabricEvents {
  SelectionCreated = 'selection:created',
  SelectionUpdated = 'selection:updated',
  SelectionCleared = 'selection:cleared',
  MouseUp = 'mouse:up',
  MouseDown = 'mouse:down',
  MouseMove = 'mouse:move',
  AfterRender = 'after:render',
}

class FabricStateManagerImpl {
  public fontData: string[] = [];

  private fabricCanvas?: fabric.Canvas;
  private panMode: boolean = false;
  private panModeIsDragging: boolean = false;
  private panModeMousePos: { clientX?: number; clientY?: number } = {};
  private _onSave?: (designConfig: TypeDesignConfigData) => void;
  private _initDesignData?: TFabricDesignData;

  // Controls
  public ControlZoom?: FabricControlZoom;
  public ControlSelectionImage?: FabricControlSelectionImage;
  public ControlImage?: FabricControlImage;
  public ControlFontText?: FabricControlFontText;
  public ControlImport?: FabricControlImport;
  public ControlVideo?: FabricControlVideo;
  public ControlObjectStacking?: FabricControlObjectStacking;
  public ControlTextEffects?: FabricControlTextEffects;
  public ControlDownload?: FabricControlDownload;


  private __onObjectChange(): void {
    if (this._onSave && this._initDesignData && this.fabricCanvas) {
      this._onSave({
        ...this._initDesignData.configData,
        clientWidth: this.fabricCanvas?.getWidth(),
        clientHeight: this.fabricCanvas?.getHeight(),
        fabricData: JSON.stringify(this.fabricCanvas.toJSON([FabricControlVideo.VideoSourceId])),
      });
    }
  }

  private __onSelectionCreate(ev: fabric.IEvent): void {
    switch (ev.target?.type) {
      case FabricElementTypes.Text: {
        this.__selectionPropertiesText();
        break;
      }
      case FabricElementTypes.IText: {
        this.__selectionPropertiesIText();
        break;
      }
      case FabricElementTypes.Image: {
        this.__selectionPropertiesImage(ev.target);
        break;
      }
      case FabricElementTypes.Rectangle: {
        this.__selectionPropertiesRectangle();
        break;
      }
      case FabricElementTypes.Circle: {
        this.__selectionPropertiesCircle();
        break;
      }
      case FabricElementTypes.Path: {
        this.__selectionPropertiesPath();
        break;
      }
      case FabricElementTypes.Group: {
        this.__selectionPropertiesGroup(ev.target as fabric.Group);
        break;
      }
    }
    this.fabricCanvas?.drawControls(this.fabricCanvas.getContext());
    this.fabricCanvas?.requestRenderAll();
  }

  private __onSelectionUpdate(ev: fabric.IEvent): void {
    this.__onSelectionCreate(ev);
  }

  private __onSelectionClear(): void {
    this.fabricCanvas?.drawControls(this.fabricCanvas.getContext());
    this.fabricCanvas?.requestRenderAll();
    DragAndDropStore.dispatch(ActionsFabricCurrentData.ClearObjectSelection());
  }

  private __onMouseUp(): void {
    this.panModeIsDragging = false;
  }

  private __onMouseDown(ev: fabric.IEvent): void {
    this.panModeMousePos.clientX = (ev.e as DragEvent).clientX;
    this.panModeMousePos.clientY = (ev.e as DragEvent).clientY;
    if (this.panMode) {
      this.panModeIsDragging = true;
    } else {
      this.panModeIsDragging = false;
    }
  }

  private __onMouseMove(ev: fabric.IEvent): void {
    if (this.panModeIsDragging && this.panModeMousePos.clientX !== undefined && this.panModeMousePos.clientY !== undefined) {
      const vpt = this.fabricCanvas?.viewportTransform;
      if (vpt && this.fabricCanvas) {
        const newX = vpt[4] + (ev.e as DragEvent).clientX - this.panModeMousePos.clientX;
        const newY = vpt[5] + (ev.e as DragEvent).clientY - this.panModeMousePos.clientY;
        if (newX <= 0 && newX > this.fabricCanvas.getWidth() - (this.fabricCanvas.getZoom() * 1000)) {
          vpt[4] = newX;
        }
        if (newY <= 0 && newY > this.fabricCanvas.getHeight() - (this.fabricCanvas.getHeight() * this.fabricCanvas.getZoom())) {
          vpt[5] = newY;
        }
        this.fabricCanvas.requestRenderAll();
        this.panModeMousePos.clientX = (ev.e as DragEvent).clientX;
        this.panModeMousePos.clientY = (ev.e as DragEvent).clientY;
      }
    }
  }

  private __selectionPropertiesImage(obj?: fabric.Object): void {
    if (!!obj && FabricControlVideo.VideoSourceId in obj) {
      DragAndDropStore.dispatch(ActionsFabricCurrentData.SetObjectSelection({
        type: FabricElementTypes.Video,
      }));
    } else {
      DragAndDropStore.dispatch(ActionsFabricCurrentData.SetObjectSelection({
        type: FabricElementTypes.Image,
        data: {
          isLocked: UtilsFabric.IsObjectLocked(obj),
        },
      }));
    }
  }

  private __selectionPropertiesText(): void {
    DragAndDropStore.dispatch(ActionsFabricCurrentData.SetObjectSelection({
      type: FabricElementTypes.Text,
    }));
  }

  private __selectionPropertiesIText(): void {
    DragAndDropStore.dispatch(ActionsFabricCurrentData.SetObjectSelection({
      type: FabricElementTypes.IText,
    }));
  }

  private __selectionPropertiesRectangle(): void {
    DragAndDropStore.dispatch(ActionsFabricCurrentData.SetObjectSelection({
      type: FabricElementTypes.Rectangle,
    }));
  }

  private __selectionPropertiesCircle(): void {
    DragAndDropStore.dispatch(ActionsFabricCurrentData.SetObjectSelection({
      type: FabricElementTypes.Circle,
    }));
  }

  private __selectionPropertiesPath(): void {
    DragAndDropStore.dispatch(ActionsFabricCurrentData.SetObjectSelection({
      type: FabricElementTypes.Path,
    }));
  }

  private __selectionPropertiesGroup(obj?: fabric.Group): void {
    DragAndDropStore.dispatch(ActionsFabricCurrentData.SetObjectSelection({
      data: { colors: obj?.getObjects().map(obj => typeof obj.fill === 'string' ? obj.fill : '#000000') ?? [] },
      type: FabricElementTypes.Group,
    }));
  }
  constructor() {
    const render = () => {
      this.fabricCanvas?.renderAll();
      fabric.util.requestAnimFrame(render);
    }
    fabric.util.requestAnimFrame(render);
  }

  /**
   * @function SetFabricInstance() Sets the fabric instance of the rendered canvas
   * @param {fabric.Canvas} fabricCanvas Fabric.Canvas instance
   * @return {void} `void`
   */
  public SetFabricInstance(fabricCanvas: fabric.Canvas, initData: TFabricDesignData, onSave: (designConfig: TypeDesignConfigData) => void): void {
    this.fabricCanvas?.off(FabricEvents.SelectionCreated);
    this.fabricCanvas?.off(FabricEvents.SelectionUpdated);
    this.fabricCanvas?.off(FabricEvents.SelectionCleared);
    this.fabricCanvas?.off(FabricEvents.MouseUp);
    this.fabricCanvas?.off(FabricEvents.MouseDown);
    this.fabricCanvas?.off(FabricEvents.MouseMove);
    this.fabricCanvas?.off(FabricEvents.AfterRender);

    this.fabricCanvas = fabricCanvas;
    fabricCanvas.preserveObjectStacking = true;
    fabricCanvas.selectionKey = 'ctrlKey';
    this.fabricCanvas?.on({
      [FabricEvents.SelectionCreated]: this.__onSelectionCreate.bind(this),
      [FabricEvents.SelectionUpdated]: this.__onSelectionUpdate.bind(this),
      [FabricEvents.SelectionCleared]: this.__onSelectionClear.bind(this),
      [FabricEvents.MouseUp]: this.__onMouseUp.bind(this),
      [FabricEvents.MouseDown]: this.__onMouseDown.bind(this),
      [FabricEvents.MouseMove]: this.__onMouseMove.bind(this),
      [FabricEvents.AfterRender]: this.__onObjectChange.bind(this),
    });

    this._onSave = onSave;
    this._initDesignData = initData;

    const taskStarted = () => DragAndDropStore.dispatch(ActionsFabricCurrentData.TaskStarted());
    const taskEnded = () => DragAndDropStore.dispatch(ActionsFabricCurrentData.TaskEnded());

    this.ControlZoom = new FabricControlZoom(fabricCanvas, (canZoomIn, canZoomOut) => {
      DragAndDropStore.dispatch(ActionsFabricCurrentData.SetCanZoomIn(canZoomIn));
      DragAndDropStore.dispatch(ActionsFabricCurrentData.SetCanZoomOut(canZoomOut));
    });
    this.ControlSelectionImage = new FabricControlSelectionImage(fabricCanvas);
    this.ControlVideo = new FabricControlVideo(fabricCanvas);
    this.ControlObjectStacking = new FabricControlObjectStacking(fabricCanvas);
    this.ControlTextEffects = new FabricControlTextEffects(fabricCanvas);
    this.ControlDownload = new FabricControlDownload(fabricCanvas);
    new FabricControlKeybord(fabricCanvas);
    this.ControlFontText = new FabricControlFontText(
      fabricCanvas,
      { onStart: taskStarted, onEnd: taskEnded },
    );
    this.ControlImage = new FabricControlImage(
      fabricCanvas,
      {
        height: initData.configData.height,
        width: initData.configData.width,
      },
      { onTaskStart: taskStarted, onTaskFinish: taskEnded },
    );
    this.ControlImport = new FabricControlImport(
      fabricCanvas,
      { onStart: taskStarted, onEnd: taskEnded },
    );

    if (typeof initData.configData.fabricData === 'string') {
      this.ControlImport.LoadFromJson(initData.configData.fabricData);
    } else {
      if (!!initData.configData.templateUrl) {
        this.ControlImage.LoadTemplate(initData.configData.templateUrl);
      }
    }
  }

  /**
   * @function GetPreviewUrl() Get the preview of the current canvas view in Data URL
   * @returns {string | undefined} `string | undefined`
   */
  public GetPreviewUrl(): string | undefined {
    return this.fabricCanvas?.toDataURL();
  }

  public SetAudio(audioId: string, loop: boolean): void {
    if (this._initDesignData) {
      this._initDesignData = {
        ...this._initDesignData,
        configData: {
          ...this._initDesignData.configData,
          audioData: { audioId, loop },
        },
      };
      this.__onObjectChange();
      DragAndDropStore.dispatch(ActionsDesign.SetCurrentDesignConfig(this._initDesignData.configData));
    }
  }

  public SelectionElementFill(color: string): void {
    const obj = this.fabricCanvas?.getActiveObject();
    obj?.set('fill', color);
  }

  public SelectionTextBold(): void {


    var obj = this.fabricCanvas?.getActiveObject();
    switch (obj?.type) {
      case FabricElementTypes.IText: {
        const _obj = obj as fabric.IText;
        if (_obj.fontWeight === 'normal') {
          if (_obj.setSelectionStyles && _obj.isEditing) {

            _obj.setSelectionStyles({ fontWeight: "bold" })
          }
          else {
            _obj.set('fontWeight', FabricConstants.Text.FontWeight.Bold);
          }
        }
        else {
          if (_obj.setSelectionStyles && _obj.isEditing) {

            _obj.setSelectionStyles({ fontWeight: "" })
          }
          else {
            _obj.set('fontWeight', FabricConstants.Text.FontWeight.Normal);
          }
        }
        break;
      }
    }

    this.fabricCanvas?.requestRenderAll();
  }

  public SelectionTextItalic(): void {


    var obj = this.fabricCanvas?.getActiveObject();

    const _obj = obj as fabric.IText;
    if (_obj.fontStyle === 'normal') {
      if (_obj.setSelectionStyles && _obj.isEditing) {

        _obj.setSelectionStyles({ fontStyle: "italic" })
      }
      else {
        _obj.set('fontStyle', FabricConstants.Text.FontStyles.Italic);
      }

    }
    else {
      if (_obj.setSelectionStyles && _obj.isEditing) {

        _obj.setSelectionStyles({ fontStyle: "normal" })
      }
      else {
        _obj.set('fontStyle', FabricConstants.Text.FontStyles.Normal);
      }

      this.fabricCanvas?.requestRenderAll();
    }
  }

  public SelectionTextUnderline(): void {
    var obj = this.fabricCanvas?.getActiveObject();
    const _obj = obj as fabric.IText;

    if (_obj.underline === false) {
      if (_obj.setSelectionStyles && _obj.isEditing) {

        _obj.setSelectionStyles({ underline: true })
      }
      else {
        _obj.set('underline', FabricConstants.Text.Fontunderline.Underline);
      }
    }
    else {
      if (_obj.setSelectionStyles && _obj.isEditing) {

        _obj.setSelectionStyles({ underline: false })
      }
      else {
        _obj.set('underline', false);
      }
      this.fabricCanvas?.requestRenderAll();
    }
  }

  public SelectionTextColor(color: string): void {
    var obj = this.fabricCanvas?.getActiveObject();
    const _obj = obj as fabric.IText;

    if (_obj.setSelectionStyles && _obj.isEditing) {
      _obj.setSelectionStyles({ fill: color })
    }
    else {
      _obj.set('fill', color);
    }
    this.fabricCanvas?.requestRenderAll();
  }


  public SelectionTextBackgroungColor(color: string): void {
    var obj = this.fabricCanvas?.getActiveObject();
    const _obj = obj as fabric.IText;

    if (_obj.setSelectionStyles && _obj.isEditing) {
      _obj.setSelectionStyles({ textBackgroundColor: color })
    }
    else {
      _obj.set('textBackgroundColor', color);
    }

    this.fabricCanvas?.requestRenderAll();
  }


  public SelectionShapeFillColor(color: string): void {
    var obj = this.fabricCanvas?.getActiveObject();
    const _obj = obj as fabric.Object;
    _obj.set('fill', color);

    this.fabricCanvas?.requestRenderAll();
  }

  public SelectionGroupFillColor(index: number, color: string): void {
    ((this.fabricCanvas?.getActiveObject() as fabric.Group).item(index)).set('fill', color);
  }


  public ToggleDrawingMode(): void {
    if (currentMode === modes.drawing) {
      currentMode = modes.pan;
      if (this.fabricCanvas) {
        this.fabricCanvas.isDrawingMode = false;
      }
      this.fabricCanvas?.requestRenderAll();
    }
    else {
      currentMode = modes.drawing;
      if (this.fabricCanvas) {
        this.fabricCanvas.freeDrawingBrush.color = "red";
        this.fabricCanvas.isDrawingMode = true;
      }
      this.fabricCanvas?.requestRenderAll();
    }
  }




  public TextAlign(position: string): void {

    // var align = ["left", "center", "right", "justify"];
    // var val = align[Math.floor(Math.random() * align.length)];
    var obj = this.fabricCanvas?.getActiveObject();
    switch (obj?.type) {
      // case FabricElementTypes.Text: {
      //   const _obj = obj as fabric.Text;
      //   _obj.set('fontWeight', FabricConstants.Text.FontWeight.Italic);
      //   break;
      // }
      case FabricElementTypes.IText: {
        const _obj = obj as fabric.IText;
        _obj.set('textAlign', position);
        break;
      }
    }
    this.fabricCanvas?.requestRenderAll();
  }

  public SelectionTextSize(number: string): void {

    var obj = this.fabricCanvas?.getActiveObject();
    switch (obj?.type) {
      // case FabricElementTypes.Text: {
      //   const _obj = obj as fabric.Text;
      //   _obj.set('fontWeight', FabricConstants.Text.FontWeight.Italic);
      //   break;
      // }
      case FabricElementTypes.IText: {
        const _obj = obj as fabric.IText;
        _obj.set('fontSize', Number(number));
        break;
      }
    }
    this.fabricCanvas?.requestRenderAll();
  }


  public SelectionTexttoUpper(): void {

    var obj = this.fabricCanvas?.getActiveObject();
    switch (obj?.type) {

      case FabricElementTypes.IText: {
        const _obj = obj as fabric.IText;
        var text = _obj.text

        if (lowerUpper) {
          _obj.text = text?.toUpperCase()
          lowerUpper = false
        }
        else {
          _obj.text = text?.toLowerCase()
          lowerUpper = true;
        }
        break;
      }
    }
    this.fabricCanvas?.requestRenderAll();
  }



  public SelectionTextLineheight(lineHeight: string): void {

    var obj = this.fabricCanvas?.getActiveObject();
    switch (obj?.type) {
      case FabricElementTypes.IText: {
        const _obj = obj as fabric.IText;
        _obj.set('lineHeight', Number(lineHeight));
        break;
      }
    }

    const currentSelectionData = DragAndDropStore.getState().fabricData.selection;

    if (currentSelectionData?.type === FabricElementTypes.IText || currentSelectionData?.type === FabricElementTypes.Text) {
      DragAndDropStore.dispatch(ActionsFabricCurrentData.SetObjectSelection({
        ...currentSelectionData,
        data: { ...currentSelectionData, lineHeight: Number(lineHeight) },
      }));
    }
    this.fabricCanvas?.requestRenderAll();
  }


  public SelectionTextCharSpacing(charSpacing: string): void {

    var obj = this.fabricCanvas?.getActiveObject();

    switch (obj?.type) {
      case FabricElementTypes.IText: {
        const _obj = obj as fabric.IText;
        _obj.set('charSpacing', Number(charSpacing));
        break;
      }
    }

    const currentSelectionData = DragAndDropStore.getState().fabricData.selection;

    if (currentSelectionData?.type === FabricElementTypes.IText || currentSelectionData?.type === FabricElementTypes.Text) {
      DragAndDropStore.dispatch(ActionsFabricCurrentData.SetObjectSelection({
        ...currentSelectionData,
        data: { ...currentSelectionData, charSpacing: Number(charSpacing) },
      }));
    }
    this.fabricCanvas?.requestRenderAll();
  }



  public getBulletPoints(): void {
    var outputArray = "";

    var obj = this.fabricCanvas?.getActiveObject();
    switch (obj?.type) {

      case FabricElementTypes.IText: {
        const _obj = obj as fabric.IText;
        if (hasbullets) {
          var arrayText = _obj.text?.split("\n")
          if (arrayText !== undefined) {
            for (var i = 0; i < arrayText?.length; i++) {
              if (arrayText[i] === "") {
                break;
              }
              outputArray += '\u2022' + arrayText[i] + '\n'
              cloneText += arrayText[i] + '\n'
            }
            _obj.onKeyDown = function (event: KeyboardEvent) {
              if (event.code === 'Enter') {
                outputArray += "\u2022";
                _obj?.set("text", '\u2022');
              }
            }
          }
          _obj?.set("text", outputArray);
          hasbullets = false
          arrayText = []
        }
        else {
          _obj?.set("text", cloneText);
          hasbullets = true
          cloneText = ""
        }
        break;
      }
    }

    this.fabricCanvas?.requestRenderAll();
  }


  public getNumberPoints(): void {
    var outputArray = ""

    var obj = this.fabricCanvas?.getActiveObject();
    switch (obj?.type) {
      // case FabricElementTypes.Text: {
      //   const _obj = obj as fabric.Text;
      //   _obj.set('fontWeight', FabricConstants.Text.FontStyles.Italic);   
      //          break;
      // }
      case FabricElementTypes.IText: {
        const _obj = obj as fabric.IText;
        if (hasbullets) {
          var arrayText = _obj.text?.split("\n")
          if (arrayText !== undefined) {
            for (var i = 0; i < arrayText?.length; i++) {
              if (arrayText[i] === "") {
                break;
              }
              outputArray += (i + 1) + "." + arrayText[i] + '\n'
              cloneText += arrayText[i] + '\n'
            }

          }

          _obj?.set("text", outputArray);
          hasbullets = false
          arrayText = []
        }
        else {
          _obj?.set("text", cloneText);
          hasbullets = true
          cloneText = ""
        }
        break;
      }
    }
    this.fabricCanvas?.requestRenderAll();
  }

  /**
   * @function SelectionImageLockToggle() Flip the currently selected image
   * @returns {void} `void`
   */
  public SelectionImageLockToggle(): void {
    const currentObj = this.fabricCanvas?.getActiveObject();

    if (currentObj && currentObj.type === FabricElementTypes.Image) {
      UtilsFabric.ToggleObjectLock(currentObj);
      this.fabricCanvas?.requestRenderAll();
      this.__selectionPropertiesImage(currentObj);
    }
  }
  public ClearCanvas(): void {
    if (this._initDesignData?.configData.templateUrl) {
      this.ControlImage?.LoadTemplate(this._initDesignData?.configData.templateUrl)
    }
  }

  public AddRectangle() {
    this.fabricCanvas?.add(
      new fabric.Rect({
        width: 100,
        height: 100,
        fill: "Black",
        objectCaching: false
      })
    );
  }

  public AddCircle() {
    this.fabricCanvas?.add(
      new fabric.Circle({
        radius: 50,
        fill: "black",
        width: 100,
        height: 100,
        objectCaching: false
      })
    );
  }

  public PanModeToggle(): void {
    if (this.fabricCanvas) {
      this.fabricCanvas.forEachObject(obj => obj.selectable = this.panMode);
      this.fabricCanvas.discardActiveObject();
      this.fabricCanvas.selection = this.panMode;
    }
    this.panMode = !this.panMode;
    DragAndDropStore.dispatch(ActionsFabricCurrentData.SetPanMode(this.panMode));
  }

  public DeselectAll(): void {
    this.fabricCanvas?.discardActiveObject();
    this.fabricCanvas?.drawControls(this.fabricCanvas.getContext());
    this.fabricCanvas?.requestRenderAll();
  }



}

export type FabricStateManager = FabricStateManagerImpl;

export const FabricStateManagerInstance = new FabricStateManagerImpl();