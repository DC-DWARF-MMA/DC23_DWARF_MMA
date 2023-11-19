import { useState } from 'react';
import axios from 'axios';
import { API_SEND_EMAIL_URL, MULTIPART_FORM_DATA_HEADER } from '../models/constants';
import { useInvoice } from '../services/InvoiceService';

const useEmailSender = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // const { invoice, fetchInvoice } = useInvoice(contract);

  const sendEmail = async (email: string, text: string, pdfInvoiceFile: Blob) => {
    try {
      setIsLoading(true);

      const formData = new FormData();

      formData.append('to', email);
      formData.append('subject', 'Wiadomość od Dwarf MMA');
      formData.append('text', text);

      let file = new File([pdfInvoiceFile], 'invoice.pdf', { type: 'application/pdf' });
      
      formData.append('attachment', file, 'invoice.pdf');

      await axios.post(API_SEND_EMAIL_URL, formData, MULTIPART_FORM_DATA_HEADER);

      setIsLoading(false);
    } catch (error) {
      setError("Email nie został wysłany. Może to wynikać z problemami z serwerem.");
      setIsLoading(false);
    }
  };

  return {
    sendEmail,
    isLoading,
    error,
  };
};

export default useEmailSender;