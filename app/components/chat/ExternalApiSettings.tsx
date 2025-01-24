import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { IconButton } from '~/components/ui/IconButton';

interface ExternalApiSettingsProps {
  apiUrl: string;
  setApiUrl: (url: string) => void;
}

const ExternalApiSettings: React.FC<ExternalApiSettingsProps> = ({ apiUrl, setApiUrl }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempUrl, setTempUrl] = useState(apiUrl);

  const handleSave = () => {
    // Save to parent state
    setApiUrl(tempUrl);

    // Save to cookies
    Cookies.set('externalApiUrl', tempUrl);

    setIsEditing(false);
  };

  return (
    <div className="flex items-center justify-between py-3 px-1">
      <div className="flex items-center gap-2 flex-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-bolt-elements-textSecondary">External API URL:</span>
          {!isEditing && (
            <div className="flex items-center gap-2">
              {apiUrl ? (
                <span className="text-xs text-green-500">{apiUrl}</span>
              ) : (
                <span className="text-xs text-red-500">Not Set</span>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {isEditing ? (
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={tempUrl}
              placeholder="Enter API URL"
              onChange={(e) => setTempUrl(e.target.value)}
              className="w-[300px] px-3 py-1.5 text-sm rounded border border-bolt-elements-borderColor 
                        bg-bolt-elements-prompt-background text-bolt-elements-textPrimary 
                        focus:outline-none focus:ring-2 focus:ring-bolt-elements-focus"
            />
            <IconButton
              onClick={handleSave}
              title="Save API URL"
              className="bg-green-500/10 hover:bg-green-500/20 text-green-500"
            >
              <div className="i-ph:check w-4 h-4" />
            </IconButton>
            <IconButton
              onClick={() => setIsEditing(false)}
              title="Cancel"
              className="bg-red-500/10 hover:bg-red-500/20 text-red-500"
            >
              <div className="i-ph:x w-4 h-4" />
            </IconButton>
          </div>
        ) : (
          <IconButton
            onClick={() => setIsEditing(true)}
            title="Edit API URL"
            className="bg-blue-500/10 hover:bg-blue-500/20 text-blue-500"
          >
            <div className="i-ph:pencil-simple w-4 h-4" />
          </IconButton>
        )}
      </div>
    </div>
  );
};

export default ExternalApiSettings; // Add this line to export the component as the default export