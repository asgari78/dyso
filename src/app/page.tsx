import React from 'react';
import Header from '@/src/components/main/header/Header';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      
      <main className="flex-grow w-full max-w-[1440px] mx-auto px-4 py-8">
        <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl p-20 text-center">
          <h2 className="text-gray-400 font-medium">محتوای صفحه اصلی در مراحل بعدی اضافه می‌شود</h2>
        </div>
      </main>

      {/* <MobileBottomNav /> */}
    </div>
  );
}
