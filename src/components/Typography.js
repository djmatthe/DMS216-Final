import React from 'react';
import styled from 'styled-components'


const Title = styled.div`
  font-family: Jumbo Regular;
  font-size: ${({size}) => size}px;
  color: ${({color}) => color};
  margin: auto;
`

const Typography = ({children, size, color}) => {
  return (
    <Title size={size} color={color}>
        {children}
    </Title>
  );
}

export default Typography;
