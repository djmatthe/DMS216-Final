import React from 'react';
import styled from 'styled-components'


const Title = styled.div`
  font-family: Jumbo Regular;
  ${({size}) => 
    typeof(size) === "number"
      ? `font-size: ${size}px;`
      : `font-size: ${size};`
  }

  color: ${({color}) => color};
  margin: auto;
  text-align: center;
`

const Typography = ({children, size, color}) => {
  return (
    <Title size={size} color={color}>
        {children}
    </Title>
  );
}

export default Typography;
