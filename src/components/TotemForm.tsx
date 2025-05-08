import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import FileUpload from './FileUpload';
import { uploadFileToIPFS, uploadJSONToIPFS } from '../utils/api';
import { createTotem } from '../utils/contracts';
import { ethers } from 'ethers';

interface TotemFormProps {
  provider: ethers.BrowserProvider | null;
}

interface FormData {
  name: string;
  symbol: string;
  description: string;
  socialLinks: {
    twitter: string;
    discord: string;
    website: string;
  };
  categories: string[];
}

const CATEGORIES = [
  'Art', 'Music', 'Gaming', 'Sports', 'Collectibles', 
  'Virtual Worlds', 'DeFi', 'Utility', 'Metaverse', 'Other'
];

const TotemForm: React.FC<TotemFormProps> = ({ provider }) => {
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const { 
    register, 
    handleSubmit, 
    control,
    formState: { errors } 
  } = useForm<FormData>({
    defaultValues: {
      name: '',
      symbol: '',
      description: '',
      socialLinks: {
        twitter: '',
        discord: '',
        website: ''
      },
      categories: []
    }
  });

  const validateUrl = (url: string) => {
    if (!url) return true;
    try {
      new URL(url);
      return true;
    } catch {
      return 'Please enter a valid URL';
    }
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      if (!avatarFile) {
        throw new Error('Please upload an avatar');
      }

      if (!provider) {
        throw new Error('Please connect your wallet');
      }

      // 1. Загружаем аватар в IPFS через серверный API
      const avatarUploadResult = await uploadFileToIPFS(avatarFile);

      if (!avatarUploadResult.success) {
        throw new Error('Error uploading avatar: ' + avatarUploadResult.error);
      }

      // 2. Формируем метаданные
      const metadata = {
        name: data.name,
        description: data.description,
        image: `ipfs://${avatarUploadResult.cid}`,
        social_links: data.socialLinks,
        categories: data.categories
      };

      // 3. Загружаем метаданные в IPFS через серверный API
      const metadataUploadResult = await uploadJSONToIPFS(metadata);

      if (!metadataUploadResult.success) {
        throw new Error('Error uploading metadata: ' + metadataUploadResult.error);
      }

      // 4. Вызываем смарт-контракт для создания тотема
      const totemResult = await createTotem(
        provider,
        metadataUploadResult.cid,
        data.name,
        data.symbol,
        [] // Пустой массив коллабораторов, можно добавить функционал позже
      );

      if (!totemResult.success) {
        throw new Error('Error creating totem: ' + totemResult.error);
      }

      setSuccess(`Totem successfully created! ID: ${totemResult.totemData?.totemId}, TX: ${totemResult.txHash}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Произошла неизвестная ошибка');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

      <div className="bg-gray-800/95 rounded-3xl border border-white/10 p-8 backdrop-blur-xl">
        <h2 className="text-2xl font-bold mb-6">Basic Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-gray-400 mb-2">Token Name</label>
            <input
              {...register('name', { required: 'Name is required' })}
              className={`w-full p-2 bg-white/5 border ${errors.name ? 'border-red-500' : 'border-white/10'} rounded-lg text-gray-100`}
              placeholder="Example: My Awesome Totem"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>
          
          <div>
            <label className="block text-gray-400 mb-2">Token Symbol</label>
            <input
              {...register('symbol', { required: 'Symbol is required' })}
              className={`w-full p-2 bg-white/5 border ${errors.symbol ? 'border-red-500' : 'border-white/10'} rounded-lg text-gray-100`}
              placeholder="Example: MAT"
            />
            {errors.symbol && <p className="text-red-500 text-sm mt-1">{errors.symbol.message}</p>}
          </div>
        </div>
        
        <FileUpload
          label="Totem Avatar"
          onFileSelect={(file) => setAvatarFile(file)}
          accept="image/png,image/jpeg,image/gif"
          error={!avatarFile && isSubmitting ? 'Avatar is required' : undefined}
        />
        
        <div className="mb-4">
          <label className="block text-gray-400 mb-2">Description</label>
          <textarea
            {...register('description', { required: 'Description is required' })}
            className={`w-full p-2 bg-white/5 border ${errors.description ? 'border-red-500' : 'border-white/10'} rounded-lg text-gray-100 min-h-[100px]`}
            placeholder="Describe your totem..."
          />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
        </div>
      </div>
      
      <div className="bg-gray-800/95 rounded-3xl border border-white/10 p-8 backdrop-blur-xl">
        <h2 className="text-2xl font-bold mb-6">Social Networks</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-gray-400 mb-2">Twitter</label>
            <input
              {...register('socialLinks.twitter', { validate: validateUrl })}
              className={`w-full p-2 bg-white/5 border ${errors.socialLinks?.twitter ? 'border-red-500' : 'border-white/10'} rounded-lg text-gray-100`}
              placeholder="https://twitter.com/username"
            />
            {errors.socialLinks?.twitter && <p className="text-red-500 text-sm mt-1">{errors.socialLinks.twitter.message}</p>}
          </div>
          
          <div>
            <label className="block text-gray-400 mb-2">Discord</label>
            <input
              {...register('socialLinks.discord', { validate: validateUrl })}
              className={`w-full p-2 bg-white/5 border ${errors.socialLinks?.discord ? 'border-red-500' : 'border-white/10'} rounded-lg text-gray-100`}
              placeholder="https://discord.gg/invite"
            />
            {errors.socialLinks?.discord && <p className="text-red-500 text-sm mt-1">{errors.socialLinks.discord.message}</p>}
          </div>
          
          <div>
            <label className="block text-gray-400 mb-2">Website</label>
            <input
              {...register('socialLinks.website', { validate: validateUrl })}
              className={`w-full p-2 bg-white/5 border ${errors.socialLinks?.website ? 'border-red-500' : 'border-white/10'} rounded-lg text-gray-100`}
              placeholder="https://example.com"
            />
            {errors.socialLinks?.website && <p className="text-red-500 text-sm mt-1">{errors.socialLinks.website.message}</p>}
          </div>
        </div>
      </div>
      
      <div className="bg-gray-800/95 rounded-3xl border border-white/10 p-8 backdrop-blur-xl">
        <h2 className="text-2xl font-bold mb-6">Categories</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          <Controller
            control={control}
            name="categories"
            rules={{ required: 'Select at least one category' }}
            render={({ field }) => (
              <>
                {CATEGORIES.map((category) => (
                  <div 
                    key={category}
                    onClick={() => {
                      const isSelected = field.value.includes(category);
                      if (isSelected) {
                        field.onChange(field.value.filter(c => c !== category));
                      } else {
                        field.onChange([...field.value, category]);
                      }
                    }}
                    className={`p-3 rounded-lg cursor-pointer text-center transition-colors ${
                      field.value.includes(category) 
                        ? 'bg-emerald-500/20 border border-emerald-500' 
                        : 'bg-white/5 border border-white/10 hover:bg-white/10'
                    }`}
                  >
                    {category}
                  </div>
                ))}
              </>
            )}
          />
        </div>
        {errors.categories && <p className="text-red-500 text-sm mt-3">{errors.categories.message}</p>}
      </div>
      
      {error && (
        <div className="bg-red-500/20 border border-red-500 rounded-lg p-4 text-red-100">
          {error}
        </div>
      )}
      
      {success && (
        <div className="bg-emerald-500/20 border border-emerald-500 rounded-lg p-4 text-emerald-100">
          {success}
        </div>
      )}
      
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-lg font-bold text-gray-900 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Creating Totem...' : 'Create Totem'}
      </button>
    </form>
  );
};

export default TotemForm;
