import Cookies from 'node_modules/@types/js-cookie';
import React, { useState, useEffect } from 'react';
import ExternalApiSettings from '~/components/chat/ExternalApiSettings';

const DataManagementPage: React.FC = () => {
  const [apiUrl, setApiUrl] = useState<string>(Cookies.get('externalApiUrl') || '');

  useEffect(() => {
    // Load saved API URL from cookies
    const savedUrl = Cookies.get('externalApiUrl');
    if (savedUrl) {
      setApiUrl(savedUrl);
    }
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Data Management</h1>
      <ExternalApiSettings apiUrl={apiUrl} setApiUrl={setApiUrl} />
      {/* 其他 Data Management 页面的内容 */}
    </div>
  );
};

export default DataManagementPage;
