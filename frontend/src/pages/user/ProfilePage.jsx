import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { fetchMeThunk } from '../../store/slices/authSlice';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      dispatch(fetchMeThunk());
    }
  }, [user, dispatch]);

  if (loading && !user) return <LoadingSpinner />;
  if (!user) return <div className="container-page">Profile not found.</div>;

  return (
    <div className="container-page max-w-lg">
      <div className="bg-white rounded-lg shadow-sm p-6 space-y-3">
        <h1 className="text-xl font-semibold mb-2">My Profile</h1>
        <div className="space-y-1 text-sm">
          <p>
            <span className="font-medium">Name: </span>
            {user.name}
          </p>
          <p>
            <span className="font-medium">Email: </span>
            {user.email}
          </p>
          <p>
            <span className="font-medium">Phone: </span>
            {user.phone || '-'}
          </p>
          <p>
            <span className="font-medium">Role: </span>
            {user.role}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

