import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { editContact } from '../redux/contactSlice';

const EditContact = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const contact = useSelector((state: any) =>
    state.contacts.contacts.find((c: any) => c.id === id)
  );

  const [firstName, setFirstName] = useState(contact?.firstName || '');
  const [lastName, setLastName] = useState(contact?.lastName || '');
  const [status, setStatus] = useState(contact?.status || 'Inactive');

  const handleSubmit = () => {
    if (id) {
      dispatch(editContact({ id, firstName, lastName, status }));
      navigate('/');
    } else {
      console.error('ID is undefined');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 mt-8">
      <h2 className="text-2xl font-bold text-center mb-6">Edit Contact</h2>

      {/* First Name Input */}
      <div className="space-y-4">
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
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Save Edited Contact
        </button>
      </div>
    </div>
  );
};

export default EditContact;
