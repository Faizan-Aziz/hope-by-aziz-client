import React from 'react';
import PageTitle from '../../../componenets/page-title';
import useUserStore from '../../../store/UserStore';
import dayjs from 'dayjs';
import { useState } from 'react';
import { Input, Button, Alert, message } from 'antd';
import axios from 'axios';

const ProfilePage = () => {
  const { currentUser } = useUserStore();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const validatePassword = (password: string) => {
    const errors = [];
    if (password.length < 8) {
      errors.push("Password must be at least 8 characters");
    }
    if (!/\d/.test(password)) {
      errors.push("Password must contain at least one number");
    }
    setPasswordErrors(errors);
    return errors.length === 0;
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewPassword(value);
    validatePassword(value);
  };

  const handleUpdatePassword = async () => {
    if (!validatePassword(newPassword)) return;
    if (!oldPassword) {
      message.error('Please enter your old password');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.put('/api/users/change-password', {
        userId: currentUser?._id,
        oldPassword,
        newPassword
      });

      if (response.data.success) {
        message.success('Password updated successfully');
        // Update user in store if needed
        setOldPassword("");
        setNewPassword("");
      } else {
        message.error(response.data.message || 'Failed to update password');
      }
    } catch (error: any) {
      message.error(error.response?.data?.message || 'Error updating password');
    } finally {
      setLoading(false);
    }
  };

  const getUserProperty = (key: string, value: string) => {
    return (
      <div className='flex flex-col'>
        <span className='text-sm'>{key}</span>
        <span className='font-bold text-gray-500'>{value}</span>
      </div>
    );
  };

  return (
    <div>
      <PageTitle title="Profile" />
      
      {/* User Information Section */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-7'>
        {getUserProperty("ID", currentUser?._id || "")}
        {getUserProperty("Name", currentUser?.name || "")}
        {getUserProperty("Email", currentUser?.email || "")}
        {getUserProperty("Role", currentUser?.isAdmin ? "Admin" : "User")}
        {getUserProperty("Created At", dayjs(currentUser?.createdAt).format('MMM DD YYYY, hh:mm A') || "")}
        {getUserProperty("Updated At", dayjs(currentUser?.updatedAt).format('MMM DD YYYY, hh:mm A') || "")}
      </div>

      {/* Change Password Section */}
      <div className='mt-7 border border-gray-300 p-5 rounded-lg'>
        <h1 className="text-lg font-semibold text-[rgb(26,54,54)] mb-5">Change Password</h1>
        
        <div className='flex flex-col space-y-4'>
          <div className='flex flex-col'>
            <label htmlFor="oldPassword" className='text-sm mb-1'>Old Password</label>
            <Input.Password
              id="oldPassword"
              placeholder="Enter old password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>

          <div className='flex flex-col'>
            <label htmlFor="newPassword" className='text-sm mb-1'>New Password</label>
            <Input.Password
              id="newPassword"
              placeholder="Enter new password"
              value={newPassword}
              onChange={handlePasswordChange}
            />
            {passwordErrors.length > 0 && (
              <div className="mt-2">
                {passwordErrors.map((error, index) => (
                  <Alert 
                    key={index} 
                    message={error} 
                    type="error" 
                    showIcon 
                    className="mb-1"
                  />
                ))}
              </div>
            )}
          </div>

          <Button 
            type="primary" 
            className='mt-4 w-fit'
            disabled={passwordErrors.length > 0 || !newPassword || !oldPassword}
            onClick={handleUpdatePassword}
            loading={loading}
          >
            Update Password
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;