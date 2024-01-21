interface confirmModal {
  step: string;
  nextStep: String;
  setShowModal: (it: boolean) => void;
  onNext: () => void;

}
const ConfirmModal = (props: confirmModal) => {
  return (
    <div className="flex absolute items-center justify-center inset-0 bg-opacity-15 bg-slate-600">
      <div className="flex flex-col justify-center bg-white m-5 p-5 shadow-md rounded-lg h-fit w-1/4">
        <label className="txt-modal">Finalizando etapa: {props.step}</label>
        <label className="txt2-modal ">¿Está seguro de continuar a la siguiente etapa de {props.nextStep}?</label>
        <label className="txt3-modal">No podrá modificar los datos una vez que continue</label>
        <div className="flex flex-row justify-between w-full px-5 sm:flex-wrap">
            <button onClick={() => {props.onNext()}} className="btn">Continuar</button>
            <button onClick={() => {props.setShowModal(false)}}className="btn2-cancel">Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
