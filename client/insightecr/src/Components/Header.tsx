import React from 'react';

const Header: React.FC<{ title: string }> = ({ title }) => {
  return (
    <header>
      <h3>{title}</h3>
    </header>
  );
}

export default Header;