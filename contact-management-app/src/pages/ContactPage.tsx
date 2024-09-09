import ContactForm from '../components/ContactForm';
import ContactList from '../components/ContactList';

const ContactPage = () => {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Contact Management</h1>
      <ContactForm />
      <ContactList />
    </div>
  );
};

export default ContactPage;
