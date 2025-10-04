import { Column, Container, Row } from '@react-email/components';
import { Link } from 'src/components/Link';
import { ShadowText } from 'src/components/ShadowText';

const footerContainerStyle = {
  marginTop: '12px',
};

export const Footer = () => {
  return (
    <Container style={footerContainerStyle}>
      <Row>
        <Column>
          <ShadowText>
            <Link
              href="https://liddex.ru/"
              value="Сайт"
              aria-label="Посетить сайт Liddex"
            />
          </ShadowText>
        </Column>
      </Row>
      <ShadowText>
        <>
          Liddex.ru
          <br />
          Россия
        </>
      </ShadowText>
    </Container>
  );
};
