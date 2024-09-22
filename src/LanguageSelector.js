import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import english from './imageedit_2_5018976713.png'
import arabic from "./imageedit_3_6383815552.png"

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  useEffect(() => {
    document.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);
  return (
    <div>
      <p
        onClick={async (e) => {
          await i18n.changeLanguage(i18n.language === 'en' ? 'ar' : 'en');
        }}
        className="font-bold flex items-center text-[30px] text-[#4bb27e] cursor-pointer"
        style={{
            fontFamily : '"Readex Pro", sans-serif'
        }}
      > 
        {i18n.language === 'en' ? <img src={arabic} alt="ع" style={{
            width : "40px"
        }} />: <img src={english} alt="En" style={{
            width : "50px"
        }} />}
      </p>
    </div>
  );
};

export default LanguageSelector;
