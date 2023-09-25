import CommonStyles from 'components/CommonStyles';
import { isEmpty } from 'lodash';
import { Tour } from 'modules/tour/tour.interface';
import CreateTour from '../Components/CreateTour';
import { useTranslations } from 'next-intl';

interface IProps {
  isOpen: boolean;
  toggle: () => void;
  tour?: Tour;
}

const DialogCreateTour = (props: IProps) => {
  //! State
  const t = useTranslations();
  const { isOpen, toggle, tour } = props;
  const isEdit = !isEmpty(tour);

  //! Function

  //! Render
  return (
    <CommonStyles.Dialog
      title={isEdit ? t('Tour.editTour') : t('Tour.addTour')}
      content={<CreateTour tour={tour} toggle={toggle} />}
      open={isOpen}
      toggle={toggle}
      disableClickOutside={false}
      maxWidth={'lg'}
    />
  );
};

export default DialogCreateTour;
