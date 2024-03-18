import styled from 'styled-components'

export const CreateContentStyled = styled.form`
  > h1 {
    font-size: clamp(1.2rem, 5vw, 1.6rem);
    font-weight: 600;
  }

  color: ${props => props.theme.colorGrey1};

  .input-control {
    position: relative;
    margin: 0.5rem 0;
    font-weight: 200;

    @media screen and (max-width: 450px) {
      margin: 1rem 0;
    }

    label {
      margin-bottom: 0.5rem;
      display: inline-block;
      font-size: clamp(0.9rem, 5vw, 1rem);

      span {
        color: ${props => props.theme.colorGrey3};
      }
    }

    input,
    textarea {
      width: 100%;
      padding: 1rem;

      resize: none;
      background-color: ${props => props.theme.colorGreyDark};
      color: ${props => props.theme.colorGrey2};
      border-radius: 0.5rem;
    }
  }

  .submit-btn button {
    transition: all 0.35s ease-in-out;

    @media screen and (max-width: 500px) {
      font-size: 0.9rem !important;
      padding: 0.6rem 1rem !important;

      i {
        font-size: 1.2rem !important;
        margin-right: 0.5rem !important;
      }
    }

    i {
      color: ${props => props.theme.colorGrey0};
    }

    &:hover {
      background: ${props => props.theme.colorPrimaryGreen} !important;
      color: ${props => props.theme.colorWhite} !important;
    }
  }

  .toggler {
    display: flex;
    align-items: center;
    justify-content: space-between;

    cursor: pointer;

    label {
      flex: 1;
    }

    input {
      width: initial;
    }
  }
`
export const ModalStyled = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 100;

  display: flex;
  justify-content: center;
  align-items: center;

  .modal-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.45);
    filter: blur(4px);
  }

  .modal-content {
    margin: 0 1rem;

    padding: 2rem;
    position: relative;
    max-width: 630px;
    width: 100%;
    z-index: 100;

    border-radius: 1rem;
    background-color: ${props => props.theme.colorBg2};
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.3);
    border-radius: ${props => props.theme.borderRadiusMd2};

    @media screen and (max-width: 450px) {
      font-size: 90%;
    }
  }
`
