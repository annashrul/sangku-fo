import { MODALS } from "./_constants"

export function ModalToggle(bool) {
  console.log('from action',bool);

  return {
    type: MODALS.IS_MODAL_OPEN,
    isOpen: bool
  }
}

export function ModalType(tipe) {
  return {
    type: MODALS.MODAL_TYPE,
    tipe
  }
}