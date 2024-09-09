import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from '../redux/contactSlice';
import { Link } from 'react-router-dom';

const ContactList = () => {
  const contacts = useSelector((state: any) => state.contacts.contacts);
  const dispatch = useDispatch();

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold text-center mb-6">Contact List</h2>
      {contacts.length === 0 ? (
        <p className="text-center text-gray-500">No Contacts Found</p>
      ) : (
        <div className="space-y-4">
          {contacts.map((contact: any) => (
            <div
              key={contact.id}
              className="flex justify-between items-center bg-gray-100 p-4 rounded-lg"
            >
              <div>
                <p className="text-lg font-semibold">
                  {contact.firstName} {contact.lastName}
                </p>
                <p
                  className={`text-sm ${
                    contact.status === 'Active' ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {contact.status}
                </p>
              </div>

              <div className="flex items-center space-x-4">
                {/* Edit Button */}
                <Link
                  to={`/edit/${contact.id}`}
                  className="bg-blue-500 text-white py-1 px-3 rounded-lg hover:bg-blue-600 transition duration-300"
                >
                  Edit
                </Link>
                {/* Delete Button */}
                <button
                  onClick={() => dispatch(deleteContact(contact.id))}
                  className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600 transition duration-300"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContactList;
