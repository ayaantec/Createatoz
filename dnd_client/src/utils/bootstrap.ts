class BootstrapUtilsClass {
  GetSelectorById(id: string): string {
    return `#${id}`;
  }

  ModalHideById(id: string): void {
    ($(this.GetSelectorById(id)) as any).modal('hide');
  }

  ModalOnHide(id: string, cb: () => void): () => void {
    $(this.GetSelectorById(id)).on('hidden.bs.modal', cb);
    return () => $(BootstrapUtils.GetSelectorById(id)).off('hidden.bs.modal');
  }
}

export const BootstrapUtils = new BootstrapUtilsClass();