import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

// Configure Toastr with width settings
toastr.options = {
  closeButton: true,
  debug: false,
  newestOnTop: true,
  progressBar: true,
  positionClass: 'toast-top-right',
  preventDuplicates: false,
  showDuration: 300,
  hideDuration: 1000,
  timeOut: 5000,
  extendedTimeOut: 1000,
  showEasing: 'swing',
  hideEasing: 'linear',
  showMethod: 'fadeIn',
  hideMethod: 'fadeOut',
  tapToDismiss: false
};

// Add custom width styles
const toastrWidthStyles = `
  .toast {
    width: 450px !important;
    min-width: 450px !important;
    max-width: 90vw !important;
  }
  .toast-message {
    padding: 12px 20px !important;
    font-size: 14px !important;
    line-height: 1.4 !important;
  }
`;

const styleTag = document.createElement('style');
styleTag.innerHTML = toastrWidthStyles;
document.head.appendChild(styleTag);