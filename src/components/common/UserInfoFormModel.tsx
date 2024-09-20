import React from 'react';
import { useState } from 'react';

interface UserInfoFormProps {
    onSubmit: (data: { avatar: string; nickname: string }) => void;
}

const UserInfoForm = ({ onSubmit }: UserInfoFormProps) => {
    const [avatar, setAvatar] = useState('😼');
    const [nickname, setNickname] = useState('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onSubmit({ avatar, nickname });
    };

    return (
        <>
            <div className="flex items-center justify-center">
                <div className="w-96 p-2 rounded-lg space-y-4">
                    <h2 className="text-2xl text-white font-bold mb-4 text-center">基础信息表单</h2>
                    <form onSubmit={handleSubmit} className='w-full flex flex-col justify-between items-center'>
                        {/* Avatar URL Input */}
                        <div className="mb-4 w-full flex space-x-3">
                            <div className="avatar placeholder">
                                <div className="bg-neutral text-neutral-content w-24 rounded-full">
                                    <span className="text-3xl">{avatar}</span>
                                </div>
                            </div>
                            <div className="w-full">
                                <label className="block text-sm font-medium text-white mb-2" htmlFor="nickname">
                                    姓氏
                                </label>
                                <input
                                    type="text"
                                    id="nickname"
                                    name="nickname"
                                    placeholder="请输入您的姓氏"
                                    value={avatar}
                                    onChange={(e) => setAvatar(e.target.value)}
                                    className="input input-bordered w-full"
                                />
                            </div>
                        </div>

                        {/* Nickname Input */}
                        <div className="mb-4 w-full">
                            <label className="block text-sm font-medium text-white mb-2" htmlFor="nickname">
                                昵称
                            </label>
                            <input
                                type="text"
                                id="nickname"
                                name="nickname"
                                placeholder="请输入您的昵称"
                                value={nickname}
                                onChange={(e) => setNickname(e.target.value)}
                                className="input input-bordered w-full"
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="w-full space-x-4">
                            <button type="submit" className="btn btn-sm btn-success text-white">
                                Submit
                            </button>
                            <button type="button" className="btn btn-sm btn-warning">
                                Close
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </>
    );
};

export default UserInfoForm;
