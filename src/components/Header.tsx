import React from 'react';
import Link from 'next/link';
import { Button } from 'reactstrap';
import styled from 'styled-components';
import useAuth from '../hooks/auth';

type Props = {
  pathname?: string;
};

const Header: React.FC<Props> = ({ pathname }) => {
  const { handleLogout } = useAuth();
  return (
    <Wrapper className="container">
      <div>
        <Link href="/users">
          <a className={pathname === '/' ? 'is-active' : ''}>トップ</a>
        </Link>
      </div>
      <div>
        <Button outline size="sm" onClick={handleLogout}>
          ログアウト
        </Button>
      </div>
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled.header`
  display: flex;
  justify-content: space-between;
  padding-top: 20px;
`;
