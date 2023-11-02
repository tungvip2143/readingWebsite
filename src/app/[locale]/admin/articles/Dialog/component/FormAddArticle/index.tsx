import { useTheme } from '@mui/material';
import CommonStyles from 'components/CommonStyles';
import { modalAction } from 'constants/common';
import useConstants from 'hooks/useConstants';
import { useTranslations } from 'next-intl';
import React from 'react';

interface Props {
  actionStatus?: string;
}

const FormAddArticle = ({ actionStatus }: Props) => {
  //! State
  const { optionsFemaleOrMale, optionsYesOrNo } = useConstants();
  const theme = useTheme();
  const t = useTranslations();
  const isDisabled = actionStatus === modalAction.DETAILS;

  //! Css

  //! Function

  //! Render
  return <CommonStyles.Box></CommonStyles.Box>;
};

export default FormAddArticle;
