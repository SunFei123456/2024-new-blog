import React, { useState } from 'react';
import { Plus } from 'react-feather';
import Alert from '@/components/common/Alert';
import request from '@/servers';
import Compressor from 'compressorjs';

interface UserInfoFormProps {
    onSubmit: (data: { avatar: File | string; nickname: string; webSite: string }) => void;
    onClose: () => void;
}

const UserInfoForm = ({ onSubmit, onClose }: UserInfoFormProps) => {
    const [avatar, setAvatar] = useState<File | null>(null);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
    const [nickname, setNickname] = useState('');
    const [webSite, setWebSite] = useState('');
    const [alert, setAlert] = useState<{ type: 'error' | 'warning' | 'success'; message: string } | null>(null);
    const [isDisabled, setIsDisabled] = useState(true);
    const [nicknameError, setNicknameError] = useState<string | null>(null);
    const [websiteError, setWebsiteError] = useState<string | null>(null);

    const default_avatar_url = `${import.meta.env.VITE_BASE_SERVER_URL}/static/avatars/default_avatar.webp`;

    const handleAvatarChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                setAlert({ type: 'error', message: '头像文件大小不能超过 2MB' });
                return;
            }

            try {
                console.log('原始图片大小：', file.size);
                const compressedFile = await new Promise<File>((resolve, reject) => {
                    new Compressor(file, {
                        quality: 0.2,
                        success(result) {
                            console.log('压缩后图片大小：', result.size);
                            resolve(result as File);
                        },
                        error(err) {
                            reject(err);
                        },
                    });
                });
                setAvatar(compressedFile);

                // 使用 FileReader 读取本地图片并生成预览
                const reader = new FileReader();
                reader.onloadend = () => {
                    setAvatarPreview(reader.result as string);
                };
                reader.readAsDataURL(compressedFile);

                // 上传图片到服务器
                const formData = new FormData();
                formData.append('image', compressedFile);

                const response = await request.post('/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                if (!response.data) {
                    setAlert({ type: 'error', message: '头像上传失败，请重试' });
                    return;
                }
                setAvatarUrl(response.data.data);
                setAlert({ type: 'success', message: '头像上传成功' });
            } catch (error) {
                setAlert({ type: 'error', message: '头像上传失败，请重试' });
            }
        }
    };

    const handleDefaultAvatar = () => {
        setAvatarUrl(default_avatar_url);
        setAvatarPreview(default_avatar_url); // 设置预览为默认头像
        setAlert({ type: 'success', message: '已使用默认头像' });
    };


    const handleAvatarClick = () => {
        document.getElementById('avatarInput')?.click();
    };

    const validateNickname = (name: string) => {
        if (name.length > 10) {
            setNicknameError('昵称不能超过 10 个字');
        } else if (!name.trim()) {
            setNicknameError('昵称不能为空');
        } else {
            setNicknameError(null);
        }
    };

    const validateWebsite = (site: string) => {
        const websiteRegex = /^https?:\/\/(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}.*$/;
        if (site && !websiteRegex.test(site)) {
            setWebsiteError('请输入有效的网站链接（如：https://www.example.com）');
        } else {
            setWebsiteError(null);
        }
    };

    const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.value;
        setNickname(name);
        validateNickname(name);
    };

    const handleWebsiteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const site = e.target.value;
        setWebSite(site);
        validateWebsite(site);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        if (!avatarUrl) {
            setAlert({ type: 'error', message: '请上传头像' });
            return;
        }

        if (!nickname.trim()) {
            setAlert({ type: 'error', message: '昵称不能为空' });
            return;
        }

        onSubmit({ avatar: avatarUrl, nickname, webSite });
    };

    React.useEffect(() => {
        if (avatarUrl && nickname.trim() && !nicknameError && !websiteError) {
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }
    }, [avatarUrl, nickname, nicknameError, websiteError]);

    return (
        <>
            <div className="flex items-center justify-center">
                <div className="w-96 p-2 rounded-lg space-y-4">
                    <h2 className="text-xl text-white font-bold mb-4 text-center">基本信息填写</h2>
                    <form onSubmit={handleSubmit} className="w-full flex flex-col justify-between items-center">
                        {/* Avatar Upload + nickname input */}
                        <div className="mb-4 w-full flex space-x-3">
                            <div className="avatar placeholder" onClick={handleAvatarClick}>
                                <div className="bg-neutral text-neutral-content w-24 h-24 rounded-full cursor-pointer">
                                    {avatarPreview ? (
                                        <img
                                            src={avatarPreview}
                                            alt="头像预览"
                                            className="rounded-full w-24 h-24 object-cover"
                                        />
                                    ) : (
                                        <Plus size={32} />
                                    )}
                                </div>
                            </div>
                            <div className="w-full">
                                <label className="block text-white font-medium mb-2" htmlFor="nickname">
                                    昵称
                                </label>
                                <input
                                    type="text"
                                    id="nickname"
                                    name="nickname"
                                    placeholder="请输入您的昵称"
                                    value={nickname}
                                    onChange={handleNicknameChange}
                                    className={`input input-bordered w-full ${nicknameError ? 'border-red-500' : ''}`}
                                />
                                {nicknameError && <small className="text-red-500">{nicknameError}</small>}
                            </div>
                        </div>

                        {/* Website */}
                        <div className="mb-4 w-full">
                            <label className="block text-white font-medium mb-2" htmlFor="website">
                                个人网站
                            </label>
                            <input
                                type="text"
                                id="website"
                                name="website"
                                value={webSite}
                                onChange={handleWebsiteChange}
                                placeholder="请输入您的个人网站（可选）"
                                className={`input input-bordered w-full ${websiteError ? 'border-red-500' : ''}`}
                            />
                            {websiteError && <span className="text-xs text-orange-400 ">{websiteError}</span>}
                            {!websiteError && <span className="text-xs text-gray-400">填写个人网站的链接（如果有的话）</span>}
                        </div>

                        {/* Hidden file input for avatar */}
                        <input
                            type="file"
                            id="avatarInput"
                            name="avatar"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={handleAvatarChange}
                        />

                        {/* Submit Button */}
                        <div className="w-full space-x-4">
                            <button disabled={isDisabled} type="submit" className="btn btn-success text-white">
                                提交
                            </button>
                            <button type="button" className="btn btn-warning text-white" onClick={onClose}>
                                取消
                            </button>
                            <button type="button" className="btn btn-info text-white" onClick={handleDefaultAvatar}>
                                使用默认头像
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {alert && <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}
        </>
    );
};

export default UserInfoForm;