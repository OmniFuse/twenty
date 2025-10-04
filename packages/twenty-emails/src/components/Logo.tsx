import { Img } from '@react-email/components';

const logoStyle = {
  marginBottom: '40px',
};

export const Logo = () => {
  return (
    <Img
      src="https://cdn.chatall.ru/liddex.png"
      alt="Liddex logo"
      width="40"
      height="40"
      style={logoStyle}
    />
  );
};
