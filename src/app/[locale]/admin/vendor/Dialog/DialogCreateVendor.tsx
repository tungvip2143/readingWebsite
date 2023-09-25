import CommonStyles from 'components/CommonStyles';
import { isEmpty } from 'lodash';
import CreateVendor from '../Components/CreateVendor';
import { useTranslations } from 'next-intl';
import { Vendor } from 'modules/vendor/vendor.interface';

interface IProps {
  isOpen: boolean;
  toggle: () => void;
  vendor?: Vendor;
}

const DialogCreateVendor = (props: IProps) => {
  //! State
  const t = useTranslations();
  const { isOpen, toggle, vendor } = props;
  const isEdit = !isEmpty(vendor);

  //! Function

  //! Render
  return (
    <CommonStyles.Dialog
      title={isEdit ? t('Vendor.editHeading') : t('Vendor.addHeading')}
      content={<CreateVendor vendor={vendor} toggle={toggle} />}
      open={isOpen}
      toggle={toggle}
      disableClickOutside={false}
      maxWidth={'lg'}
    />
  );
};

export default DialogCreateVendor;
