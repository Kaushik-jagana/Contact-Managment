import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addContact } from '../redux/contactSlice';
import { v4 as uuidv4 } from 'uuid';

const ContactForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [status, setStatus] = useState<'Active' | 'Inactive'>('Inactive');

  const dispatch = useDispatch();

  const isFormValid = firstName.trim() !== '' && lastName.trim() !== '';

  const handleSubmit = () => {
    if (isFormValid) {
      dispatch(
        addContact({
          id: uuidv4(),
          firstName,
          lastName,
          status,
        })
      );
      setFirstName('');
      setLastName('');
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-bold text-center mb-6">Add New Contact</h2>

      <div className="space-y-4">
        {/* First Name Input */}
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First Name"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Last Name Input */}
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last Name"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Status Radio Buttons */}
        <div className="flex items-center space-x-4">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              value="Active"
              checked={status === 'Active'}
              onChange={() => setStatus('Active')}
              className="form-radio text-blue-600"
            />
            <span>Active</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              value="Inactive"
              checked={status === 'Inactive'}
              onChange={() => setStatus('Inactive')}
              className="form-radio text-blue-600"
            />
            <span>Inactive</span>
          </label>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className={`w-full py-2 px-4 rounded-lg ${
            isFormValid
              ? 'bg-blue-500 hover:bg-blue-600 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          } transition duration-300`}
          disabled={!isFormValid} // Disable the button if form is invalid
        >
          Add Contact
        </button>
      </div>
    </div>
  );
};

export default ContactForm;
