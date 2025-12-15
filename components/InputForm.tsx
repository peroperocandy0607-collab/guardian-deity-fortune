import React, { useState } from 'react';
import { UserInput } from '../types';

interface InputFormProps {
  onSubmit: (data: UserInput) => void;
  isLoading: boolean;
}

const InputForm: React.FC<InputFormProps> = ({ onSubmit, isLoading }) => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [gender, setGender] = useState<'male' | 'female' | 'other'>('female');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !name) return;
    onSubmit({ birthDate: date, birthTime: time, gender, name });
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-beige-200 fade-in">
      <h2 className="text-2xl font-serif text-center mb-6 text-stone-700 tracking-widest">
        情報の入力
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Name */}
        <div>
            <label className="block text-sm font-medium text-stone-600 mb-1 font-sans">お名前（ニックネーム可）</label>
            <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-beige-400 focus:border-beige-400 outline-none transition-all bg-stone-50 text-stone-800"
                placeholder="例：山田 花子"
            />
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block text-sm font-medium text-stone-600 mb-1 font-sans">生年月日 <span className="text-red-400 text-xs">*必須</span></label>
          <input
            type="date"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-beige-400 focus:border-beige-400 outline-none transition-all bg-stone-50 text-stone-800 font-sans"
          />
        </div>

        {/* Time of Birth */}
        <div>
          <label className="block text-sm font-medium text-stone-600 mb-1 font-sans">出生時刻 <span className="text-stone-400 text-xs">（不明な場合は空欄）</span></label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-beige-400 focus:border-beige-400 outline-none transition-all bg-stone-50 text-stone-800 font-sans"
          />
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-medium text-stone-600 mb-2 font-sans">性別</label>
          <div className="flex gap-4">
            <label className="flex-1 cursor-pointer">
              <input
                type="radio"
                name="gender"
                value="female"
                checked={gender === 'female'}
                onChange={() => setGender('female')}
                className="sr-only peer"
              />
              <div className="text-center py-3 rounded-lg border border-stone-300 peer-checked:bg-beige-100 peer-checked:border-beige-500 peer-checked:text-stone-800 text-stone-500 transition-all hover:bg-stone-100 font-sans">
                女性
              </div>
            </label>
            <label className="flex-1 cursor-pointer">
              <input
                type="radio"
                name="gender"
                value="male"
                checked={gender === 'male'}
                onChange={() => setGender('male')}
                className="sr-only peer"
              />
              <div className="text-center py-3 rounded-lg border border-stone-300 peer-checked:bg-beige-100 peer-checked:border-beige-500 peer-checked:text-stone-800 text-stone-500 transition-all hover:bg-stone-100 font-sans">
                男性
              </div>
            </label>
            <label className="flex-1 cursor-pointer">
              <input
                type="radio"
                name="gender"
                value="other"
                checked={gender === 'other'}
                onChange={() => setGender('other')}
                className="sr-only peer"
              />
              <div className="text-center py-3 rounded-lg border border-stone-300 peer-checked:bg-beige-100 peer-checked:border-beige-500 peer-checked:text-stone-800 text-stone-500 transition-all hover:bg-stone-100 font-sans">
                その他
              </div>
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-beige-500 hover:bg-beige-600 text-white font-serif font-bold py-4 rounded-lg shadow-md transition-all duration-300 transform hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed mt-4 tracking-widest text-lg"
        >
          {isLoading ? '守護神と交信中...' : '鑑定する'}
        </button>
      </form>
    </div>
  );
};

export default InputForm;
