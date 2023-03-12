import React, { useMemo } from "react";
import { IntlProvider } from "react-intl";
import { useSelector } from "react-redux";

const DEFAULTLOCALE = "zh-CN";

type LocaleProviderProps = {
  children?: React.ReactNode;
};

const LocaleProvider: React.FC<LocaleProviderProps> = ({ children }) => {
  const { currentLocale, locales } = useSelector(({ locale }) => locale);

  const { locale, messages } = useMemo(() => {
    const locale = locales[currentLocale];

    return {
      locale: locale ? currentLocale : DEFAULTLOCALE,
      messages: locale || locales[DEFAULTLOCALE],
    };
  }, [currentLocale, locales]);

  return (
    <IntlProvider messages={messages} locale={locale} defaultLocale={locale}>
      {children}
    </IntlProvider>
  );
};
export default LocaleProvider;
