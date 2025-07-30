interface BusinessDomain {
  value: string;
  name: string;
}

interface NewDataProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  businessDomains: BusinessDomain[];
  owners: any[];
}