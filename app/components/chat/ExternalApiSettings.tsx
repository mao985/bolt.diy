import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { IconButton } from '~/components/ui/IconButton';

interface ExternalApiSettingsProps {
  apiUrls: string[];
  setApiUrls: (urls: string[]) => void;
}

export const ExternalApiSettings: React.FC<ExternalApiSettingsProps> = ({ apiUrls, setApiUrls }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempUrls, setTempUrls] = useState(apiUrls || []);

  useEffect(() => {
    // Load saved API URLs from cookies on component mount
    const savedUrls = Cookies.get('externalApiUrls');
    if (savedUrls) {
      setTempUrls(JSON.parse(savedUrls));
      setApiUrls(JSON.parse(savedUrls));
    }
  }, [setApiUrls]);

  const handleSave = () => {
    // Save to parent state
    setApiUrls(tempUrls);

    // Save to cookies
    Cookies.set('externalApiUrls', JSON.stringify(tempUrls));

    setIsEditing(false);
  };

  const handleAddUrl = () => {
    setTempUrls([...tempUrls, '']);
  };

  const handleUrlChange = (index: number, value: string) => {
    const newUrls = [...tempUrls];
    newUrls[index] = value;
    setTempUrls(newUrls);
  };

  const handleDeleteUrl = (index: number) => {
    const newUrls = tempUrls.filter((_, i) => i !== index);
    setTempUrls(newUrls);

    // Delete from cookies
    const updatedUrls = Cookies.get('externalApiUrls');
    if (updatedUrls) {
      const parsedUrls = JSON.parse(updatedUrls);
      parsedUrls.splice(index, 1);
      Cookies.set('externalApiUrls', JSON.stringify(parsedUrls));
    }
  };

  const handleSaveUrl = (index: number, value: string) => {
    const newUrls = [...tempUrls];
    newUrls[index] = value;
    setTempUrls(newUrls);

    // Save to cookies
    Cookies.set('externalApiUrls', JSON.stringify(newUrls));
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between py-3 px-1">
        <div className="flex items-center gap-2 flex-1">
          <span className="text-sm font-medium text-bolt-elements-textSecondary">UDS External API URLs:</span>
        </div>
        <IconButton onClick={handleAddUrl} title="Add API URL" className="bg-blue-500/10 hover:bg-blue-500/20 text-blue-500">
          <div className="i-ph:plus w-4 h-4" />
        </IconButton>
      </div>

      {tempUrls.map((url, index) => (
        <div key={index} className="flex items-center justify-between py-3 px-1">
          <div className="flex items-center gap-2 flex-1">
            <input
              type="text"
              value={url}
              placeholder="Enter API URL"
              onChange={(e) => handleUrlChange(index, e.target.value)}
              className="w-[600px] px-3 py-1.5 text-sm rounded border border-bolt-elements-borderColor 
                        bg-bolt-elements-prompt-background text-bolt-elements-textPrimary 
                        focus:outline-none focus:ring-2 focus:ring-bolt-elements-focus"
            />
            <IconButton
              onClick={() => handleSaveUrl(index, url)}
              title="Save API URL"
              className="bg-green-500/10 hover:bg-green-500/20 text-green-500"
            >
              <div className="i-ph:check w-4 h-4" />
            </IconButton>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <IconButton
              onClick={() => handleDeleteUrl(index)}
              title="Delete API URL"
              className="bg-red-500/10 hover:bg-red-500/20 text-red-500"
            >
              <div className="i-ph:x w-4 h-4" />
            </IconButton>
          </div>
        </div>
      ))}

      {isEditing && (
        <div className="flex items-center gap-2 shrink-0">
          <IconButton onClick={handleSave} title="Save API URLs" className="bg-green-500/10 hover:bg-green-500/20 text-green-500">
            <div className="i-ph:check w-4 h-4" />
          </IconButton>
          <IconButton onClick={() => setIsEditing(false)} title="Cancel" className="bg-red-500/10 hover:bg-red-500/20 text-red-500">
            <div className="i-ph:x w-4 h-4" />
          </IconButton>
        </div>
      )}
    </div>
  );
};

export default ExternalApiSettings; // Add this line to export the component as the default export