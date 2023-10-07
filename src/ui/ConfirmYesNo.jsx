import styled from "styled-components";
import Button from "./Button";
import Heading from "./Heading";

const StyledConfirmYesNo = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

function ConfirmYesNo({ disabled, onLogout, onCloseModal }) {
  return (
    <StyledConfirmYesNo>
      <Heading as="h3">Are you sure close? </Heading>
      <p>Do you want exit?</p>

      <div>
        <Button
          variation="secondary"
          disabled={disabled}
          onClick={onCloseModal}
        >
          No
        </Button>
        <Button variation="danger" disabled={disabled} onClick={onLogout}>
          Yes
        </Button>
      </div>
    </StyledConfirmYesNo>
  );
}

export default ConfirmYesNo;
