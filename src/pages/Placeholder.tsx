import React from 'react';
import { Layout } from '../components/Layout';

const Placeholder: React.FC<{ title: string }> = ({ title }) => {
  return (
    <Layout>
      <div className="max-w-2xl mx-auto py-16 text-center">
        <h1 className="text-3xl font-bold mb-3">{title}</h1>
        <p className="text-gray-500">Раздел в разработке. Основной функционал доступен на Главной и в просмотре видео.</p>
      </div>
    </Layout>
  );
};

export default Placeholder;
