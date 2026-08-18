import React, { useState, useEffect } from 'react';
import { getNotices } from '../../services/noticeApi';

const NoticesList = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadNotices = async () => {
      try {
        setLoading(true);
        setError('');

        const data = await getNotices();

        setNotices(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Failed to load admin notices:', err);

        setError(
          err.response?.data?.message ||
          'Failed to load notices.'
        );
      } finally {
        setLoading(false);
      }
    };

    loadNotices();
  }, []);

  return (
    <div>
      <h2 className="font-heading text-2xl mb-6">
        Notices
      </h2>

      {loading ? (
        <p className="text-muted-foreground text-sm">
          Loading notices...
        </p>
      ) : error ? (
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
          <p className="text-destructive text-sm">
            {error}
          </p>
        </div>
      ) : notices.length === 0 ? (
        <p className="text-muted-foreground text-sm">
          No notices posted yet.
        </p>
      ) : (
        <div className="bg-card border border-border rounded-xl divide-y divide-border">
          {notices.map((notice) => (
            <div
              key={notice._id}
              className="p-4"
            >
              <div className="flex justify-between items-start gap-4">
                <p className="font-medium">
                  {notice.title}
                </p>

                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {new Date(
                    notice.createdAt
                  ).toLocaleString()}
                </span>
              </div>

              <p className="text-sm text-muted-foreground mt-1">
                {notice.description}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NoticesList;