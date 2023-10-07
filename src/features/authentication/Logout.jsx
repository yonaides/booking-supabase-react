import { HiArrowRightOnRectangle } from "react-icons/hi2";
import ButtonIcon from "../../ui/ButtonIcon";
import { useLogout } from "./useLogout";
import SpinnerMini from "../../ui/SpinnerMini";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import ConfirmYesNo from "../../ui/ConfirmYesNo";

function Logout() {
  const { logout, isLoading } = useLogout();

  return (
    <>
      <Modal>
        <Modal.Open opens="close">
          <ButtonIcon disabled={isLoading}>
            {!isLoading ? <HiArrowRightOnRectangle /> : <SpinnerMini />}
          </ButtonIcon>
        </Modal.Open>

        <Modal.Window name="close">
          <ConfirmYesNo isLoading={isLoading} onLogout={logout} />
        </Modal.Window>
      </Modal>

      {/*<ButtonIcon disabled={isLoading} onClick={logout}>
        {!isLoading ? <HiArrowRightOnRectangle /> : <SpinnerMini />}
  </ButtonIcon>*/}
    </>
  );
}

export default Logout;
