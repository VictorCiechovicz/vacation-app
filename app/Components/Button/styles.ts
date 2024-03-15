import styled from 'styled-components'

export const ButtonStyled = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  color: ${props => props.theme.colorGrey2};
  z-index: 5;
  cursor: pointer;

  transition: all 0.55s ease-in-out;

  i {
    margin-right: 1rem;
    color: ${props => props.theme.colorGrey2};
    font-size: 1.5rem;
    transition: all 0.55s ease-in-out;
  }

  &:hover {
    color: ${props => props.theme.colorGrey0};
    i {
      color: ${props => props.theme.colorGrey0};
    }
  }
`
