import { Trans } from '@lingui/react';
import { BaseEmail } from 'src/components/BaseEmail';
import { CallToAction } from 'src/components/CallToAction';
import { MainText } from 'src/components/MainText';
import { Title } from 'src/components/Title';
import { createI18nInstance } from 'src/utils/i18n.utils';
import { type APP_LOCALES } from 'twenty-shared/translations';

type SendEmailVerificationLinkEmailProps = {
  link: string;
  locale: keyof typeof APP_LOCALES;
};

export const SendEmailVerificationLinkEmail = ({
  link,
  locale,
}: SendEmailVerificationLinkEmailProps) => {
  const i18n = createI18nInstance(locale);

  return (
    <BaseEmail width={333} locale={locale}>
      <Title value={i18n._('Confirm your email address')} />
      <MainText>
        <Trans id="Спасибо за регистрацию аккаунта в Liddex! Перед тем как начать, нам нужно подтвердить, что это действительно вы. Нажмите кнопку ниже, чтобы подтвердить ваш email адрес." />
      </MainText>
      <br />
      <CallToAction href={link} value={i18n._('Verify Email')} />
      <br />
      <br />
    </BaseEmail>
  );
};

SendEmailVerificationLinkEmail.PreviewProps = {
  link: 'https://app.twenty.com/verify-email/123',
  locale: 'en',
};

export default SendEmailVerificationLinkEmail;
