import CommonStyles from 'components/CommonStyles';
import useToggleDialog from 'hooks/useToggleDialog';
import React from 'react';
import DialogConfirm from 'components/DialogConfirm';
import { useTranslations } from 'next-intl';
import CommonIcons from 'components/CommonIconsMui';
import { useTheme } from '@mui/material';
import DialogViewDetails from '../Dialog/DialogViewDetails';
import { Article } from 'modules/article/article.interface';
import articleServices from 'modules/article/article.services';
import cachedKeys from 'constants/cachedKeys';
import { useGet } from 'stores/useStore';
import { showError, showSuccess } from 'helpers/toast';

interface ICellActions {
  article: Article;
}

const CellActions = (props: ICellActions) => {
  //! State
  const t = useTranslations();
  const theme = useTheme();
  const { article } = props;
  const { shouldRender: shouldRenderEdit, open: openEdit, toggle: toggleEdit } = useToggleDialog();
  const {
    shouldRender: shouldRenderDelete,
    open: openDelete,
    toggle: toggleDelete,
  } = useToggleDialog();
  const refetchListArticle = useGet(cachedKeys.refetchListArticle);
  //! Function
  const handleEdit = () => {
    toggleEdit();
  };

  const handleDelete = async () => {
    try {
      const response = await articleServices.deleteArticle({ id: article?._id });
      if (response.status === 200 || response.status === 201) {
        showSuccess(t('Common.success'));
        refetchListArticle();
      }
    } catch (error) {
      showError(error);
    }
  };

  //! Render
  return (
    <>
      {shouldRenderEdit && (
        <DialogViewDetails isOpen={openEdit} toggle={toggleEdit} id={article?._id} />
      )}
      {shouldRenderDelete && (
        <DialogConfirm
          open={openDelete}
          toggle={toggleDelete}
          title={t('Articles.dialogDeleteTitle')}
          content={t('Articles.dialogDeleteContent')}
          footer={
            <>
              <CommonStyles.Button
                variant='text'
                onClick={toggleDelete}
                sx={{ marginRight: '0.625rem' }}
              >
                {t('Common.cancel')}
              </CommonStyles.Button>
              <CommonStyles.Button type='button' onClick={handleDelete}>
                {t('Common.ok')}
              </CommonStyles.Button>
            </>
          }
        />
      )}

      <CommonStyles.Box sx={{ display: 'flex', gap: 1 }}>
        <CommonStyles.Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            padding: '0.5rem 0.75rem',
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: 'rgba(25, 118, 210, 0.04)',
              borderRadius: '0.625rem',
            },
          }}
        >
          <CommonIcons.EditIcon onClick={handleEdit} sx={{ color: theme.colors?.primary500 }} />
        </CommonStyles.Box>
        <CommonStyles.Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            padding: '0.5rem 0.75rem',
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: 'rgba(25, 118, 210, 0.04)',
              borderRadius: '0.625rem',
            },
          }}
        >
          <CommonIcons.DeleteIcon onClick={toggleDelete} sx={{ color: theme.colors?.red500 }} />
        </CommonStyles.Box>
      </CommonStyles.Box>
    </>
  );
};

export default CellActions;
